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
import * as CmFunctions from './text-moderation'
import * as ImageFunctions from './image-moderation'
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
    export const onCreateMultipleTasks = functions.firestore
    .document('multiple_tasks/{multipleTaskId}')
    .onCreate((snapshot,context) => {
        console.log('onCreateMultipleTasksTriggered',)
        return tookanFunctions.createTookanMultipleTask(snapshot,context);
    });

export const onEditMultipleTasks = functions.firestore
    .document('multiple_tasks/{multipleTaskId}')
    .onUpdate((snapshot,context) => {
        console.log('onEditMultipleTasksTriggered',)
        return tookanFunctions.EditTookanMultipleTask(snapshot,context);
    });


export const onGetTaskDetails = functions.https.onRequest((req, res)=>{
        console.log("onGetTaskDetailsTriggered",)
        return tookanFunctions.TookanGetTaskDetails(req, res);
    }
    );

export const onViewAllDeletedTasks = functions.https.onRequest((req,res)=>{
        console.log("onViewAllDeletedTasksTriggered",)
        return tookanFunctions.TookanViewAllDeletedTasks(req,res);
    }
    );

export const onGetAllRelatedTasks = functions.https.onRequest((req,res)=>{
        console.log("onGetAllRelatedTasksTriggered",)
        return tookanFunctions.TookanonGetAllRelatedTasks(req,res);
    }
    );

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

export const onFindCustomerWithPhone = functions.https.onRequest((req,res)=> {
        console.log('onFindCustomerWithPhoneTriggered',)
        return tookanFunctions.FindCustomerWithPhone(req,res)
    });  

export const onFindCustomerWithName = functions.https.onRequest((req,res) => {
        console.log('onFindCustomerWithNameTriggered',)
        return tookanFunctions.FindCustomerWithName(req,res);
    });  

export const onViewCustomerProfile = functions.https.onRequest((req,res) => {
        console.log('onViewCustomerProfileTriggered',)
        return tookanFunctions.ViewTookanCustomerProfile(req,res);
    });  
export const onGetAllCustomers = functions.https.onRequest((req,res) => {
        console.log('onViewCustomerProfileTriggered',)
        return tookanFunctions.viewCustomers(req,res);
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
export const onCreateTeam = functions.firestore
    .document('teams/{teamId}')
    .onCreate((snapshot,context) => {
        console.log('onCreateTeamTriggered',)
        return tookanFunctions.CreateTookanTeam(snapshot,context);
    }); 

export const onTeamEdit = functions.firestore
    .document('teams/{teamId}')
    .onUpdate((snapshot,context) => {
        console.log('onUpdateTeamTriggered',)
        return tookanFunctions.EditTookanTeam(snapshot,context);
    }); 

export const onDeleteTeam = functions.firestore
    .document('teams/{teamId}')
    .onDelete((snapshot,context) => {
        console.log('onDeleteTeamTriggered',)
        return tookanFunctions.DeleteTookanTeam(snapshot,context);
    });

export const onGetTeamDetails = functions.https.onRequest((req,res) => {
        console.log('onGetTeamDetailsTriggered',)
        return tookanFunctions.GetTookanTeamDetails(req,res);
    }); 
    
export const onGetJobAndAgentDetails = functions.https.onRequest((req,res) => {
        console.log('onGetJonAndAgentDetailsTriggered',)
        return tookanFunctions.GetJobAndAgentDetails(req,res);
    }); 
export const onGetAllTeams = functions.https.onRequest((req,res) => {
        console.log('onGetAllTeamsTriggered',)
        return tookanFunctions.getAllTeams(req,res);
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
        .document('services/{serviceId}/{messageCollectionId}/{messageId}')
        .onCreate((snapshot,context)=>{
           // const msgId = context.params.serviceId;
            //const msgValue = snapshot.data();
            console.log('onCreateServiceTriggered',)
           return tookanFunctions.setService(snapshot,context)
           /*.then(res => {
           console.log('onCreateServiceTriggered',)
           return algoliaFunctions.createAlgoliaService(snapshot,context)
        }).then(res => {
            console.log("onCreateServiceTriggered",)
        return CmFunctions.createMsgJob(snapshot,context,msgId,msgValue,"services_text_moderator_result","services_text_moderator_job_id",'service');
            }).then(res => {
            console.log('onCreateRecombeeItemTriggered')
            return recombeeFunctions.createRecombeeItem(snapshot,context);   
        })*/
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
                           .document('orders/{orderId}/{messageCollectionId}/{messageId}')
                           .onCreate((snapshot,context)=>{
                            console.log('onCreateOrder triggered')
                            return tookanFunctions.setOrder(snapshot,context).then(res=>{  
                                console.log('onCreatePurchaseRecombee triggered')
                                return recombeeFunctions.AddPurchaseview(snapshot,context)
                                   })
                        });
    export const onDeleteOrders=functions.firestore
                           .document('orders/{orderId}/{messageCollectionId}/{messageId}')
                           .onDelete((snapshot,context)=>{
                             console.log('onDeletePurchaseRecombee triggered')
                            return recombeeFunctions.DeletePurchaseview(snapshot,context) 
                                     
                               });
    export const onUpdateOrder=functions.firestore
                            .document('orders/{orderId}')
                            .onUpdate((snapshot,context)=>{
                            console.log('onUpdateOrder Triggered')
                            return tookanFunctions.cancelOrder(snapshot,context)
                                });
                                           
     export const onRecommendItemsToUser=functions.https.onRequest((req,res)=>{
                            console.log('RecommendItemsToUser triggered')
                                return recombeeFunctions.RecommendItemsToUser(req,res)

                                 }); 
    export const RecommendUsersToUser=functions.https.onCall((data,context)=>{
                            console.log('RecommendUsersToUserTriggered')
                            return recombeeFunctions.RecommendUsersToUser(data,context).then(res=>{
                                console.log(res);

                                    })
                                });
    export const RecommendItemsToItem=functions.https.onRequest((req,res)=>{
                            console.log('RecommendItemsToItemTriggered')
                            return recombeeFunctions.RecommendItemsToItem(req,res)
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
    export const getTask = functions.https.onRequest((req,res) => {
        firestoreInstance.collection("tasks").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
               if(doc.data().customer_address !== undefined && doc.data().team_id !== undefined && doc.data().fleet_id !== undefined && doc.data().tags !== undefined && doc.data().job_pickup_address !== undefined){
               firestoreInstance.collection("tasks").where('customer_address','==',doc.data().customer_address).where('team_id','==',doc.data().team_id).where('fleet_id','==',doc.data().fleet_id).where('tags','==',doc.data().tags).where('job_pickup_address','==',doc.data().job_pickup_address).get().then(function(querySnapshot1) {
                querySnapshot1.forEach(function(doc1) {
                    if(doc1.id != doc.id){
                    console.log("ooooo")
                    console.log(doc1.id, " => ", doc1.data());
                    tookanFunctions.CreateMissonCustom(doc1).catch(err => {
                        console.log("Tookan editing agents task failed: " + err)
                    }); 
                }});
            }).catch(err => {
                console.log("Tookan editing agents task failed: " + err)
            }); 
               }
            });
        }).catch(err => {
            console.log("Tookan editing agents task failed: " + err)
        }); 
    })

 export const onDeleteTst=functions.firestore
    .document('carts/{cartId}/{messageCollectionId}/{messageId}/{submessageCollectionId}/{submessageId}/{submessageCollectionId1}/{submessageId1}/{submessageCollectionId2}/{submessageId2}')
   //.document('test1/{testId}/{messageCollectionId}/{messageId}')
       //.onDelete((snapshot,context)=>{
    .onDelete(async (snapshot,context)=>{
        const fieldValue = admin.firestore.FieldValue; 
        const docu=context.params.cartId
    // const collectionPath=firestoreInstance.collection('test_1').doc('mg8519').collection('Urban Clap').get()
     const path=context.params.messageCollectionId
     console.log("Path",path,docu)
     firestoreInstance.collection('carts').doc(docu).get().then(doc => {
         console.log(doc.id,"=>",doc.data())
         const key=Object.keys(doc.data() as string[])[0]
         console.log("Key",key)
          const collectionPath=firestoreInstance.collection('carts').doc(docu)
            collectionPath.set({'providers':fieldValue.arrayRemove(path)},{merge:true}).catch(err => {
            console.log("Tookan editing agents task failed: " + err)
        }); 
     }).catch(err => {
        console.log("Tookan editing agents task failed: " + err)
    }); 
    
   
    


    })
    
exports.recursiveDelete = functions
    .runWith({
      timeoutSeconds: 540,
      memory: '2GB'
    })
    .https.onCall((data, context) => {
      // Only allow admin users to execute this function.
      if (!(context.auth && context.auth.token && context.auth.token.admin)) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'Must be an administrative user to initiate delete.'
        );
      }
      if(data.path.get()==undefined){
      const firebase_tools = require('firebase-tools');
      const path = data.path;
      console.log(
        `User ${context.auth.uid} has requested to delete path ${path}`
      );
  
      // Run a recursive delete on the given document or collection path.
      // The 'token' must be set in the functions config, and can be generated
      // at the command line by running 'firebase login:ci'.
      return firebase_tools.firestore
        .delete(path, {
          project: process.env.GCLOUD_PROJECT,
          recursive: true,
          yes: true,
          token: functions.config().fb.token
        })
        .then(() => {
          return {
            path: path 
          };
        });
    }
    });
    export const onCreateMessageCmId = functions.firestore
    .document('messages_text_moderator_job_id/{msgId}')
    .onCreate((snapshot,context) => {
        const msgId = context.params.msgId;
        const msgValue = snapshot.data();

        console.log("onCreateMessageCmIdTriggered",)
        return CmFunctions.getMsgCmJobDet(snapshot,context,msgId,msgValue,"messages_text_moderator_job_id","messages_text_moderator_rev_id","messages","messages_text_moderator_not_okay",'message');
    });

export const onCreateServiceCmId = functions.firestore
    .document('services_text_moderator_job_id/{serviceId}')
    .onCreate((snapshot,context) => {
        const msgId = context.params.serviceId;
        const msgValue = snapshot.data();
        console.log("onCreateServiceCmIdTriggered",)
        return CmFunctions.getMsgCmJobDet(snapshot,context,msgId,msgValue,"services_text_moderator_job_id","services_text_moderator_rev_id","services","services_text_moderator_not_okay",'service');
    });

export const onMessageCmRevCall = functions.firestore
    .document('messages_text_moderator_rev_call/{msgId}')
    .onCreate((snapshot,context) => {
        const msgId = context.params.msgId;
        const msgValue = snapshot.data();
        console.log("onMessageCmRevCallTriggered",)
        return CmFunctions.getMsgRev(snapshot,context,msgId,msgValue,"messages_text_moderator_job_id","messages","messages_text_moderator_not_okay",'message');
    });

export const onServicesCmRevCall = functions.firestore
    .document('services_text_moderator_rev_call/{serviceId}')
    .onCreate((snapshot,context) => {
        const msgId = context.params.serviceId;
        const msgValue = snapshot.data();
        console.log("onServicesCmRevCallTriggered",)
        return CmFunctions.getMsgRev(snapshot,context,msgId,msgValue,"services_text_moderator_job_id","services","services_text_moderator_not_okay",'service');
    });






export const onImgAdd = functions.firestore
    .document('image/{imgId}')
    .onCreate((snapshot,context) =>{
        const imgId = context.params.imgId;
        const imgValue = snapshot.data();
        console.log("onImgAdd",)
        return ImageFunctions.createImgJob(snapshot,context,imgId,imgValue,'image_image_moderator_job');
    });

export const onImgCmJobId = functions.firestore
    .document('image_image_moderator_job/{imgId}')
    .onCreate((snapshot,context) => {
        const imgId = context.params.imgId;
        const imgValue = snapshot.data();
        console.log("OnImgCmJobId",)
        return ImageFunctions.getImgCmJobDet(snapshot,context,imgId,imgValue,'image_image_moderator_job','image_image_moderator_rev');
    });

export const onImgCmRevCall = functions.firestore
    .document('image_image_moderator_rev_call/{imgId}')
    .onCreate((snapshot,context) => {
        const imgId = context.params.imgId;
        const imgValue = snapshot.data();
        console.log("onImgCmRevCall",)
        return ImageFunctions.getImgRev(snapshot,context,imgId,imgValue,'image_image_moderator_job');
    }); 
export const onCreateMessage = functions.firestore
    .document('messages/{msgId}')
    .onCreate((snapshot,context) => {
        const msgId = context.params.msgId;
        const msgValue = snapshot.data();
        
        console.log("onCreateMessageTriggered",)
        return CmFunctions.createMsgJob(snapshot,context,msgId,msgValue,"messages_text_moderator_result","messages_text_moderator_job_id",'message');
    });
    export const onCreateManager = functions.firestore
    .document('manager_tookan/{managerId}')
    .onCreate((snapshot,context) => {
        console.log('onCreateManagerTriggered',)
        return tookanFunctions.CreateTookanManager(snapshot,context);
    });


export const onViewManager = functions.https.onRequest((req,res)=>{
    console.log("onViewManagerTriggered",)
    return tookanFunctions.TookanViewManager(req,res);
}
);
    

export const onDeleteManager = functions.firestore
    .document('manager_tookan/{managerId}')
    .onDelete((snapshot,context) => {
        console.log('onDeleteManagerTriggered',)
        return tookanFunctions.DeleteTookanManager(snapshot,context);
    });




export const onAddRegion = functions.firestore
    .document('tookan_add_region/{regionId}')
    .onCreate((snapshot,context) => {
        console.log('onAddRegionTriggered',)
        return tookanFunctions.GeofenceAddRegion(snapshot,context);
    });

export const onUpdateRegion = functions.firestore
    .document('tookan_add_region/{regionId}')
    .onUpdate((snapshot,context) => {
        console.log('onupdateRegionTriggered',)
        return tookanFunctions.GeofenceUpdateRegion(snapshot,context);
    });

export const onDeleteRegion = functions.firestore
    .document('tookan_add_region/{regionId}')
    .onDelete((snapshot,context) => {
        console.log('onDeleteRegionTriggered',)
        return tookanFunctions.GeofenceDeleteRegion(snapshot,context);
    });

export const onViewRegion = functions.https.onRequest((req,res)=>{
        console.log("onViewRegionTriggered",)
        return tookanFunctions.TookanViewRegion(req,res);
    }
    );

export const onViewRegionDetails = functions.https.onRequest((req,res)=>{
        console.log("onViewRegionDetailsTriggered",)
        return tookanFunctions.TookanViewRegionDetails(req,res);
    }
    );

export const onRemoveRegionfromAgent = functions.https.onRequest((req,res)=>{
        console.log("onRemoveRegionfromAgentTriggered",)
        return tookanFunctions.TookanRemoveRegionfromAgent(req,res);
    }
    );
export const onProviderAdd = functions.firestore
    .document('providers/{providerId}')
    .onCreate((snapshot,context) => {
        console.log('onProviderAddTriggered',)
        const providerId = context.params.providerId;
        const newValue = snapshot.data();
        const date = new Date();
        const time = date.getTime() ;
        const area_serviced_geofence = [-60.79543,34.04843]
        const images = ["https://media.publit.io/file/Screenshot_20200504-124016.png","https://media.publit.io/file/Screenshot_20200505-213625.png", "https://media.publit.io/file/1641b604-8686-496f-a50d-aec85f4f162d6809517598904074481.jpg", "https://media.publit.io/file/Screenshot_20200505-225632.png"]
        const options = {
            add_agent:"ag_2",
            add_region:38.17,  
            add_task:"",
            add_team:"team_2",
            area_serviced_geofence:area_serviced_geofence,
            business_category_id:"cat_1",
            city_id:0,
            commission_percentage: 4,
            commission_type:null,
            company_address:"Urban Plates",
            company_latitude:-121.28,
            company_longitude:38.17,
            country_code:91,
            creation_datetime:time.toString(),
            delivery_charges:24,
            description:"We offer variety of Steaks and Salads",
            device_token:null,
            discount_and_other_info:"discount on amount more than $20 and free delivery",
            display_address:"22nd street, Thousand oaks",
            dynamic_delivery_charges:22,
            edit_fleet_availability:1,
            email_verification_token:1,
            enable_merchant_delivery_charges:0,
            first_name:newValue?.last_name,
            introduction:"healthiest salads with rooftop view.",
            is_active:1,
            is_blocked:0,
            is_deleted:0,
            is_verified:1,
            images:images,
            key_highlights:"[{icon: check_circle_outline, text:\"Unmatched taste\"},{icon: check_circle_outline, text: \"text 2\"}]",
            last_name: newValue?.last_name,
            last_review_rating:4.6,
            logo_url:"https://logo.clearbit.com/urbanplates.com",
            long_description:"We offer variety of Steaks and Salads",
            merchant_key:"m_2",
            merchant_permission:"[{1,0,1,1,0,0,1,1,0,1}]",
            multi_image_url:"https://logo.clearbit.com/urbanplates.com",
            new_email:"xyz@gmail.com",
            number_of_steps_left: 1,
            open_close_busy:0,
            partial_open_close_text:1,
            phone: 9852365412,
            provider_key:"provider_food_2",
            provider_name:"Urban Plates",
            reviews_key:"Pr8520",
            schedule_type: "",
            seo_fields:null,
            serving_distance:3,
            setup_level:"gold",
            sponsorship_is_active:null,
            state_id: 0,
            store_rating:5,
            storepage_slug:"Priyanshi",
            story_key:"St_21",
            stripe_connect_country:"usa",
            stripe_connect_currency:"usd",
            "template_name: Order details":"",
            subtitles:["Subtitle1","Subtitle2"],
            total_earnings:99,
            total_ratings_count:215,
            total_ratings_sum:1075,
            total_review_count:315,
            update_datetime:"2019-09-18T05:03:29.000Z",
            user_key:"Pr8520",
            verification_status: 0,
            view_agent:"thomas",
            view_fleet_availability:1,
            view_region:-121.28,
            view_task:"",
            view_team:"[ag_5,ag_9,ag_25]",

 }
        return firestoreInstance.collection("template_provider").doc(providerId).set(options).then(() =>{
            console.log("template updated :",providerId)
        }).catch(err => {
            console.log("error occured",err)
        })
    });
export const onServiceAdd = functions.firestore
    .document('services/{serviceId}')
    .onCreate((snapshot,context) => {
        console.log('onserviceAddTriggered',)
        const serviceId = context.params.serviceId;
        const newValue = snapshot.data();
        const availability = ["Morning","Afternoon","Evening","Night","Late Night","Early Morning"]
        const customization = ["",""];
        const date = new Date();
        const time =date.toISOString();
        const sub_type = ["sub_service_2"] 
        const options = {
            availability : availability,
            available_quantity : 0,
            cutomization:customization,
            category_key : "cat_27",
            created_at : time,
            currency : "usd",
            has_delivery : "0",
            has_pickup : "1",
            inventory_enabled : "0",
            is_check_box : "0",
            is_multiple : "1",
            is_side_order : "0",
            is_auto_assign:"0",
            is_default:"0",
            is_appointments_only:"0",
            latitude : "",
            layout_type : "0",
            logo_url : "",
            longitude : "",
            maximum_selection : "2",
            minimum_quantity : "0",
            minimum_selection : "1",
            multi_img_url : "",
            offer_takeout_curberside_droppin:"0",
            office_locations:["office_location_id","office_2_location"],
            other_tasks:"team_1",
            percentage_match:"98",
            pickup_delivery_info:['info1'],
            parent_category_key : "cat_1",
            price : newValue?.price,
            price_per:"item",
            provider_key : newValue?.provider_key,
            rating : "3.8",
            repeat_discounts:"0",
            service_description : "We offer different stylish hairstyles",
            service_name : newValue?.service_name,
            service_time : "30",
            sub_type : sub_type,
            unit : "service"
        }
        return firestoreInstance.collection("template").doc(serviceId).set(options).then(() =>{
            console.log("template updated :",serviceId)
        }).catch(err => {
            console.log("error occured",err)
        })
    });


                         
