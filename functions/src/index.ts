import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
//const serviceAccount = require("servplatform-d4668-firebase-adminsdk-rqyid-c976dca51e.json");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://servplatform-d4668.firebaseio.com'
  });
  const algoliasearch = require("algoliasearch");
  const client = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey,{protocol: 'https:'},);
  const agentindex=client.initIndex('agents'); 
  const jobindex=client.initIndex('jobindex');
  const serviceindex=client.initIndex('services');
 
//admin.initializeApp(functions.config().firebase);

import * as tookanFunctions from './tookan-operations/index'

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

export const onGetAllAgents = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAllAgentsTriggered',)
        return tookanFunctions.getAllTookanAgents(snapshot,context);
    });    
    export const onAddAgents = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onAddAgentsTriggered',)
        return tookanFunctions.AddTookanAgents(snapshot,context);
    });  
           

export const onEditAgents = functions.firestore
    .document('agents/{agentId}')
    .onUpdate((snapshot,context) => {
        console.log('onEditAgentsTriggered',)
        const newData = snapshot.after.data();
        const object = {
            objectID: context.params.algoid,
            ...newData
        }

        return agentindex.partialUpdateObject(object);
        return tookanFunctions.EditTookanAgents(snapshot,context);
    }); 
    
export const onBlockUnblockAgents = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onBlockUnblockAgentsTriggered',)
        return tookanFunctions.BlockorUnblockTookanAgents(snapshot,context);
    }); 
   
export const onDeleteAgents = functions.firestore
    .document('agents/{agentId}')
    .onDelete((snapshot,context) => {
        console.log('onDeleteAgentsTriggered',)
        return tookanFunctions.DeleteTookanAgents(snapshot,context);
    });
    
export const onViewAgentsProfile = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onViewAgentsProfileTriggered',)
        return tookanFunctions.ViewTookanAgentsProfile(snapshot,context);
    }); 

export const onUpdateAgentsTag = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onUpdateAgentsTagTriggered',)
        return tookanFunctions.UpdateTookanAgentTags(snapshot,context);
    });  
    
export const onGetAgentsTag = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAgentsTagTriggered',)
        return tookanFunctions.GetTookanAgentTags(snapshot,context);
    }); 
    
export const onGetAgentsLogs = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAgentsLogsTriggered',)
        return tookanFunctions.GetTookanAgentLogs(snapshot,context);
    }); 
    
export const onGetAgentsLocation = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAgentsLocationTriggered',)
        return tookanFunctions.GetTookanAgentLocation(snapshot,context);
    });  

export const onSendAgentsNotification = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onSendAgentsNotificationTriggered',)
        return tookanFunctions.SendAgentNotification(snapshot,context);
    });    

export const onGetAgentsSchedule = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onGetAgentsScheduleTriggered',)
        return tookanFunctions.GetTookanAgentSchedule(snapshot,context);
    }); 
    
export const onAssignAgentsTask = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snapshot,context) => {
        console.log('onAssignAgentsTaskTriggered',)
        return tookanFunctions.AssignTookanAgentTask(snapshot,context);
    });  

export const onAddCustomer = functions.firestore
    .document('users/{customerId}')
    .onCreate((snapshot,context) => {
        console.log('onAddCustomerTriggered',)
        return tookanFunctions.AddNewCustomer(snapshot,context);
    });  

export const onEditCustomer = functions.firestore
    .document('users/{customerId}')
    .onUpdate((snapshot,context) => {
        console.log('onEditCustomerTriggered',)
        return tookanFunctions.EditCustomer(snapshot,context);
    });  

export const onFindCustomerWithPhone = functions.firestore
    .document('users/{customerId}')
    .onCreate((snapshot,context) => {
        console.log('onFindCustomerWithPhoneTriggered',)
        return tookanFunctions.FindCustomerWithPhone(snapshot,context);
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
        return tookanFunctions.DeleteTookanCustomer(snapshot,context);
    });
 export const onCreateAgent = functions.firestore
    .document('agents/{agentId}')
    .onCreate((snap,context) => {
        const data=snap.data();
       const objectID=snap.id;
        console.log('onCreateAgentsTriggered',)
        return agentindex.saveObject(
            {objectID,
            ...data
            });
        
    });  


 export const onUpdateAgent = functions.firestore
    .document('agents/{agentId}').onUpdate((change, context) => {
           const newData = change.after.data();
           const object = {
               objectID: context.params.algoid,
               ...newData
           }
   
           return agentindex.partialUpdateObject(object);
       }) 
  export const onDeleteAgent=functions.firestore
       .document('agents/{agentId}')
       .onDelete((snap,context)=>{
        const objectID=snap.id;
        console.log('onDeletealgoTriggered',) 
        return agentindex.deleteObject(objectID);
           
           });
 
  
   
    export const onCreateService=functions.firestore
        .document('services/{serviceId}')
        .onCreate((snap,context)=>{
           const data=snap.data();
           const objectID=snap.id;
           console.log('onCreatealgoTriggered',)
           return serviceindex.saveObject(
               {objectID,
               ...data
           });
       });
    export const onDeleteService=functions.firestore
       .document('services/{serviceId}')
       .onDelete((snap,context)=>{
           const objectID=snap.id;
           console.log('onDeletealgoTriggered',) 
           return serviceindex.deleteObject(objectID);
           });
    
     export const onUpdateService = functions.firestore
        .document('services/{serviceId}').onUpdate((change, context) => {
               const newData = change.after.data();
               const object = {
                   objectID: context.params.algoid,
                   ...newData
               }
       
               return serviceindex.partialUpdateObject(object);
           })
           
           export const onCreateJob=functions.firestore
           .document('jobs/{jobId}')
           .onCreate((snap,context)=>{
              const data=snap.data();
              const objectID=snap.id;
              console.log('onCreatealgoTriggered',)
              return jobindex.saveObject(
                  {objectID,
                  ...data
              });
          });
       export const onDeleteJob=functions.firestore
          .document('jobs/{jobId}')
          .onDelete((snap,context)=>{
              const objectID=snap.id;
              console.log('onDeletealgoTriggered',) 
              return jobindex.deleteObject(objectID);
              });
       
        export const onUpdateJob = functions.firestore
           .document('jobs/{jobId}').onUpdate((change, context) => {
                  const newData = change.after.data();
                  const object = {
                      objectID: context.params.algoid,
                      ...newData
                  }
          
                  return jobindex.partialUpdateObject(object);
              })
       
       