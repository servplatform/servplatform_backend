// Import all needed modules.
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// Set up Firestore.
admin.initializeApp();
//const db = admin.firestore();
const algoliasearch = require("algoliasearch");
    const client = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey,{protocol: 'https:'},);
    const index=client.initIndex('serv_platform'); 
   
export const onCreatealgo=functions.firestore
     .document('algolia/{algoid}')
     .onCreate((snap,context)=>{
        const data=snap.data();
        const objectID=snap.id;
        console.log('onCreatealgoTriggered',)
        return index.saveObject(
            {objectID,
            ...data
        });
    });
 export const onDeletealgo=functions.firestore
    .document('algolia/{algoid}')
    .onDelete((snap,context)=>{
        const objectID=snap.id;
        console.log('onDeletealgoTriggered',) 
        return index.deleteObject(objectID);
        });
 
  export const onUpdatealgo = functions.firestore
     .document('algolia/{algoid}').onUpdate((change, context) => {
            const newData = change.after.data();
            const object = {
                objectID: context.params.algoid,
                ...newData
            }
    
            return index.partialUpdateObject(object);
        })


	
	
