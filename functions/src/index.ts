import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as _ from 'lodash'
import { print } from 'util'

admin.initializeApp()

const stripe = require('stripe')(functions.config().stripe.token)
// Constants

const roles = ['user', 'admin', 'manager', 'support']
const FROM_EMAIL = 'no-reply@hathtech.com'
const actionCodeSettings = {
	// URL you want to redirect back to. The domain (www.example.com) for
	// this URL must be whitelisted in the Firebase Console.
	url: 'http://localhost:3000/verify',
	// This must be true for email link sign-in.
	handleCodeInApp: true,
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

// Perform new user creation side effects

exports.onCreateUser = functions.auth.user().onCreate(async user => {
	try {
		const userCollection = await admin
			.firestore()
			.collection('users')
			.doc(user.uid)
			.set({
				uid: user.uid,
				displayName: user.displayName,
				email: user.email,
				avatarURL: user.photoURL,

				createdAt: admin.firestore.Timestamp.now(),
				updatedAt: admin.firestore.Timestamp.now(),
			})
		console.log('USER COLLECTION CREATED', userCollection)
		await grantRole(user.uid, 'user')
		console.log('USER ROLE GRANTEDT')
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
 * STRIPE CHARGES
 */

/**
 * Only admin is allowed to execute this function.
 */

exports.createStripeChareg = functions.https.onCall(async (data, context) => {
	// Checking that the user is authenticated.
	if (!context.auth) {
		// Throwing an HttpsError so that the client gets the error details.
		throw new functions.https.HttpsError(
			'failed-precondition',
			'The function must be called ' + 'while authenticated.'
		)
	}

	const userId = context.auth.uid

	const token = data.token
	const cart = data.cart
	const totalAmount = data.totalAmount
	const taxAmount = data.taxAmount
	const subTotal = data.subTotal

	console.log(data)

	// TODO: type checking and calculate amount using cart.

	try {
		const response = await stripe.paymentIntents.create({
			amount: parseInt((totalAmount * 100).toString(), 10),
			currency: 'usd',
		})

		const orderRef = admin
			.firestore()
			.collection('orders')
			.doc(response.id)

		await orderRef.set({
			cart: cart,
			payment: response,
			totalAmount: totalAmount,
			taxAmount: taxAmount,
			subTotal: subTotal,
			paymentId: response.id,
			status: 'created',
			status1: 'received',
			userId: userId,
			createdAt: admin.firestore.Timestamp.now(),
			updatedAt: admin.firestore.Timestamp.now(),
		})
		return { ...response, orderId: orderRef.id }
	} catch (error) {
		console.log(error)
		throw new functions.https.HttpsError(
			'aborted',
			'Something went wrong. Try again latter'
		)
	}
})

/// Stripe webhook for payment intent

exports.stripeWebhook = functions.https.onRequest(async (request, response) => {
	const endpointSecret = 'whsec_iEpuKW86nY1IGcKyUB8zwjkka1YO5IRR'
	const sig = request.headers['stripe-signature']
	const body = request.rawBody

	console.log(request.headers)

	let event = null

	try {
		event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret)
		console.log(event)
	} catch (err) {
		console.log(err)
		response.status(400).end()
		return null
	}

	let intent = null
	switch (event['type']) {
		case 'payment_intent.succeeded':
			intent = event.data.object
			console.log('Succeeded:', intent.id)
			try {
				await admin
					.firestore()
					.collection('orders')
					.doc(intent.id)
					.update({
						status: 'paid',
						updatedAt: admin.firestore.Timestamp.now(),
					})
			} catch (error) {
				console.log('ERROR UPDATING ORDER: ', error)
				response.sendStatus(200)
			}
			break
		case 'payment_intent.payment_failed':
			intent = event.data.object
			const message =
				intent.last_payment_error && intent.last_payment_error.message
			try {
				await admin
					.firestore()
					.collection('orders')
					.doc(intent.id)
					.update({
						status: 'failed',
						message: message,
						updatedAt: admin.firestore.Timestamp.now(),
					})
				return response.sendStatus(200)
			} catch (error) {
				console.log('ERROR UPDATING ORDER: ', error)
				return response.sendStatus(200)
			}
			break
	}

	return response.sendStatus(200)
})

// DELETE CART ITEM

exports.onOrderCreate = functions.firestore
	.document('orders/{orderId}')
	.onCreate(async (snap, context) => {
		const orderData = snap.data()
		const cartData = orderData.cart

		try {
			for (const item of cartData) {
				await admin
					.firestore()
					.collection('carts')
					.doc(item.cartId)
					.update({
						deleted: true,
						ordered: true,
					})
					.then(() => console.log('cart updated', item.cartId))

				await admin
					.firestore()
					.collection('products')
					.doc(item.productId)
					.update({
						inventoryQty: admin.firestore.FieldValue.increment(-item.qty),
					})
					.then(() => console.log('product updated', item.productId))
			}
		} catch (error) {
			console.log(error)
		}
	})

exports.onOrderUpdate = functions.firestore
	.document('orders/{orderId}')
	.onUpdate(async (change, context) => {
		const prevData = change.before.data()
		const newData = change.after.data()

		if (newData === null) {
			return
		}
		if (newData.status !== 'paid' || newData.status !== 'failed') {
			return
		}
		if (newData.status === 'paid') {
			const cartData = newData.cart

			try {
				for (const item of cartData) {
					await admin
						.firestore()
						.collection('products')
						.doc(item.productId)
						.update({
							inventoryQty: admin.firestore.FieldValue.increment(-item.qty),
						})
						.then(() => console.log('product updated', item.productId))
				}
			} catch (error) {
				console.log(error)
				return
			}
		} else if (newData.status === 'failed') {
			const cartData = newData.cart

			try {
				for (const item of cartData) {
					await admin
						.firestore()
						.collection('products')
						.doc(item.productId)
						.update({
							inventoryQty: admin.firestore.FieldValue.increment(item.qty),
						})
						.then(() => console.log('product updated', item.productId))
				}
			} catch (error) {
				console.log(error)
				return
			}
		}
	})

///
