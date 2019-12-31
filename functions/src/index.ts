import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
//const serviceAccount = require("servplatform-d4668-firebase-adminsdk-rqyid-c976dca51e.json");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://servplatform-d4668.firebaseio.com'
  });
 
//admin.initializeApp(functions.config().firebase);

import * as tookanFunctions from './tookan-operations/index'

export const firestoreInstance = admin.firestore();

export const onTaskCreate = functions.firestore
    .document('task/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onTaskCreateTriggered',)
        return tookanFunctions.createTookanTask(snapshot,context);
    });
