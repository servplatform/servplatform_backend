//import * as functions from 'firebase-functions';
const recombee = require('recombee-api-client');
const client = new recombee.ApiClient('serv-platform-dev', 'gcC0wKVjFGMopvW9T6ZSHJZbDR63qJX8UoImvdyo99UVrR3P0DnflQ55oM1kT4IJ');
export async function createRecombeeItem(snapshot, context) {
    const rqs = recombee.requests;
            const objectID=snapshot.id;
            return client.send(new rqs.AddItem(objectID)).catch((error) => {
                console.log('Error sending message:', error);
                return false;
        
             })
    
}
export async function createRecombeeProperty(snapshot, context) {
   // const recombe = require('recombee-api-client');
         const rqs = recombee.requests;
         //const data=snapshot.data();
        return client.send(new rqs.AddItemProperty('order_id','string')).catch((error) => {
            console.log('Error sending message:', error);
            return false;
    
         })
    
}
export async function createRecombeeData(snapshot, context) {
   // const recomb = require('recombee-api-client');
        const rqs = recombee.requests;
        const objectID=snapshot.id;
        const data=snapshot.data();
        return client.send(new rqs.SetItemValues(objectID, data)).catch((error) => {
            console.log('Error sending message:', error);
            return false;
    
         })
        
             }
     export async function deleteRecombeeItem(snapshot, context) {
             const rqs = recombee.requests;
             const objectID=snapshot.id;
             return client.send(new rqs.DeleteItem(objectID)).catch((error) => {
                console.log('Error sending message:', error);
                return false;
                 
                      })
                 }
     export async function deleteRecombeeProperty(snapshot, context) {
                    const rqs = recombee.requests;
                    //const objectID=snapshot.id;
                    return client.send(new rqs.DeleteItemProperty('order_id')).catch((error) => {
                       console.log('Error sending message:', error);
                       return false;
                        
                             })
                        }
      