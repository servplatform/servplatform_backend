// Import all needed modules.
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// Set up Firestore.
admin.initializeApp();
//const db = admin.firestore();
const algoliasearch = require("algoliasearch");

const client = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);
const index=client.initIndex('serv_platform');
exports.indexServ=functions.firestore.document('algolia/{algo_id}').onCreate((snap,context)=>{
    const data=snap.data();
    const objectId=snap.id;
    return index.addObject({
        objectId,
        ...data
    });
});
exports.unindex=functions.firestore.document('algolia/{algo_id}').onDelete((snap,context)=>{
const objectId=snap.id;
return index.deleteObject(objectId);
});

	
	
