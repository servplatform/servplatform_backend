const functions = require('firebase-functions')
const admin = require('firebase-admin')
const voucher_codes = require('voucher-code-generator')
const _ = require('lodash')

admin.initializeApp()

// Constants

const roles = ['user', 'admin', 'manager', 'support']

/**
 * Function to add custom claims for each user. (Note: Custom claims caches for 1 hour and then gets changed)
 * @param userId
 * @param role ("user", "admin", "manager", "support")
 */
async function grantRole(userId: string, role: string) {
	await admin.auth().setCustomUserClaims(userId, { role: role })
}

// Perform new user creation side effects

exports.onCreateUser = functions.auth.user().onCreate(user => {
	const name = user.displayName.toLowerCase().split(' ')
	const referralCode = voucher_codes.generate({
		length: 10,
		count: 1,
	})[0]
	return admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set({
			uid: user.uid,
			firstName: name[0],
			lastName: name[name.len] === undefined ? '' : name[1],
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
