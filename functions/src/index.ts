import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
//const serviceAccount = require("servplatform-d4668-firebase-adminsdk-rqyid-c976dca51e.json");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://servplatform-d4668.firebaseio.com'
  });
//admin.initializeApp(functions.config().firebase);
import * as tookanFunctions from './tookan-operations/index'
import * as algoliaFunctions from './algolia/index'
import * as recombeeFunctions from './recombee/index'
//import { TASKS } from './constants';

export const firestoreInstance = admin.firestore();

export const onTaskCreate = functions.firestore
    .document('tasks/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onTaskCreateTriggered',)
        return tookanFunctions.createTookanTask(snapshot,context);
    });
 
export const onTaskEdit = functions.firestore
    .document('tasks/{taskId}')
    .onUpdate((snapshot,context) => {
        console.log('onTaskEditTriggered',)
        return tookanFunctions.edittookantask(snapshot,context);
    });    

export const onTaskDelete = functions.firestore
    .document('tasks/{taskId}')
    .onDelete((snapshot,context) => {
        console.log('onTaskDeleteTriggered',)
        return tookanFunctions.deleteTookanTask(snapshot,context);
    }); 

export const onTaskStatus = functions.firestore
    .document('tasks/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onTaskStatusTriggered',)
        return tookanFunctions.updateTookanTaskstatus(snapshot,context);
    }); 

export const onStartTask = functions.firestore
    .document('tasks/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onStartTaskTriggered',)
        return tookanFunctions.Starttookantask(snapshot,context);
    }); 

export const onCancelTask = functions.firestore
    .document('tasks/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onCancelTaskTriggered',)
        return tookanFunctions.Canceltookantask(snapshot,context);
    }); 

export const onAssignTask = functions.firestore
    .document('tasks/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onAssignTaskTriggered',)
        return tookanFunctions.Assigntookantask(snapshot,context);
    }); 

export const onAutoAssignTask = functions.firestore
    .document('tasks/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onAutoAssignTaskTriggered',)
        return tookanFunctions.AutoAssigntookantask(snapshot,context);
    }); 

export const onTaskStatistics = functions.firestore
    .document('tasks/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onTaskStatisticsTriggered',)
        return tookanFunctions.GettookantaskStatistics(snapshot,context);
    }); 

export const onGetAllAgents = functions.https.onCall((data,context)=> {
        console.log('onGetAllAgentsTriggered',)
        return tookanFunctions.getAllTookanAgents(data,context);
    });    
export const onAddAgents = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onAddAgentsTriggered',)
        return tookanFunctions.AddTookanAgents(snapshot,context).then(res=>{  
            console.log('onCreateAlgoliaAgentsTriggered',)
            return algoliaFunctions.createAlgoliaAgent(snapshot,context)
               })
    });  
export const onEditAgents = functions.firestore
    .document('agents/{agentId}')
    .onUpdate((snapshot,context) => {
        console.log('onEditAgentsTriggered',)
        return tookanFunctions.EditTookanAgents(snapshot,context).then(res=>{  
            console.log('onUpdatAlgoliaeAgentsTriggered',)
            return algoliaFunctions.updateAlgoliaAgent(snapshot,context)
               })
    }); 
    
export const onBlockUnblockAgents = functions.firestore
    .document('agents/{agentId}')
    .onUpdate((snapshot,context) => {
        console.log('onBlockUnblockAgentsTriggered',)
        return tookanFunctions.BlockorUnblockTookanAgents(snapshot,context);
    }); 
   
export const onDeleteAgents = functions.firestore
    .document('agents/{agentId}')
    .onDelete((snapshot,context) => {
        console.log('onDeleteAgentsTriggered',)
        return tookanFunctions.DeleteTookanAgents(snapshot,context).then(res=>{  
            console.log('onDeleteAlgoliaAgentTriggered',) 
            return algoliaFunctions.deleteAlgoliaAgent(snapshot,context)
               })
    });
    
export const onViewAgentsProfile = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onViewAgentsProfileTriggered',)
        return tookanFunctions.ViewTookanAgentsProfile(snapshot,context);
    }); 

export const onUpdateAgentsTag = functions.firestore
    .document('agents/{agentId}')
    .onUpdate((snapshot,context) => {
        console.log('onUpdateAgentsTagTriggered',)
        return tookanFunctions.UpdateTookanAgentTags(snapshot,context);
    });  
    
export const onGetAgentsTag = functions.https.onCall((data,context)=> {
        console.log('onGetAgentsTagTriggered',)
        return tookanFunctions.GetTookanAgentTags(data,context);
    }); 
    
export const onGetAgentsLogs = functions.https.onCall((data,context)=> {
        console.log('onGetAgentsLogsTriggered',)
        return tookanFunctions.GetTookanAgentLogs(data,context);
    }); 
    
export const onGetAgentsLocation = functions.https.onCall((data,context)=> {
        console.log('onGetAgentsLocationTriggered',)
        return tookanFunctions.GetTookanAgentLocation(data,context);
    });  

export const onSendAgentsNotification = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onSendAgentsNotificationTriggered',)
        return tookanFunctions.SendAgentNotification(snapshot,context);
    });    

export const onGetAgentsSchedule = functions.https.onCall((data,context) => {
        console.log('onGetAgentsScheduleTriggered',)
        return tookanFunctions.GetTookanAgentSchedule(data,context);
    }); 
    
export const onAssignAgentsTask = functions.firestore
    .document('agents/{agentId}')
    .onUpdate((snapshot,context) => {
        console.log('onAssignAgentsTaskTriggered',)
        return tookanFunctions.AssignTookanAgentTask(snapshot,context);
    });  

export const onAddCustomer = functions.firestore
    .document('users/{customerId}')
    .onCreate((snapshot,context) => {
        console.log('onAddCustomerTriggered',)
        return tookanFunctions.AddNewCustomer(snapshot,context).then(res=>{  
         console.log('onCreateRecombeeUserTriggered')
             return recombeeFunctions.createRecombeeUser(snapshot,context)
     })
    });  

export const onEditCustomer = functions.firestore
    .document('users/{customerId}')
    .onUpdate((change,context) => {
        console.log('onEditCustomerTriggered',)
        return tookanFunctions.EditCustomer(change,context).then(res=>{  
            console.log('onUpdateRecombeeDataTriggered')
            //return recombeeFunctions.deleteRecombeeUserProperty(snapshot,context)
            return recombeeFunctions.updateRecombeeUserData(change,context)
     });
    });  

export const onFindCustomerWithPhone = functions.firestore
    .document('users/{customerId}')
    .onCreate((snapshot,context) => {
        console.log('onFindCustomerWithPhoneTriggered',)
        return tookanFunctions.FindCustomerWithPhone(snapshot,context)
    });  

export const onFindCustomerWithName = functions.firestore
    .document('users/{customerId}')
    .onCreate((snapshot,context) => {
        console.log('onFindCustomerWithNameTriggered',)
        return tookanFunctions.FindCustomerWithName(snapshot,context);
    });  

export const onViewCustomerProfile = functions.firestore
    .document('users/{customerId}')
    .onCreate((snapshot,context) => {
        console.log('onViewCustomerProfileTriggered',)
        return tookanFunctions.ViewTookanCustomerProfile(snapshot,context);
    });  

export const onDeleteCustomer = functions.firestore
    .document('users/{customerId}')
    .onDelete((snapshot,context) => {
        console.log('onDeleteCustomerTriggered',)
        return tookanFunctions.DeleteTookanCustomer(snapshot,context).then(res=>{  
            console.log('onDeleteRecombeeUserTriggered')
              return recombeeFunctions.deleteRecombeeUser(snapshot,context)
               })
    });
export const onCreateMerchant = functions.firestore
    .document('providers/{providerId}')
    .onCreate((snapshot,context) => {
        console.log('onCreateMerchantTriggered',)
        return tookanFunctions.CreateNewMerchant(snapshot,context);
    });
 
 export const onEditMerchant = functions.firestore
    .document('providers/{providerId}')
    .onUpdate((snapshot,context) => {
        console.log('onEditMerchantTriggered',)
        return tookanFunctions.EditTookanMerchant(snapshot,context);
    });    
 export const onViewMerchantsProfile = functions.firestore
    .document('providers/{providerId}')
    .onCreate((snapshot,context) => {
        console.log('onViewMerchantsProfileTriggered',)
        return tookanFunctions.ViewTookanMerchant(snapshot,context);
    }); 
 export const onGetMerchantDetails = functions.https.onCall((data,context)=> {
        console.log('onViewMerchantsProfileTriggered',)
        return tookanFunctions.GetMerchantDetails(data,context);
    }); 
export const onGetMerchantTeams = functions.https.onCall((data,context)=> {
        console.log('onGetMerchantTeamTriggered',)
        return tookanFunctions.GetMerchantTeam(data,context);
    }); 
export const onGetMerchantReports = functions.https.onCall((data,context)=> {
        console.log('onViewMerchantsProfileTriggered',)
        return tookanFunctions.GetMerchantReports(data,context);
    }); 
export const onBlockUnblockMerchant = functions.firestore
    .document('providers/{providerId}')
    .onUpdate((snapshot,context) => {
        console.log('onBlockUnblockMerchantTriggered',)
        return tookanFunctions.BlockUnblockMerchant(snapshot,context);
    }); 
 export const AvailableMerchantAgents = functions.firestore
    .document('providers/{providerId}')
    .onCreate((snapshot,context) => {
        console.log('onViewMerchantsProfileTriggered',)
        return tookanFunctions.AvailableMerchantAgents(snapshot,context);
    }); 
 export const onAssignMerchantAgentsTask = functions.firestore
    .document('providers/{providerId}')
    .onUpdate((snapshot,context) => {
        console.log('onViewMerchantsProfileTriggered',)
        return tookanFunctions.AssignMerchantAgentsTask(snapshot,context);
    });
export const onAssignMerchantToTask = functions.firestore
    .document('providers/{providerId}')
    .onUpdate((snapshot,context) => {
        console.log('ononAssignMerchantToTaskTriggered',)
        return tookanFunctions.AssignMerchantToTask(snapshot,context);
    });
 export const onDeleteMerchant = functions.firestore
    .document('providers/{providerId}')
    .onDelete((snapshot,context) => {
        console.log('onTaskDeleteTriggered',)
        return tookanFunctions.DeleteTookanMerchant(snapshot,context);
    }); 
 export const onCreateTookanWebhook=functions.https.onCall((data,context)=>{
    console.log('onCreateTookanWebhookeTriggered',)
    return tookanFunctions.TookanWebHook(data,context);

 });
 export const onCreateService=functions.firestore
        .document('services/{serviceId}')
        .onCreate((snapshot,context)=>{
           console.log('onCreateServiceTriggered',)
           return algoliaFunctions.createAlgoliaService(snapshot,context).then(res => {
            console.log('onCreateRecombeeItemTriggered')
            return recombeeFunctions.createRecombeeItem(snapshot,context);   
        })
            });
 export const onDeleteService=functions.firestore
       .document('services/{serviceId}')
       .onDelete((snapshot,context)=>{
        console.log('onDeleteServiceTriggered',) 
        return algoliaFunctions.deleteAlgoliaService(snapshot,context).then(res=>{ 
        console.log('onDeleteRecombeeItemTriggered')
        return recombeeFunctions.deleteRecombeeItem(snapshot,context)})
           });
    
  export const onUpdateService = functions.firestore
        .document('services/{serviceId}').onUpdate((change, context) => {
            console.log('onUpdateServiceTriggered',)
            return algoliaFunctions.updateAlgoliaService(change,context).then(res=>{  
            console.log('onUpdateRecombeePropertyTriggered',)
            return recombeeFunctions.updateRecombeeData(change,context)
            //return recombeeFunctions.deleteRecombeeProperty(change,context)
               })
            });
           
  export const onCreateJob=functions.firestore
           .document('jobs/{jobId}')
           .onCreate((snapshot,context)=>{
            console.log('onCreateJobTriggered',)
            return algoliaFunctions.createAlgoliaJob(snapshot,context)
            });
  export const onDeleteJob=functions.firestore
          .document('jobs/{jobId}')
          .onDelete((snapshot,context)=>{
              console.log('onDeleteJobTriggered',) 
              return algoliaFunctions.deleteAlgoliaJob(snapshot,context)
              });
             
export const onUpdateJob = functions.firestore
           .document('jobs/{jobId}').onUpdate((change, context) => {
            console.log('onUpdateJobTriggered',)
            return algoliaFunctions.updateAlgoliaJob(change,context)
              })
   export const onCreateCart=functions.firestore
              .document('carts/{cartId}')
              .onCreate((snapshot,context)=>{
                return recombeeFunctions.AddCartview(snapshot,context)
                    });
    export const onDeleteCart=functions.firestore
             .document('carts/{cartId}')
             .onDelete((snapshot,context)=>{
                   console.log('onDeleteCartRecombee triggered')
                    return recombeeFunctions.DeleteCartview(snapshot,context)
                    });
     export const onCreateBookmarks=functions.firestore
                .document('bookmarks/{bookmarkId}')
                .onCreate((snapshot,context)=>{
                   console.log('onCreateBookmarksRecombee triggered')
                    return recombeeFunctions.AddBookmarks(snapshot,context)
                      });
    export const onDeleteBookmarks=functions.firestore
                .document('bookmarks/{bookmarkId}')
                .onDelete((snapshot,context)=>{
                    console.log('onDeleteBookmarksRecombee triggered')
                    return recombeeFunctions.DeleteBookmarks(snapshot,context)
                   });
             
    export const onCreateReviews=functions.firestore
                    .document('reviews/{reviewId}')
                    .onCreate((snapshot,context)=>{ 
                        console.log('onCreateRatingRecombeetriggered')
                        return recombeeFunctions.AddRatingview(snapshot,context)
                         });
    export const onDeleteReviews=functions.firestore
                    .document('reviews/{reviewId}')
                    .onDelete((snapshot,context)=>{
                       console.log('onDeleteRatingRecombeetriggered')
                        return recombeeFunctions.DeleteRatingview(snapshot,context)
                      });
    export const onCreateOrders=functions.firestore
                           .document('orders/{orderId}')
                           .onCreate((snapshot,context)=>{
                            console.log('onCreatePurchaseRecombee triggered')
                            return recombeeFunctions.AddPurchaseview(snapshot,context) 
                        });
    export const onDeleteOrders=functions.firestore
                           .document('orders/{orderId}')
                           .onDelete((snapshot,context)=>{
                             console.log('onDeletePurchaseRecombee triggered')
                            return recombeeFunctions.DeletePurchaseview(snapshot,context) 
                                     
                               });
                                           
     export const onRecommendItemsToUser=functions.https.onCall((data,context)=>{
                            console.log('RecommendItemsToUser triggered')
                                return recombeeFunctions.RecommendItemsToUser(data,context).then(res=>{
                                console.log(res)
                                const location=data.location
                                return{
                                    body:data.text,
                                    location:location,
                                    from:context.auth?.uid
                                }
                                })
                                 }); 
    export const RecommendUsersToUser=functions.https.onCall((data,context)=>{
                            console.log('RecommendUsersToUserTriggered')
                            return recombeeFunctions.RecommendUsersToUser(data,context).then(res=>{
                                console.log(res);

                                    })
                                });
    export const RecommendItemsToItem=functions.https.onCall((data,context)=>{
                            console.log('RecommendItemsToItemTriggered')
                            return recombeeFunctions.RecommendItemsToItem(data,context).then(res=>{
                                console.log(res);

                                    })
                                });
    export const RecommendUsersToItem=functions.https.onCall((data,context)=>{
                            console.log('RecommendUsersToItemTriggered')
                            return recombeeFunctions.RecommendUsersToItem(data,context).then(res=>{
                                console.log(res);
                            })
                                });
    export const onCreateTest=functions.firestore
    .document('test/{testId}')
    .onCreate((snapshot,context)=>{
      console.log('onDeletePurchaseRecombee triggered')
     return recombeeFunctions.createTestReco(snapshot,context) 
              
        });
   

                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                                /* if (!context.auth) {
                                    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
                                        'while authenticated.');
                                  }
                                  // [END messageHttpsErrors]
                                
                                  // [START authIntegration]
                                  // Authentication / user information is automatically added to the request.
                                  const uid = context.auth.uid;
                                  const name = context.auth.token.name || null;
                                  const picture = context.auth.token.picture || null;
                                  const email = context.auth.token.email || null;
                                  // [END authIntegration]
                                
                                  // [START returnMessageAsync]
                                  // Saving the new message to the Realtime Database.
                                  return admin.database().ref('/messages').push({
                                    author: { uid, name, picture, email },
                                  }).then(() => {
                                    console.log('New Message written');
                                   
                                  // [END returnMessageAsync]
                                    
                                  // [END_EXCLUDE]
                                });
                                    })*/

    






    