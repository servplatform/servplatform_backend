const functions = require('firebase-functions')
const admin = require('firebase-admin')
const voucher_codes = require('voucher-code-generator')
const _ = require('lodash')
const sgMail = require('@sendgrid/mail')

admin.initializeApp()

// Constants

const roles = ['user', 'admin', 'manager', 'support']
const SENDGRID_API_KEY = functions.config().sendgriddev.api
const FROM_EMAIL = 'no-reply@newly.com'
const actionCodeSettings = {
	// URL you want to redirect back to. The domain (www.example.com) for
	// this URL must be whitelisted in the Firebase Console.
	url: 'http://localhost:3000/verify',
	// This must be true for email link sign-in.
	handleCodeInApp: true,
}
sgMail.setApiKey(SENDGRID_API_KEY)

/**
 * Function to add custom claims for each user. (Note: Custom claims caches for 1 hour and then gets changed)
 * @param userId
 * @param role ("user", "admin", "manager", "support")
 */
async function grantRole(userId: string, role: string) {
	await admin.auth().setCustomUserClaims(userId, { role: role })
}

async function sendgridEmail(email, templateId, dynamic_template_data) {
	try {
		const message = {
			to: email,
			from: FROM_EMAIL,

			templateId: templateId,
			dynamic_template_data: dynamic_template_data,
		}
		const mailSent = await sgMail.send(message)
	} catch (error) {
		console.log('error: ', error)
	}
}

// Perform new user creation side effects

exports.onCreateUser = functions.auth.user().onCreate(async user => {
	const name = user.displayName
		? user.displayName.toLowerCase().split(' ')
		: null
	const referralCode = voucher_codes.generate({
		length: 10,
		count: 1,
	})[0]
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
			})
	}
	return admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set({
			uid: user.uid,
			firstName: name ? name[0] : null,
			lastName: name ? (name[name.len] === undefined ? '' : name[1]) : null,
			email: user.email,
			avatarURL: user.photoURL,
			referralCode: referralCode,
			referredBy: null, // Put here user id for refCode of the user.
			paypalDetails: null,
			createdAt: admin.firestore.Timestamp.now(),
			updatedAt: admin.firestore.Timestamp.now(),
		})
		.then(() => grantRole(user.uid, 'user'))
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

	const isAdmin = adminRecord.customClaims.role === 'admin'

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
