import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as _ from 'lodash'

admin.initializeApp()

// Constants

const roles = ['user', 'admin', 'manager', 'support']
const FROM_EMAIL = 'no-reply@newly.com'
const actionCodeSettings = {
	// URL you want to redirect back to. The domain (www.example.com) for
	// this URL must be whitelisted in the Firebase Console.
	url: 'http://localhost:3000/verify',
	// This must be true for email link sign-in.
	handleCodeInApp: true,
}

const RAKUTEN = {
	TOKEN: functions.config().rakuten.token,
}

/**
 * Function to add custom claims for each user. (Note: Custom claims caches for 1 hour and then gets changed)
 * @param userId
 * @param role ("user", "admin", "manager", "support")
 */
async function grantRole(userId: string, role: string) {
	return admin.auth().setCustomUserClaims(userId, { role: role })
}

async function sendgridEmail(email, templateId, dynamic_template_data) {
	const sgMail = require('@sendgrid/mail')
	const SENDGRID_API_KEY = functions.config().sendgriddev.api
	sgMail.setApiKey(SENDGRID_API_KEY)
	try {
		const message = {
			to: email,
			from: FROM_EMAIL,

			templateId: templateId,
			dynamic_template_data: dynamic_template_data,
		}
		const mailSent = await sgMail.send(message)
		console.log(mailSent, 'A SENDGRID EMAIL SENT')
	} catch (error) {
		console.error('error: SENDING MAIL ', error)
	}
}

/**
 * Create a wallet for user.
 * Note: No one will be able to update wallet except admin.
 */

const createWallet = async uid => {
	try {
		return await admin
			.firestore()
			.collection('wallets')
			.doc(uid)
			.set({
				userId: uid,
				approvedAmount: 0,
				pendingAmount: 0,
				redeemedAmount: 0,
			})
	} catch (error) {
		console.error('ERROR CREATING USER WALLET', error)
		return error
	}
}

// Perform new user creation side effects

exports.onCreateUser = functions.auth.user().onCreate(async user => {
	const voucher_codes = require('voucher-code-generator')
	const name = user.displayName
		? user.displayName.toLowerCase().split(' ')
		: null
	const referralCode = voucher_codes.generate({
		length: 10,
		count: 1,
	})[0]

	try {
		const userCollection = await admin
			.firestore()
			.collection('users')
			.doc(user.uid)
			.set({
				uid: user.uid,
				displayName: user.displayName,
				firstName: name ? name[0] : null,
				lastName: name
					? name[name.length - 1] === undefined
						? ''
						: name[1]
					: null,
				email: user.email,
				avatarURL: user.photoURL,
				referralCode: referralCode,
				referredBy: null, // Put here user id for refCode of the user.
				paypalDetails: null,
				role: 'user',
				createdAt: admin.firestore.Timestamp.now(),
				updatedAt: admin.firestore.Timestamp.now(),
			})
		console.log('USER COLLECTION CREATED', userCollection)
		await grantRole(user.uid, 'user')
		console.log('USER ROLE GRANTEDT')
		await createWallet(user.uid)
		console.log('WALLET CREATED', user.uid)

		// Above steps are neccessary and it must not fail.

		if (!user.emailVerified) {
			admin
				.auth()
				.generateEmailVerificationLink(user.email, actionCodeSettings)
				.then(link => {
					// Construct password reset email template, embed the link and send
					// using custom SMTP server.
					return sendgridEmail(
						user.email,

						'd-91f898ae86bc461d8b1b1e4806022e3f',
						{
							preheader: 'confirming emails makes us feel you are real',
							header: 'Confirm your email',
							body: 'Please confirm your email by tapping on below button.',
							link: link,
							buttonText: 'Confirm Email!',
						}
					)
				})
				.catch(error => {
					// Some error occurred.
					console.log('ERROR SENDING VERIFICATION EMAIL', error)
				})
		}
	} catch (error) {
		console.error('ERROR IN ON USER CREATION', error)
	}
})

/**
 * Only admin is allowed to execute this function.
 */

exports.sendVerification = functions.https.onCall(async (data, context) => {
	// Checking that the user is authenticated.
	if (!context.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new functions.https.HttpsError(
			'failed-precondition',
			'The function must be called ' + 'while authenticated.'
		)
	}

	const user = await admin.auth().getUser(context.auth.uid)

	if (user.emailVerified) {
		return
	}

	return admin
		.auth()
		.generateEmailVerificationLink(user.email, actionCodeSettings)
		.then(link => {
			// Construct password reset email template, embed the link and send
			// using custom SMTP server.
			return sendgridEmail(
				user.email,

				'd-91f898ae86bc461d8b1b1e4806022e3f',
				{
					preheader: 'confirming emails makes us feel you are real',
					header: 'Confirm your email',
					body: 'Please confirm your email by tapping on below button.',
					link: link,
					buttonText: 'Confirm Email!',
				}
			)
		})
		.catch(error => {
			// Some error occurred.
		})
})

/**
 * Only admin is allowed to execute this function.
 */

exports.setRole = functions.https.onCall(async (data, context) => {
	// Checking that the user is authenticated.
	if (!context.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new functions.https.HttpsError(
			'failed-precondition',
			'The function must be called ' + 'while authenticated.'
		)
	}

	// Checking that user is admin
	const adminRecord = await admin.auth().getUser(context.auth.uid)

	const isAdmin = (adminRecord.customClaims as any).role === 'admin'

	if (!isAdmin) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new functions.https.HttpsError(
			'failed-precondition',
			'The function must be called ' + 'only by an administrator'
		)
	}

	// Role and UserId passed from client passed from the client
	const role = data.role
	const userId = data.userId

	// Checking for role
	if (
		!(typeof role === 'string') ||
		role.length === 0 ||
		!_.values(roles).includes(role)
	) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new functions.https.HttpsError(
			'invalid-argument',
			'The function must be called with ' +
				' arguments "role" containing the role to be assigned and "userId"   '
		)
	}

	// Checking for role
	if (!(typeof userId === 'string') || !userId) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new functions.https.HttpsError(
			'invalid-argument',
			'The function must be called with ' + ' Check userId Passed  '
		)
	}

	// Set claims on firebase user and firestore user
	return grantRole(userId, role)
})

/**
 * Referral Program
 * 1. Every user has a referral code.
 * 2. In referral the data stored will be:
 *   	a. Documents will be the entry of all the registeration made by referral
 * 		b. The subcollection called aggregate will have total sign ups through referral
 * 		c. The subcollection usersAggregate will have total shares made on any platform provided,
 * 		   referral successful by user, amount earned, referral array holding document id of
 * 		   referral done.
 */
exports.onUpdateUserReferral = functions.firestore

/**
 * Rakuten Services
 * 1. Fetch Stores  - (This will be done using Admin and only admin and relevant roles can call this function)
 * 2. Fetch Reports and Update it - (This will be done using cron jobs)
 */

/**
 * Only admin and manager is allowed to execute this function.
 * Fetches the store from Affiliate Partners
 */

const getRakutenStores = async () => {
	const axios = require('axios')
	const Papa = require('papaparse')

	try {
		const URL = `http://reportws.linksynergy.com/downloadreport.php?token=${
			RAKUTEN.TOKEN
		}&reportid=13`
		const response = await axios.get(URL)
		const result = Papa.parse(response.data, {
			header: true,
			dynamicTyping: true,
		})
		console.log(result.data[0])
		result.data.pop()
		return result.data
	} catch (error) {
		console.log('error in getting affiliate partner details: ', error)
		throw new functions.https.HttpsError('cancelled', 'Something went wrong!')
	}
}

exports.fetchStores = functions.https.onCall(async (data, context) => {
	// Checking that the user is authenticated.
	if (!context.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new functions.https.HttpsError(
			'failed-precondition',
			'The function must be called ' + 'while authenticated.'
		)
	}

	//TODO: implement role management and then uncomment below.

	// // Checking that user is admin or manager
	// const adminRecord = await admin.auth().getUser(context.auth.uid)

	// const isAdmin = (adminRecord.customClaims as any).role === 'admin'
	// const isManager = (adminRecord.customClaims as any).role === 'manager'
	// if (!isAdmin || !isManager) {
	// 	// Throwing an HttpsError so that the client gets the error details.
	// 	throw new functions.https.HttpsError(
	// 		'failed-precondition',
	// 		'The function must be called ' + 'only by an administrator'
	// 	)
	// }

	// try {
	// 	const getAffiliateDetails = await admin
	// 		.firestore()
	// 		.collection('affiliatePartners')
	// 		.doc(data.affid)
	// 		.get()
	// } catch (error) {
	// 	console.log('error: ', error)
	// 	throw new functions.https.HttpsError(
	// 		'failed-precondition',
	// 		'The function must be called ' + 'only by an administrator'
	// 	)
	// }

	return getRakutenStores()
})

const getReports = async (start_date, end_date) => {
	const axios = require('axios')
	const Papa = require('papaparse')

	try {
		const URL = `https://ran-reporting.rakutenmarketing.com/en/reports/newly/filters?start_date=${start_date}&end_date=${end_date}&include_summary=N&network=1&tz=GMT&date_type=transaction&token=ZW5jcnlwdGVkYToyOntzOjU6IlRva2VuIjtzOjY0OiI0ODhhNWNiZWRiNjIxNzhkZTU0NTQ5ZTY5NWQzYTZkYjA5NDJjMjZkYWIxYTNlNmNkOTM5NTFkYzY1ZDAwOGM2IjtzOjg6IlVzZXJUeXBlIjtzOjk6IlB1Ymxpc2hlciI7fQ%3D%3D`

		const response = await axios.get(URL)
		const result = Papa.parse(response.data, {
			header: true,
			dynamicTyping: true,
		})
		console.log(result.data[0])
		result.data.pop()
		return result.data
	} catch (error) {
		console.log('error in getting affiliate partner details: ', error)
		throw new functions.https.HttpsError('cancelled', 'Something went wrong!')
	}
}

exports.fetchReports = functions.https.onCall(async (data, context) => {
	// Checking that the user is authenticated.
	if (!context.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new functions.https.HttpsError(
			'failed-precondition',
			'The function must be called ' + 'while authenticated.'
		)
	}

	//TODO: implement role management and then uncomment below.

	// // Checking that user is admin or manager
	// const adminRecord = await admin.auth().getUser(context.auth.uid)

	// const isAdmin = (adminRecord.customClaims as any).role === 'admin'
	// const isManager = (adminRecord.customClaims as any).role === 'manager'
	// if (!isAdmin || !isManager) {
	// 	// Throwing an HttpsError so that the client gets the error details.
	// 	throw new functions.https.HttpsError(
	// 		'failed-precondition',
	// 		'The function must be called ' + 'only by an administrator'
	// 	)
	// }

	// try {
	// 	const getAffiliateDetails = await admin
	// 		.firestore()
	// 		.collection('affiliatePartners')
	// 		.doc(data.affid)
	// 		.get()
	// } catch (error) {
	// 	console.log('error: ', error)
	// 	throw new functions.https.HttpsError(
	// 		'failed-precondition',
	// 		'The function must be called ' + 'only by an administrator'
	// 	)
	// }

	const reportData = await getReports('2017-04-01', '2019-04-01')

	const reportsBatch = admin.firestore().batch()

	if (reportData.length > 0) {
		for (let i = 0; i < reportData.length; i++) {
			const transRef = admin
				.firestore()
				.collection('transactions')
				.doc()
			reportsBatch.set(transRef, {
				clickId: reportData[i]['Member ID (U1)'],
				userId: 'kbl4PmeKjDMoFBQv6uxK5birWdr2',
				affiliateData: { ...reportData[i] },
				storeId: reportData[i]['Advertiser Name'],
				totalCommission: reportData[i]['Total Commission'],
				lineItems: null,
			})
		}
	}
	return reportsBatch.commit()
})

/**
 * Paypal Related Functions
 * A payment function.
 *  On successfull payment make sure to decrese  the approved amount.
 */

exports.makePaypalPayment = functions.https.onCall(async (data, context) => {
	// Checking that the user is authenticated.
	if (!context.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new functions.https.HttpsError(
			'failed-precondition',
			'The function must be called ' + 'while authenticated.'
		)
	}

	// Make sure this function is only called with admin

	const userId = data.userId
	const amount = data.amount

	// Fetch users  details
	try {
		if (!userId || _.isEmpty(userId) || _.isEmpty(_.trim(userId))) {
			throw new functions.https.HttpsError(
				'failed-precondition',
				'Function must be called with valid user id.'
			)
		}
		if (!amount || !_.isNumber(amount) || (amount < 15 && amount > 99999)) {
			throw new functions.https.HttpsError(
				'failed-precondition',
				'Function must be called with valid amount'
			)
		}

		const user = await admin
			.firestore()
			.collection('users')
			.doc(userId)
			.get()

		if (!user.exists) {
			throw new functions.https.HttpsError('not-found', 'User not found')
		}

		const userData = user.data()
		const paypalDetails = userData.paypalDetails
		if (!paypalDetails || _.isEmpty(paypalDetails)) {
			throw new functions.https.HttpsError(
				'not-found',
				'User is not registered with paypal'
			)
		}

		const wallet = await admin
			.firestore()
			.collection('wallets')
			.doc(userId)
			.get()

		if (!wallet.exists) {
			throw new functions.https.HttpsError(
				'not-found',
				'User wallet information not found'
			)
		}

		const walletData = wallet.data()
		const approvedAmount = Number(walletData.approvedAmount)
		if (
			!approvedAmount ||
			!_.isNumber(approvedAmount) ||
			(approvedAmount < 15 && approvedAmount > 99999)
		) {
			throw new functions.https.HttpsError(
				'not-found',
				'Error in user wallet approved amount. Contact development team.'
			)
		}

		if (amount > approvedAmount) {
			throw new functions.https.HttpsError(
				'cancelled',
				'Not sufficient amount available in user wallet'
			)
		}

		//Initialize paypal lib

		const paypal = require('paypal-rest-sdk')
		paypal.configure({
			mode: 'sandbox', //sandbox or live
			client_id:
				'AVI2Ea5pU6MSYUhpUraI7xtldSSHCwO2353baTmJOhuKYp31d7WDwzQ2gFjAjgcFnIHIvDfgtoiBtOFS',
			client_secret:
				'EHRybMsEAxLRSb9wpUFfF7WrweKO3y48HY0eDsqQwGEXK_5fOLMhYvOntIvwos1VMhN2NHaX-mnabwNo',
		})

		const payoutRef = admin
			.firestore()
			.collection('payouts')
			.doc()

		const create_payout_json = {
			sender_batch_header: {
				sender_batch_id: payoutRef.id,
				email_subject: 'You have a payment from newly',
			},
			items: [
				{
					recipient_type: 'EMAIL',
					amount: {
						value: amount,
						currency: 'USD',
					},
					receiver: paypalDetails.email,
					note: 'Thank you.',
				},
			],
		}

		const r = await paypal.payout.create(
			create_payout_json,
			false,
			async (error, payout) => {
				if (error) {
					console.error(
						'Error making paypal payment',
						error.response,
						'For user',
						userId,
						userData.email
					)
					throw new functions.https.HttpsError(
						'cancelled',
						'Error making payment. Error with paypal'
					)
				} else {
					await payoutRef.set({
						userId,
						amount: amount,
						mode: 'paypal',
						status: 'created',
						paymentDataPayload: payout,
					})
					return payout
				}
			}
		)
		console.log('PAYOUT RESULT', r)
		return r
	} catch (error) {
		console.error(error)
	}
})

exports.newlyPaypalPayoutWebhook = functions.https.onRequest(
	async (request, response) => {
		console.log('WEBHOOK EVENT RECEIVED')
		console.log(request.body)
		console.log(request.method)
		const data = request.body
		if (data.resource.batch_header) {
			const batchId =
				data.resource.batch_header.sender_batch_header.sender_batch_id
			const payoutRef = admin
				.firestore()
				.collection('payouts')
				.doc(batchId)
			switch (data.event_type) {
				case 'PAYMENT.PAYOUTSBATCH.DENIED':
					await payoutRef.update({
						paymentDataPayload: data,
						status: 'denied',
					})
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTSBATCH.PROCESSING':
					await payoutRef.update({
						paymentDataPayload: data,
						status: 'processing',
					})
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTSBATCH.SUCCESS':
					await payoutRef.update({
						paymentDataPayload: data,
						status: 'success',
					})
					response.status(200).end()
					break
			}
		} else {
			const payoutId = data.resource.sender_batch_id
			const transactionId = data.resource.transaction_id
			const payoutRef = admin
				.firestore()
				.collection('payouts')
				.doc(payoutId)
			switch (data.event_type) {
				case 'PAYMENT.PAYOUTS-ITEM.BLOCKED':
					await payoutRef.update({
						status: 'blocked',
					})
					await payoutRef
						.collection('transactions')
						.doc()
						.set(data)
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTS-ITEM.CANCELED':
					await payoutRef.update({
						status: 'canceled',
					})
					await payoutRef
						.collection('transactions')
						.doc()
						.set(data)
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTS-ITEM.DENIED':
					await payoutRef.update({
						status: 'denied',
					})
					await payoutRef
						.collection('transactions')
						.doc()
						.set(data)
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTS-ITEM.FAILED':
					await payoutRef.update({
						status: 'failed',
					})
					await payoutRef
						.collection('transactions')
						.doc()
						.set(data)
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTS-ITEM.HELD':
					await payoutRef.update({
						status: 'held',
					})
					await payoutRef
						.collection('transactions')
						.doc()
						.set(data)
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTS-ITEM.REFUNDED':
					await payoutRef.update({
						status: 'refunded',
					})
					await payoutRef
						.collection('transactions')
						.doc()
						.set(data)
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTS-ITEM.RETURNED':
					await payoutRef.update({
						status: 'returned',
					})
					await payoutRef
						.collection('transactions')
						.doc()
						.set(data)
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTS-ITEM.SUCCEEDED':
					await payoutRef.update({
						status: 'success',
					})
					await payoutRef
						.collection('transactions')
						.doc()
						.set(data)
					response.status(200).end()
					break
				case 'PAYMENT.PAYOUTS-ITEM.UNCLAIMED':
					await payoutRef.update({
						status: 'unclaimed',
					})
					await payoutRef
						.collection('transactions')
						.doc()
						.set(data)
					const amount = Number(data.resource.payout_item.amount.value)
					const user = await payoutRef.get()
					const userData = user.data()
					const userId = userData.userId
					const wallet = await admin
						.firestore()
						.collection('wallets')
						.doc(userId)
						.get()
					const walletData = wallet.data()
					const approvedAmount = walletData.approvedAmount
					await admin
						.firestore()
						.collection('wallets')
						.doc(userId)
						.update({
							approvedAmount: approvedAmount - amount,
						})

					response.status(200).end()
					break
			}
		}

		return
	}
)
