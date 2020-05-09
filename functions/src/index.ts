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
               

                         
