const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

// Firestore

// Perform new user creation side effects
exports.onCreateUser = functions.auth.user().onCreate(user =>
	admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set({
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			permissions: null,
			bio: null,
			contact: null,
			createdAt: admin.firestore.Timestamp.now(),
			updatedAt: admin.firestore.Timestamp.now(),
		})
)
