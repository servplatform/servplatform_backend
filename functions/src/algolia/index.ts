// Import all needed modules.
import * as functions from 'firebase-functions';
//import * as admin from 'firebase-admin';
// Set up Firestore.
//admin.initializeApp();
//const db = admin.firestore();
const algoliasearch = require("algoliasearch");
const client = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey,{protocol: 'https:'},);
const agentindex=client.initIndex('agents'); 
const jobindex=client.initIndex('jobindex');
const serviceindex=client.initIndex('services');
export async function createAlgoliaAgent(snapshot, context) {
        const data=snapshot.data();
        const objectID=snapshot.id;
        console.log('Triggering Create Algolia task',);
        return agentindex.saveObject(
            {objectID,
            ...data
            });
    }
    export async function createAlgoliaService(snapshot, context) {
        const data=snapshot.data();
        const objectID=snapshot.id;
        console.log('Triggering Create Algolia task',);
        return serviceindex.saveObject(
            {objectID,
            ...data
            });
    }
    export async function createAlgoliaJob(snapshot, context) {
        const data=snapshot.data();
        const objectID=snapshot.id;
        console.log('Triggering Create Algolia task',);
        return jobindex.saveObject(
            {objectID,
            ...data
            });
    }
    export async function updateAlgoliaAgent(change, context) {
        const newData = change.after.data();
        const object = {
            objectID: context.params.algoid,
            ...newData
        }
        console.log('Triggering Create Algolia task',);
        return agentindex.partialUpdateObject(object);
        }
     export async function updateAlgoliaService(change, context) {
            const newData = change.after.data();
            const object = {
                objectID: context.params.algoid,
                ...newData
            }
            console.log('Triggering Create Algolia task',);
            return serviceindex.partialUpdateObject(object);
            }
    export async function updateAlgoliaJob(change, context) {
                const newData = change.after.data();
                const object = {
                    objectID: context.params.algoid,
                    ...newData
                }
                console.log('Triggering Create Algolia task',);
                return jobindex.partialUpdateObject(object);
                }
    export async function deleteAlgoliaAgent(snapshot, context) {
                   const objectID=snapshot.id; 
                    console.log('Triggering Delete Algolia task',);
                    return agentindex.deleteObject(objectID);
                }
     export async function deleteAlgoliaService(snapshot, context) {
                    const objectID=snapshot.id; 
                     console.log('Triggering Delete Algolia task',);
                     return serviceindex.deleteObject(objectID);
                 }
    export async function deleteAlgoliaJob(snapshot, context) {
                    const objectID=snapshot.id; 
                     console.log('Triggering Delete Algolia task',);
                     return jobindex.deleteObject(objectID);
                 }


	
	
