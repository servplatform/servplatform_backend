import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
//const serviceAccount = require("servplatform-d4668-firebase-adminsdk-rqyid-c976dca51e.json");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://servplatform-d4668.firebaseio.com'
  });
 
//admin.initializeApp(functions.config().firebase);

import * as tookanFunctions from './tookan-operations/index'

export const firestoreInstance = admin.firestore();

export const onTaskCreate = functions.firestore
    .document('tasks/{taskId}')
    .onCreate((snapshot,context) => {
        console.log('onTaskCreateTriggered')
        return tookanFunctions.createTookanTask(snapshot,context);
    });
export const onTaskEdit = functions.firestore
    .document('tasks/{taskId}')
    .onUpdate((change,context) => {
        console.log('onTaskEditTriggered',)
        if(change.before.data()==change.after.data()){
            console.log("Text didnot changed")
            return null
        }
        else
        return tookanFunctions.edittookantask(change,context);
    });    
    
export const onTaskDelete = functions.firestore
    .document('tasks/{taskId}')
    .onDelete((snapshot,context) => {
        console.log('onTaskDeleteTriggered',)
        return tookanFunctions.deleteTookanTask(snapshot,context);
    }); 

export const onTaskStatus = functions.https.onCall((data,context)=> {
        console.log('onTaskStatusTriggered',)
        return tookanFunctions.updateTookanTaskstatus(data,context);
    }); 

export const onStartTask = functions.https.onCall((data,context)=> {
        console.log('onStartTaskTriggered',)
        return tookanFunctions.Starttookantask(data,context);
    }); 

export const onCancelTask = functions.https.onCall((data,context)=> {
        console.log('onCancelTaskTriggered',)
        return tookanFunctions.Canceltookantask(data,context);
    }); 

export const onAssignTask = functions.https.onCall((data,context) => {
        console.log('onAssignTaskTriggered',)
        return tookanFunctions.Assigntookantask(data,context);
    }); 

export const onAutoAssignTask = functions.https.onCall((data,context)=> {
        console.log('onAutoAssignTaskTriggered',)
        return tookanFunctions.AutoAssigntookantask(data,context);
    }); 

export const onTaskStatistics = functions.https.onCall((data,context) => {
        console.log('onTaskStatisticsTriggered',)
        return tookanFunctions.GettookantaskStatistics(data,context);
    }); 


    export const onViewAllTasks = functions.https.onCall((data,context) => {
        console.log('onViewAllTasksTriggered',)
        return tookanFunctions.Getalltookantask(data,context);
    });
    
    export const onGetTaskByOrderId = functions.https.onCall((data,context) => {
        console.log('onGetTaskByOrderIdTriggered',)
        return tookanFunctions.GetTaskByOrderId(data,context);
    });

    export const onGetRouteDetails = functions.https.onCall((data,context) => {
        console.log('onGetRouteDetailsTriggered',)
        return tookanFunctions.GetRouteDetails(data,context);
    });

    export const onGetFareEstimate = functions.https.onCall((data,context) => {
        console.log('onGetFareEstimateTriggered',)
        return tookanFunctions.GetFareEstimate(data,context);
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
    .onCreate((snapshot,context) => {
        console.log('onEditAgentsTriggered',)
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
    .onCreate((snapshot,context) => {
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

// export const onAddCustomer = functions.firestore
//     .document('users/{customerId}')
//     .onCreate((snapshot,context) => {
//         console.log('onAddCustomerTriggered',)
//         return tookanFunctions.AddNewCustomer(snapshot,context);
//     });  

export const onEditCustomer = functions.firestore
    .document('users/{customerId}')
    .onUpdate((change,context) => {
        console.log('onEditCustomerTriggered',)
        return tookanFunctions.EditCustomer(change,context);
    });  

export const onFindCustomerWithPhone = functions.firestore
        .document('users/{customerId}')
        .onCreate((snapshot,context) => {
        console.log('onFindCustomerWithPhoneTriggered',)
        return tookanFunctions.FindCustomerWithPhone(snapshot,context);
    });  

export const onFindCustomerWithName = functions.https.onCall((data,context) => {
        console.log('onFindCustomerWithNameTriggered',)
        return tookanFunctions.FindCustomerWithName(data,context);
    });  

export const onViewCustomerProfile = functions.https.onCall((data,context) => {
        console.log('onViewCustomerProfileTriggered',)
        return tookanFunctions.ViewTookanCustomerProfile(data,context);
    });  

export const onDeleteCustomer = functions.firestore
    .document('users/{customerId}')
    .onDelete((snapshot,context) => {
        console.log('onDeleteCustomerTriggered',)
        return tookanFunctions.DeleteTookanCustomer(snapshot,context);
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

    export const onGetTeamDetails = functions.https.onCall((data,context) => {
        console.log('onGetTeamDetailsTriggered',)
        return tookanFunctions.GetTookanTeamDetails(data,context);
    }); 
    
    export const onGetJonAndAgentDetails = functions.https.onCall((data,context) => {
        console.log('onGetJonAndAgentDetailsTriggered',)
        return tookanFunctions.GetJobAndAgentDetails(data,context);
    }); 

    export const onCreateMission = functions.firestore
    .document('mission/{missionId}')
    .onCreate((snapshot,context) => {
        console.log('onCreateMissionTriggered',)
        return tookanFunctions.CreateTookanMission(snapshot,context);
    }); 

    export const onGetMissionList = functions.https.onCall((data,context) => {
        console.log('onGetMissionListTriggered',)
        return tookanFunctions.GetMissionList(data,context);
    }); 

    export const onDeleteMission = functions.firestore
    .document('mission/{missionId}')
    .onCreate((snapshot,context) => {
        console.log('onDeleteMissionTriggered',)
        return tookanFunctions.DeleteTookanMission(snapshot,context);
    }); 



    
