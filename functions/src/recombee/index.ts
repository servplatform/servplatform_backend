//import { service } from "firebase-functions/lib/providers/analytics";
//import { user } from "firebase-functions/lib/providers/auth";

//import * as functions from 'firebase-functions';
const recombee = require('recombee-api-client');
const client = new recombee.ApiClient('serv-platform-dev', 'gcC0wKVjFGMopvW9T6ZSHJZbDR63qJX8UoImvdyo99UVrR3P0DnflQ55oM1kT4IJ');
export async function createRecombeeItem(snapshot,context) {
    const rqs = recombee.requests;
            const objectID=snapshot.id;
            console.log('Creating Recombee Item',);
            return client.send(new rqs.AddItem(objectID)).then(res => {
               console.log('Creating Recombee Property');
               return createRecombeeProperty(snapshot,context);   
           }).then(res => {
            console.log('Creating Recombee Data');
            return createRecombeeData(snapshot,context);   
        }).catch((error) => {
                console.log('Error sending message:', error);
                return false;
        
             })
    
}
async function createRecombeeProperty(snapshot, context) {
   // const recombe = require('recombee-api-client');
         const rqs = recombee.requests;
         const newval=Object.keys(snapshot.data())[0];
        return client.send(new rqs.AddItemProperty(newval,'string')).catch((error) => {
            console.log('Error sending message:', error);
            return false;
    
         })
    
}
async function createRecombeeData(snapshot, context) {
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
            const newval=Object.keys(snapshot.before.data())[0];
             return client.send(new rqs.DeleteItemProperty(newval)).catch((error) => {
             console.log('Error sending message:', error);
             return false;
                   })
                   }
      export async function createRecombeeUser(snapshot, context) {
                  const rqs = recombee.requests;
                  const objectID=snapshot.id;
                  //uid=snapshot.id;
                  return client.send(new rqs.AddUser(objectID)).then(res => {
                     console.log('Creating Recombee User Property');
                     return createRecombeeUserProperty(snapshot,context);   
                 }).then(res => {
                  console.log('Creating Recombee User Data');
                  return createRecombeeUserData(snapshot,context);   
              }).catch((error) => {
                     console.log('Error sending message:', error);
                     return false;
                                
                            })
                           }
                           
      async function createRecombeeUserProperty(snapshot, context) {
                 const rqs = recombee.requests;
                 const newval=Object.keys(snapshot.data())[0];
                 return client.send(new rqs.AddUserProperty(newval,'string')).catch((error) => {
                  console.log('Error sending message:', error);
                  return false;
                         })
                           }
      
    async function createRecombeeUserData(snapshot, context) {
           const rqs = recombee.requests;
            const objectID=snapshot.id;
            const data=snapshot.data();
            return client.send(new rqs.SetUserValues(objectID, data)).catch((error) => {
             console.log('Error sending message:', error);
             return false;
                })
                }
    export async function deleteRecombeeUser(snapshot, context) {
             const rqs = recombee.requests;
             const objectID=snapshot.id;
             return client.send(new rqs.DeleteUser(objectID)).catch((error) => {
             console.log('Error sending message:', error);
             return false;
                      
                           })
                      }  
    export async function deleteRecombeeUserProperty(snapshot, context) {
             const rqs = recombee.requests;
             //const data=snapshot.data();
            const newvalu=Object.keys(snapshot.before.data())[0];
             console.log(newvalu);
              return client.send(new rqs.DeleteUserProperty(newvalu)).catch((error) => {
             console.log('Error sending message:', error);
            return false;
               })
            
          }  
   
     export async function AddPurchaseview(snapshot, context) {
               const rqs = recombee.requests;
               const newvalue=snapshot.data();
               const options={
                  store_id:newvalue.store_id,
                  customer_id:newvalue.customer_id,
               }
               return client.send(new rqs.AddPurchase(options.customer_id,options.store_id)).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               }  
      export async function AddRatingview(snapshot, context) {
               const rqs = recombee.requests;
               const newvalue=snapshot.data();
               const options={
                  service_key:newvalue.service_key,
                  user_key:newvalue.user_key,
                  star_rating:newvalue.star_rating
               }
               const rating=(options.star_rating-3)/5;
               return client.send(new rqs.AddRating(options.user_key,options.service_key,rating)).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 
      export async function AddCartview(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               const newvalue=snapshot.data();
               const options={
                  bill_summary_collection:newvalue.bill_summary_collection,
                  delivery_note:newvalue.delivery_note,
                  discount_options:newvalue.discount_options,
                  eta:newvalue.eta,
                  location:newvalue.location,
                  order_key:newvalue.order_key,
                  payment_method:newvalue.payment_method,
                  promo_codes:newvalue.promo_codes,
                  provider_key:newvalue.provider_key,
                  service_key:newvalue.service_key,
                  tip:newvalue.tip,
                  url:newvalue.url,
                  user_key:newvalue.user_key
                  }
               return client.send(new rqs.AddCartAddition(options.user_key,options.service_key)).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 
      export async function AddBookmarks(snapshot, context) {
               const rqs = recombee.requests;
               const newvalue=snapshot.data();
               //const id=snapshot.id;
               const options={
                  user_key:newvalue.user_key,
                  service_key:newvalue.service_key,
               }
               return client.send(new rqs.AddBookmark(options.user_key,options.service_key)).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 
      export async function DeletePurchaseview(snapshot, context) {
               const rqs = recombee.requests;
               const newvalue=snapshot.data();
               //const id=snapshot.id;
               const options={
                  store_id:newvalue.store_id,
                  customer_id:newvalue.customer_id,
               }
               return client.send(new rqs.DeletePurchase(options.customer_id,options.store_id)).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               }     
      export async function DeleteRatingview(snapshot, context) {
               const rqs = recombee.requests;
               const newvalue=snapshot.data();
               //const id=snapshot.id;
               const options={
                  service_key:newvalue.service_key,
                  user_key:newvalue.user_key,
                  star_rating:newvalue.star_rating
               }
               return client.send(new rqs.DeleteRating(options.user_key,options.service_key,options.star_rating)).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 
      export async function DeleteCartview(snapshot, context) {
               const rqs = recombee.requests;
               const newvalue=snapshot.data();
               //const id=snapshot.id;
               const options={
                  bill_summary_collection:newvalue.bill_summary_collection,
                  delivery_note:newvalue.delivery_note,
                  discount_options:newvalue.discount_options,
                  eta:newvalue.eta,
                  location:newvalue.location,
                  order_key:newvalue.order_key,
                  payment_method:newvalue.payment_method,
                  promo_codes:newvalue.promo_codes,
                  provider_key:newvalue.provider_key,
                  service_key:newvalue.service_key,
                  tip:newvalue.tip,
                  url:newvalue.url,
                  user_key:newvalue.user_key
                  }
               return client.send(new rqs.DeleteCartAddition(options.user_key,options.service_key)).catch((error) => {
               console.log('Error sending message:', error);
            return false;
               }) 
               } 
      export async function DeleteBookmarks(snapshot, context) {
               const rqs = recombee.requests;
               const newvalue=snapshot.data();
               //const id=snapshot.id;
               const options={
                  user_key:newvalue.user_key,
                  service_key:newvalue.service_key,
               }
               return client.send(new rqs.DeleteBookmark(options.user_key,options.service_key)).catch((error) => {
               console.log('Error sending message:', error);
            return false;
               }) 
               } 
      
