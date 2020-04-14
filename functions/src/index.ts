import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
//const serviceAccount = require("servplatform-d4668-firebase-adminsdk-rqyid-c976dca51e.json");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://servplatform-d4668.firebaseio.com'
    
  });



 
//admin.initializeApp(functions.config().firebase);

import * as tookanFunctions from './tookan-operations/index'
import * as CmFunctions from './text-moderation'
import * as ImageFunctions from './image-moderation'
//import * as VideoFunctions from './video-moderation'


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






    
export const onCreateMessage = functions.firestore
    .document('messages/{msgId}')
    .onCreate((snapshot,context) => {
        const msgId = context.params.msgId;
        const msgValue = snapshot.data();
        
        console.log("onCreateMessageTriggered",)
        return CmFunctions.createMsgJob(snapshot,context,msgId,msgValue,"messages_text_moderator_result","messages_text_moderator_job_id",'message');
    });

export const onCreateService = functions.firestore
    .document('services/{serviceId}')
    .onCreate((snapshot,context) => {
        const msgId = context.params.serviceId;
        const msgValue = snapshot.data();
       
        console.log("onCreateServiceTriggered",)
        return CmFunctions.createMsgJob(snapshot,context,msgId,msgValue,"services_text_moderator_result","services_text_moderator_job_id",'service');
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







