//import { service } from "firebase-functions/lib/providers/analytics";
//import { user } from "firebase-functions/lib/providers/auth";

import { firestoreInstance } from "..";


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
   export async function updateRecombeeData(change, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               const objectID=change.before.id;
               const data=change.after.data();
               console.log('oooo',objectID)
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
   export async function updateRecombeeUserData(change, context) {
                  const rqs = recombee.requests;
                  //const data=snapshot.data();
                  const objectID=change.before.id;
                  const data=change.after.data();
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
                  service_key:newvalue.service_key,
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
                  service_key:newvalue.service_key,
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
      export async function RecommendItemsToUser(req,res){

         const rqs=recombee.requests;

         const category=(await firestoreInstance.collection('users').doc(req.body.user_key).get())?.data()?.recommended_categories;
         for (let i in category) {
            
            let cat=(await firestoreInstance.collection('users').doc(req.body.user_key).get())?.data()?.recommended_categories[i];
            console.log(cat)
         
             client.send(new rqs.RecommendItemsToUser(req.body.user_key,5,
            {
               cascadeCreate:true,
               scenario: 'homepage',
               returnProperties:true,
               includedProperties:["service_name","available_quantity","parent_category_key"],
               logic: 'ecommerce:homepage',
               //filter:"\"0\" in 'available_quantity'",
               filter:"\""+cat+"\" in 'parent_category_key'",
              booster:"if 'service_name' == \"Laundry\" then 2 else (if 'service_name' ==\"Shave\" then 1.5 else 1)",
               diversity:'0.0',
               minRelevance:'medium',
               //rotationRate:'0.2',
               rotationTime:'7200.0'
            }
            )).then(res1 => {
               console.log("Recomended services for",res1.recomms[0].values.parent_category_key)
               console.log(res1)
               res.status(200).send(res1);

           }).catch((error) => {
               console.log('Error sending message:', error);
           // return false;
               }) 
            
         }
      }
      export async function RecommendUsersToUser(snapshot,context){
         const rqs=recombee.requests;
         const newvalue=snapshot.data();
         const options={
            user_key:newvalue.user_key,
            }
         return client.send(new rqs.RecommendUsersToUser(options.user_key,5)).catch((error) => {
            console.log('Error sending message:', error);
         return false;
            }) 

         }
         export async function RecommendItemsToItem(snapshot,context){
            const rqs=recombee.requests;
            const newvalue=snapshot.data();
            const options={
               target_user_key:newvalue.target_user_key,
               service_key:newvalue.service_key
               }
            return client.send(new rqs.RecommendItemsToItem(options.service_key,options.target_user_key,5)).catch((error) => {
               console.log('Error sending message:', error);
            return false;
               }) 
   
         }
         export async function RecommendUsersToItem(snapshot,context){
            const rqs=recombee.requests;
            const newvalue=snapshot.data();
            const options={
               service_key:newvalue.service_key
               }
            return client.send(new rqs.RecommendUsersToItem(options.service_key,5)).catch((error) => {
               console.log('Error sending message:', error);
            return false;
               }) 
   
         }
         export async function createTestReco(snapshot,context) {
            const rqs=recombee.requests;
            return client.send(new rqs.RecommendItemsToUser('Re8521',5,
            {
            cascadeCreate:true,
            scenario: 'homepage',
            includedProperties:["service_name","available_quantity"],
            returnProperties:true,
            logic: 'ecommerce:homepage',
            filter:"\"0\" in 'available_quantity'",
            booster:"if 'service_name' == \"Laundry\" then 2 else (if 'service_name' ==\"Shave\" then 1.5 else 1)",
            diversity:'0.0',
            minRelevance:'medium',
            rotationRate:'0.2',
            rotationTime:'7200.0'
            }
            )).then(res => {
               console.log('Creating Recombee Property');
               return client.send(new rqs.RecommendUsersToItem('servic_4b',5,
                {
                  cascadeCreate:true,
                  scenario: 'UsersToItem',
                  returnProperties:true,
                  includedProperties:["current_city","is_email_verified","is_vendor_verified"],
                  logic: 'recombee:default',
                  filter:"if ('is_email_verified'==\"1\"  and 'is_vendor_verified'==\"1\") then true else false ",
                  booster:"if 'current_city' == \"Chennai\" then 2 else 1",
                  diversity:'0.0',
                  minRelevance:'medium',
                  rotationRate:'0.2',
                  rotationTime:'7200.0',  
                  }))
           }).catch((error) => {
               console.log('Error sending message:', error);
            return false;
               }) 
         }

