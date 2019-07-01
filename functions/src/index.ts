import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as _ from 'lodash'

admin.initializeApp()

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
