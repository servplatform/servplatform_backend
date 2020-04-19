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
export const onViewAgentsProfile = functions.https.onRequest((req,res)=>{
        console.log("onViewAgentsProfileTriggered",)
        return tookanFunctions.ViewTookanAgentsProfile(req,res);
    }
    );
export const onViewAgentStripeDetails = functions.https.onRequest((req,res) => {
        console.log('onViewAgentStripeDetailsTriggered',)
        return tookanFunctions.ViewAgentsStripeDetails(req,res);
    }); 

export const onUpdateAgentsTag = functions.firestore
    .document('agents/{agentId}')
    .onUpdate((snapshot,context) => {
        console.log('onUpdateAgentsTagTriggered',)
        return tookanFunctions.UpdateTookanAgentTags(snapshot,context);
    });  
    
export const onGetAgentsTag = functions.https.onRequest((req,res)=> {
        console.log('onGetAgentsTagTriggered',)
        return tookanFunctions.GetTookanAgentTags(req,res);
    }); 
    
export const onGetAgentsLogs = functions.https.onRequest((req,res)=> {
        console.log('onGetAgentsLogsTriggered',)
        return tookanFunctions.GetTookanAgentLogs(req,res);
    }); 
    
export const onGetAgentsLocation = functions.https.onRequest((req,res)=> {
        console.log('onGetAgentsLocationTriggered',)
        return tookanFunctions.GetTookanAgentLocation(req,res);
    });  

export const onSendAgentsNotification = functions.https.onRequest((req,res)=> {
        console.log('onSendAgentsNotificationTriggered',)
        return tookanFunctions.SendAgentNotification(req,res);
    });    

export const onGetAgentsSchedule = functions.https.onRequest((req,res)=> {
        console.log('onGetAgentsScheduleTriggered',)
        return tookanFunctions.GetTookanAgentSchedule(req,res);
    }); 
export const onGetAgentsActivityTimeline = functions.https.onRequest((req,res)=> {
        console.log('onGetAgentsActivityTimelineTriggered',)
        return tookanFunctions.GetTookanActivityTimeline(req,res);
    }); 
export const onGetAgentsRatingsAndReviews = functions.https.onRequest((req,res)=> {
        console.log('onGetAgentsRatingsAndReviewsTriggered',)
        return tookanFunctions.GetTookanAgentRating(req,res);
    }); 
export const onGetAgentsNearCustomer = functions.https.onRequest((req,res)=> {
        console.log('onGetAgentsNearCustomerTriggered',)
        return tookanFunctions.GetTookanAgentNearCustomer(req,res);
    }); 
export const onGetMonthlyAgentsSchedule = functions.https.onRequest((req,res)=> {
        console.log('onGetMonthlyAgentsScheduleTriggered',)
        return tookanFunctions.GetMonthlyAgentSchedule(req,res);
    }); 

export const onAssignAgentsTask = functions.firestore
    .document('agents/{agentId}')
    .onUpdate((snapshot,context) => {
        console.log('onAssignAgentsTaskTriggered',)
        return tookanFunctions.AssignTookanAgentTask(snapshot,context);
    });  
 export const onAssignAgentsRelatedTask = functions.firestore
    .document('agents/{agentId}')
    .onUpdate((snapshot,context) => {
        console.log('onAssignAgentsRelatedTaskTriggered',)
        return tookanFunctions.AssignTookanAgentRelatedTask(snapshot,context);
    });  
export const onReassignAgentsMultipleTask = functions.firestore
    .document('agents/{agentId}')
    .onUpdate((snapshot,context) => {
        console.log('onReassignAgentsMultipleTaskTriggered',)
        return tookanFunctions.ReAssignTookanAgentTask(snapshot,context);
    });  
export const onCreateFleetWalletTransaction = functions.https.onRequest((req,res)=> {
        console.log('onCreateFleetWalletTransactionTriggered',)
        return tookanFunctions.CreateFleetWalletTransaction(req,res);
    }); 
export const onGetFleetWalletTransaction = functions.https.onRequest((req,res)=> {
        console.log('onGetFleetWalletTransactionTriggered',)
        return tookanFunctions.GetFleetWalletTransaction(req,res);
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
 export const onViewMerchantsProfile = functions.https.onRequest((req,res)=> {
        console.log('onViewMerchantsProfileTriggered',)
        return tookanFunctions.ViewTookanMerchant(req,res);
    }); 
 export const onGetMerchantDetails = functions.https.onRequest((req,res)=> {
        console.log('onViewMerchantsProfileTriggered',)
        return tookanFunctions.GetMerchantDetails(req,res);
    }); 
export const onGetMerchantTeams = functions.https.onRequest((req,res)=> {
        console.log('onGetMerchantTeamTriggered',)
        return tookanFunctions.GetMerchantTeam(req,res);
    }); 
export const onGetMerchantReports = functions.https.onRequest((req,res)=> {
        console.log('onViewMerchantsProfileTriggered',)
        return tookanFunctions.GetMerchantReports(req,res);
    }); 
export const onBlockUnblockMerchant = functions.firestore
    .document('providers/{providerId}')
    .onUpdate((snapshot,context) => {
        console.log('onBlockUnblockMerchantTriggered',)
        return tookanFunctions.BlockUnblockMerchant(snapshot,context);
    }); 
 export const AvailableMerchantAgents = functions.https.onRequest((req,res)=> {
        console.log('onViewMerchantsProfileTriggered',)
        return tookanFunctions.AvailableMerchantAgents(req,res);
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
export const onCreateMission = functions.firestore
    .document('missions/{missionId}')
    .onCreate((snapshot,context) => {
        console.log('onCreateMissionTriggered',)
        return tookanFunctions.CreateMissonTask(snapshot,context);
    });
export const getMissionList = functions.https.onRequest((req,res) => {
        console.log('ongetMissionListTriggered',)
        return tookanFunctions.missionList(req,res);
    });
export const onDeleteMission = functions.firestore
    .document('missions/{missionId}')
    .onDelete((snapshot,context) => {
        console.log('onDeleteMissionTriggered',)
        return tookanFunctions.DeleteTookanMission(snapshot,context);
    });
 export const onSetTookanWebhookSecret=functions.https.onCall((data,context)=>{
    console.log('onSetTookanWebhookSecretTriggered',)
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
    export const onRequestRecieved = functions.https.onRequest(async (req,res) => {
        return tookanFunctions.UpdateJobStatus(req,res);
     })
     export const onAgentStarted = functions.https.onRequest((req,res) => {
        return tookanFunctions.UpdateJobStatus(req,res);
    })
    export const onAgentArrived = functions.https.onRequest((req,res) => {
        return tookanFunctions.UpdateJobStatus(req,res);
    })
    export const onSuccessful = functions.https.onRequest((req,res) => {
        return tookanFunctions.UpdateJobStatus(req,res);
    })
    export const onFailed = functions.https.onRequest((req,res) => {
        return tookanFunctions.UpdateJobStatus(req,res);
    })
    export const onAutoAllocationStarted = functions.https.onRequest((req,res) => {
        return tookanFunctions.UpdateJobStatus(req,res);
    })
    export const onAutoAllocationFailed = functions.https.onRequest((req,res) => {
        return tookanFunctions.UpdateJobStatus(req,res);
    })
  
                            
                            
                            
                            
                            
                            
                            
                            
        /*
        export const onRequestRecieved = functions.https.onRequest(async (req,res) => {
            //console.log(req.body)
            // console.log(req.body.fleet_id)
            const taskref = admin.firestore().collection('tasks_status');
           let query = taskref.where('job_id', '==',82506622 ).get()
            .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
             return;
             }  
    
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
        console.log(query)
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
         admin.firestore().collection('tasks_status').doc('ak52').update({
                job_status:req.body
               // req.body
            }).then(snapshot=>{
                res.redirect(303,'https://console.firebase.google.com/u/0/project/servplatform-d4668/database/firestore/data~2Fhooks~2Faaaaa');
            }).catch(err => {
             console.log("Getting Available merchant agents failed: " + err)
         });
         })




          export const onRequestRecieved = functions.https.onRequest(async (req,res) => {
          const taskref = firestoreInstance.collection('tasks_status');
          taskref.where('job_id', '==',req.body.job_id).get()
            .then(snapshot => {
            if (snapshot.empty) {
            console.log('Error.');
             return;
             }  
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          taskref.doc(doc.id).update({
            job_status:req.body
        }).catch(err => {
         console.log("Getting onRequests failed: " + err)
     });
        });
       
    }).catch(err => {
        console.log("Getting onRequests failed: " + err)
    });
  })





 

        
        */
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            

     
 