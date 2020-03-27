//import * as functions from 'firebase-functions';

const recombee = require('recombee-api-client');
const client = new recombee.ApiClient('serv-platform-dev', 'gcC0wKVjFGMopvW9T6ZSHJZbDR63qJX8UoImvdyo99UVrR3P0DnflQ55oM1kT4IJ');
export async function createRecombeeItem(snapshot, context) {
    const rqs = recombee.requests;
            const objectID=snapshot.id;
            //item=snapshot.id;
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
         //const newValue=snapshot.data();
         
        return client.send(new rqs.AddItemProperty('order_id','string')).catch((error) => {
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
             return client.send(new rqs.DeleteItemProperty('order_id')).catch((error) => {
             console.log('Error sending message:', error);
             return false;
                        
                    })
                   }
      export async function createRecombeeUser(snapshot, context) {
                  const rqs = recombee.requests;
                  const objectID=snapshot.id;
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
   
    export async function AddDetailview(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.AddDetailView('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
         }   
      export async function AddPurchaseview(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.AddPurchase('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               }     
      export async function AddRatingview(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.AddRating('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4','0.9')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 
      export async function AddCartview(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.AddCartAddition('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 
      export async function AddBookmarks(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.AddBookmark('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 
      export async function AddViewPortions(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.SetViewPortion('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4','0.1')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 
      export async function DeleteDetailview(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.DeleteDetailView('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               }   
      export async function DeletePurchaseview(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.DeletePurchase('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               }     
      export async function DeleteRatingview(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.DeleteRating('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4','0.9')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 
      export async function DeleteCartview(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.DeleteCartAddition('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4')).catch((error) => {
               console.log('Error sending message:', error);
            return false;
               }) 
               } 
      export async function DeleteBookmarks(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.DeleteBookmark('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4')).catch((error) => {
               console.log('Error sending message:', error);
            return false;
               }) 
               } 
      export async function DeleteViewPortions(snapshot, context) {
               const rqs = recombee.requests;
               //const data=snapshot.data();
               return client.send(new rqs.DeleteViewPortion('XFGSx6mE7xta8g46yjlL','lxs8j7JlB78vLAFH4RM4','0.1')).catch((error) => {
               console.log('Error sending message:', error);
               return false;
               }) 
               } 

