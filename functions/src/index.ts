import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
const _ = require('lodash')

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
