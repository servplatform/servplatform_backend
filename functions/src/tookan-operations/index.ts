import {
    TOOKAN_API_KEY,TASKS, AGENTS,TASKS_STATUS,AGENTS_STATUS,PROVIDERS_STATUS, USERS_STATUS, TEAMS_STATUS, ORDERS
} from "../constants";
import {firestoreInstance} from "../index";
import * as Tookan from "tookan-api";
const client = new Tookan.Client({api_key:TOOKAN_API_KEY});
export async function createTookanTask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    if(newValue.merchant_id!== undefined){
        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        const request = new XMLHttpRequest();
        console.log("Adding Task for merchant id ",newValue.merchant_id,"for",TOOKAN_API_KEY);
        request.open('POST', 'https://api.tookanapp.com/v2/create_task');    
        request.setRequestHeader('Content-Type', 'application/json');
    
        request.onload = function () {
            if (request.readyState === request.DONE) {
                if (request.status === 200) {
                    const res=JSON.parse(request.responseText)
                    console.log("Adding Task Details of tookan agents:",(JSON.parse(request.responseText)).data);
                     tookanaddagents(res,taskId).catch(err => {
                        console.log("Tookan adding task failed: " + err)
                    });
                }
            }
        };
    
        const body = {
            api_key:TOOKAN_API_KEY,
            order_id:newValue.order_id,
            job_description:newValue.job_description,
            customer_email:newValue.customer_email,
            customer_username:newValue.customer_username,
            customer_phone:newValue.customer_phone,
            customer_address:newValue.customer_address,
            latitude:newValue.latitude,
            longitude:newValue.longitude,
            job_delivery_datetime:newValue.job_delivery_datetime,
            custom_field_template:newValue.custom_field_template,
            meta_data:newValue.meta_data,
            team_id:newValue.team_id,
            auto_assignment:newValue.auto_assignment,
            has_pickup:newValue.has_pickup,
            has_delivery:newValue.has_delivery,
            layout_type:newValue.layout_type,
            tracking_link:newValue.tracking_link,
            merchant_id: newValue.merchant_id,
            timezone:newValue.timezone,
            fleet_id:newValue.fleet_id,
            ref_images:newValue.ref_images,
            notify:newValue.notify,
            tags:newValue.tags,
            geofence:newValue.geofence
        };
    
        request.send(JSON.stringify(body));
        
    
            }


    else{
    

    console.log('Triggering Create Tookan task for task id ', taskId, newValue);
    
    const options = {
        api_key:TOOKAN_API_KEY,
        order_id:newValue.order_id,
        job_description:newValue.job_description,
        customer_email:newValue.customer_email,
        customer_username:newValue.customer_username,
        customer_phone:newValue.customer_phone,
        customer_address:newValue.customer_address,
        latitude:newValue.latitude,
        longitude:newValue.longitude,
        job_delivery_datetime:newValue.job_delivery_datetime,
        custom_field_template:newValue.custom_field_template,
        meta_data:newValue.meta_data,
        team_id:newValue.team_id,
        auto_assignment:newValue.auto_assignment,
        has_pickup:newValue.has_pickup,
        has_delivery:newValue.has_delivery,
        layout_type:newValue.layout_type,
        tracking_link:newValue.tracking_link,
        timezone:newValue.timezone,
        fleet_id:newValue.fleet_id,
        ref_images:newValue.ref_images,
        notify:newValue.notify,
        tags:newValue.tags,
        geofence:newValue.geofence
    };
    //Create task in tookan
    return client.createTask(options).then(res => {
        console.log("Creating tookan task for options: ", options);
        return updateTaskOnTaskCreate(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan Create task failed: " + err)
    });
}
}

async function updateTaskOnTaskCreate (res,taskId): Promise<string> {
    console.log("Tookan task created with response successfully for taskId: ",taskId,"Response received from tookan: ",res.data);
    console.log("Update Task based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS_STATUS).doc(taskId);
    taskRef.set(res.data).then(() => console.log("task updated based on tookan response for taskId:", taskId)).catch(err => console.log("Update task based on task id failed for: " + err));
	return taskId
}

export async function edittookantask(change, context) {
    
    const taskId = context.params.taskId;
    const newValue = change.after.data();
    if(newValue.merchant_id!== undefined){
        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        const request = new XMLHttpRequest();
        console.log("Editing Task for merchant id ",newValue.merchant_id,"for",TOOKAN_API_KEY);
        request.open('POST', 'https://api.tookanapp.com/v2/edit_task');
                request.setRequestHeader('Content-Type', 'application/json');
    
        request.onload = function () {
            if (request.readyState === request.DONE) {
                if (request.status === 200) {
                    const res=JSON.parse(request.responseText)
                    console.log("Editing Task Details of tookan agents:",(JSON.parse(request.responseText)).data);
                     tookanaddagents(res,taskId).catch(err => {
                        console.log("Tookan edit task failed: " + err)
                    });
                }
            }
        };
    
        const body = {
            api_key:TOOKAN_API_KEY,
            order_id:newValue.order_id,
            job_description:newValue.job_description,
            customer_email:newValue.customer_email,
            customer_username:newValue.customer_username,
            customer_phone:newValue.customer_phone,
            customer_address:newValue.customer_address,
            latitude:newValue.latitude,
            longitude:newValue.longitude,
            job_delivery_datetime:newValue.job_delivery_datetime,
            custom_field_template:newValue.custom_field_template,
            meta_data:newValue.meta_data,
            team_id:newValue.team_id,
            auto_assignment:newValue.auto_assignment,
            has_pickup:newValue.has_pickup,
            has_delivery:newValue.has_delivery,
            layout_type:newValue.layout_type,
            tracking_link:newValue.tracking_link,
            merchant_id: newValue.merchant_id,
            timezone:newValue.timezone,
            fleet_id:newValue.fleet_id,
            ref_images:newValue.ref_images,
            notify:newValue.notify,
            tags:newValue.tags,
            geofence:newValue.geofence
        };
    
        request.send(JSON.stringify(body));
        
    
            }

    else{
    
    console.log('Triggering Edit Tookan task for task id ', taskId, newValue);
    
    const options = {
        
        api_key:TOOKAN_API_KEY,
        order_id:newValue.order_id,
        job_description:newValue.job_description,
        customer_email:newValue.customer_email,
        customer_username:newValue.customer_username,
        customer_phone:newValue.customer_phone,
        customer_address:newValue.customer_address,
        latitude:newValue.latitude,
        longitude:newValue.longitude,
        job_delivery_datetime:newValue.job_delivery_datetime,
        custom_field_template:newValue.custom_field_template,
        meta_data:newValue.meta_data,
        team_id:newValue.team_id,
        auto_assignment:newValue.auto_assignment,
        has_pickup:newValue.has_pickup,
        has_delivery:newValue.has_delivery,
        layout_type:newValue.layout_type,
        tracking_link:newValue.tracking_link,
        timezone:newValue.timezone,
        fleet_id:newValue.fleet_id,
        ref_images:newValue.ref_images,
        notify:newValue.notify,
        tags:newValue.tags,
        geofence:newValue.geofence,
        job_id:(await firestoreInstance.collection(TASKS_STATUS).doc(taskId).get())?.data()?.job_id
      };
    //Edit task in tookan
    console.log('Editing tookan task for options: ', options);
    return client.editTask(options).then(res => {
        return updateTaskOnTaskEdit(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan Edit task failed: " + err)
    });
}
}


async function updateTaskOnTaskEdit (res,taskId): Promise<string> {
    console.log("Tookan task edited with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Update Task based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS_STATUS).doc(taskId);
    taskRef.set(res.data).then(() => console.log("task updated based on tookan response for taskId:", taskId)).catch(err => console.log("Update task based on task id failed for: " + err));
	return taskId
}


export async function deleteTookanTask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Delete Tookan task for task id ', taskId, newValue);

    const options = {
        api_key:TOOKAN_API_KEY,
        job_id: newValue.job_id
    };
    //delete task in tookan
    console.log('Deleting tookan task for options: ', options);
    return client.deleteTask(options).then(res => {
        return updateTaskDeletion(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan Deletion task failed: " + err)
    });
}

async function updateTaskDeletion (res,taskId): Promise<string> {
    console.log("Tookan task deleted successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Deleting Task based on response for taskId started",taskId);
    console.log("Task Deleted for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data()).then(() => console.log("task deleted based on tookan response for taskId:", taskId)).catch(err => console.log("Task Deletion based on task id failed for: " + err));
	return taskId
}

export async function updateTookanTaskstatus(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Update Tookan task status for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        job_status: newValue.job_status
      };
    //Update task status in tookan
    console.log('Updating tookan task status for options: ', options);
    return client.updateTaskStatus(options).then(res => {
        return updateTookanTaskStatus(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan task status update failed: " + err)
    });
}

async function updateTookanTaskStatus(res,taskId): Promise<string> {
    console.log("Tookan task status updated successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Update Task status based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data()).then(() => console.log("task status updated based on tookan response for taskId:", taskId)).catch(err => console.log("Updating task status based on task id failed for: " + err));
	return taskId
}

export async function Starttookantask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Start Tookan task for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        job_status: newValue.job_status
      };
    //Start task in tookan
    console.log('starting tookan task for options: ', options);
    return client.startTask(options).then(res => {
        return tookantaskstart(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan task start failed: " + err)
    });
}

async function tookantaskstart(res,taskId): Promise<string> {
    console.log("Tookan task started with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Update Task based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data()).then(() => console.log("task started based on tookan response for taskId:", taskId)).catch(err => console.log("Task Start based on task id failed for: " + err));
	return taskId
}

export async function Canceltookantask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Cancel Tookan task for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        job_status: newValue.job_status //9
      };
    //Cancel task in tookan
    console.log('Cancelling tookan task for options: ', options);
    return client.cancelTask(options).then(res => {
        return tookantaskcancel(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan task cancelling failed: " + err)
    });
}

async function tookantaskcancel(res,taskId): Promise<string> {
    console.log("Tookan task cancelled with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Cancel Task based on response for taskId started",taskId);
    console.log("Cancelled content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data()).then(() => console.log("task cancelled based on tookan response for taskId:", taskId)).catch(err => console.log("Task Cancelled based on task id failed for: " + err));
	return taskId
}

export async function Assigntookantask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Assign Tookan task for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        fleet_id: newValue.fleet_id,
        team_id: newValue.team_id,
        job_status: newValue.job_status
      };
    //Assign task in tookan
    console.log('Assigning tookan task for options: ', options);
    return client.assignTask(options).then(res => {
        return tookantaskassign(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan task assigning failed: " + err)
    });
}

async function tookantaskassign(res,taskId): Promise<string> {
    console.log("Tookan task assigned with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Assign Task based on response for taskId started",taskId);
    console.log("Task assigned for task_id ",taskId,"content: ",res.data());
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data()).then(() => console.log("task assigned based on tookan response for taskId:", taskId)).catch(err => console.log("Task assigned based on task id failed for: " + err));
	return taskId
}

export async function AutoAssigntookantask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Auto Assign Tookan task for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id
      };
    //Auto Assign task in tookan
    console.log('Auto Assigning tookan task for options: ', options);
    return client.autoAssignTask(options).then(res => {
        return tookantaskautoassign(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan task auto assigning failed: " + err)
    });
}

async function tookantaskautoassign(res,taskId): Promise<string> {
    console.log("Tookan task auto assigned with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Auto Assigning Task based on response for taskId started",taskId);
    console.log("Task auto assigned for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data()).then(() => console.log("task auto assigned based on tookan response for taskId:", taskId)).catch(err => console.log("Task auto assigned based on task id failed for: " + err));
	return taskId
}

export async function GettookantaskStatistics(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan task Statistics for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_status: newValue.job_status,
        job_type:newValue.job_type,
        start_date:newValue.start_date,
        end_date:newValue.end_date
      };
    //Get task Statistics in tookan
    console.log('Getting tookan task Statistics for options: ', options);
    return client.getTaskStatistics(options).then(res => {
        return tookantaskstatistics(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan task getting statistics failed: " + err)
    });
}

async function tookantaskstatistics(res,taskId): Promise<string> {
    console.log("Getting Tookan Task Statistics successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Getting Task Statistics based on response for taskId started",taskId);
    console.log("Task Statistics calculated for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data()).then(() => console.log("Task Statistics calculated based on tookan response for taskId:", taskId)).catch(err => console.log("Task Statistics Calculated based on task id failed for: " + err));
	return taskId
}

export async function getAllTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering get all tookan agents for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        tags: newValue.tags,
        name: newValue.first_name,
        fleet_id:(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.fleet_id,
        include_any_tag: newValue.include_any_tag,
        status:(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.status,
        fleet_type: newValue.fleet_type
      };
    //Get all agents in tookan
    console.log('Getting all tookan agents for options: ', options);
    return client.getAllAgents(options).then(res => {
        return tookangetallagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan get all agents task failed: " + err)
    });
}

async function tookangetallagents(res,agentId): Promise<string> {
    console.log("Tookan get all agents with response successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Getting all agents based on response for agentId started",agentId);
    console.log("All agents for agent_id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Getting all agents based on agent Id:", agentId)).catch(err => console.log("Getting all agents based on agent id failed for: " + err));
	return agentId
}

export async function AddTookanAgents(snapshot, context) {
 
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    if(newValue.merchant_id!== undefined){
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();
    console.log("Adding Agent for merchant id ",newValue.merchant_id,"for",TOOKAN_API_KEY);
    request.open('POST', 'https://api.tookanapp.com/v2/add_agent');

    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                const res=JSON.parse(request.responseText)
                console.log("Adding Agent Details of tookan agents:",(JSON.parse(request.responseText)).data);
                 tookanaddagents(res,agentId).catch(err => {
                    console.log("Tookan adding agents task failed: " + err)
                });
            }
        }
    };

    const body = {
    'api_key': TOOKAN_API_KEY,
    'email': newValue.email,
    'phone': newValue.phone,
    'transport_type': newValue.transport_type,
    'transport_desc': newValue.transport_desc,
    'license': newValue.license,
    'color': newValue.color,
    'timezone': newValue.timezone,
    'team_id': newValue.team_id,
    'password': newValue.password,
    'username': newValue.username,
    'first_name': newValue.first_name,
    'last_name': newValue.last_name,
    'rule_id': newValue.rule_id,
    'fleet_type':newValue.fleet_type,
    'merchant_id': newValue.merchant_id
    };

    request.send(JSON.stringify(body));
    

        }
    else
    {
    console.log('Triggering add tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        email: newValue.email,
        phone: newValue.phone,
        transport_type: newValue.transport_type,
        transport_desc: newValue.transport_desc,
        license: newValue.license,
        color: newValue.color,
        timezone: newValue.timezone,
        team_id: newValue.team_id,
        password: newValue.password,
        username: newValue.username,
        first_name: newValue.first_name,
        last_name: newValue.last_name,
        rule_id: newValue.rule_id,
        fleet_type:newValue.fleet_type,
      };
    //Add agents in tookan
    console.log('Adding tookan agents for options: ', options);
    return client.addAgent(options).then(res => {
        return tookanaddagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan adding agents task failed: " + err)
    });
}
}

async function tookanaddagents(res,agentId): Promise<string> {
    console.log("Tookan add agents with response successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Adding agents based on response for agentId started",agentId);
    console.log("Agent added for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS_STATUS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Adding agents based on agent Id:", agentId)).catch(err => console.log("Update agents based on agent id failed for: " + err));
	return agentId
}

export async function EditTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.after.data();
    if(newValue.merchant_id!== undefined){
        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        const request = new XMLHttpRequest();
        console.log("Editing Agent for merchant id ",newValue.merchant_id,"for",TOOKAN_API_KEY);
        request.open('POST', 'https://api.tookanapp.com/v2/edit_agent');
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function () {
            if (request.readyState === request.DONE) {
                if (request.status === 200) {
                    const res=JSON.parse(request.responseText)
                    console.log("Viewing Agent Details of tookan agents:",(JSON.parse(request.responseText)).data);
                    tookanaddagents(res,agentId).catch(err => {
                        console.log("Tookan adding agents task failed: " + err)
                    });
                }
                }
            }
        
        const body = {
        'api_key': TOOKAN_API_KEY,
        'email': newValue.email,
        'fleet_id':(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.fleet_id,
        'phone': newValue.phone,
        'transport_type': newValue.transport_type,
        'transport_desc': newValue.transport_desc,
        'license': newValue.license,
        'color': newValue.color,
        'timezone': newValue.timezone,
        'team_id': newValue.team_id,
        'password': newValue.password,
        'first_name': newValue.first_name,
        'last_name': newValue.last_name,
        'rule_id': newValue.rule_id,
        'fleet_type':newValue.fleet_type,
        'merchant_id': newValue.merchant_id
        };
    
        request.send(JSON.stringify(body));
    
            }

    
else{
    console.log('Triggering edit tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id:(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.fleet_id,
        email: newValue.email,
        phone: newValue.phone,
        transport_type: newValue.transport_type,
        transport_desc: newValue.transport_desc,
        license: newValue.license,
        color: newValue.color,
        timezone: newValue.timezone,
        team_id: newValue.team_id,
        password: newValue.password,
        first_name: newValue.first_name,
        last_name: newValue.last_name,
        rule_id: newValue.rule_id,
        fleet_type:newValue.fleet_type
      };
    //Edit agents in tookan
    console.log('Editing tookan agents for options: ', options);
    return client.editAgent(options).then(res => {
        return tookaneditagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan editing agents task failed: " + err)
    });
}
}

async function tookaneditagents(res,agentId): Promise<string> {
    console.log("Tookan edit agents with response successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Editing agents information based on response for agentId started",agentId);
    console.log("Agent information edited for agent id ",agentId,"content: ",res.data);
    //const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    //taskRef.set(res.data).then(() => 
    console.log("Editing agent information based on agent Id:", agentId)
    //).catch(err => console.log("Editing agents information based on agent id failed for: " + err));
	return agentId
}

export async function BlockorUnblockTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.after.data();
    

    console.log('Triggering Block or Unblock tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id:(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.fleet_id,
        block_status: newValue.block_status,
        unblock_on_date:newValue.unblock_on_date
      };
    
      //Block or Unblock agents in tookan
    console.log('Blocking or unblocking tookan agents for options: ', options);
    return client.blockAndUnblockAgent(options).then(res => {
        return tookanblockorunblockagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan blocking or unblocking agents task failed: " + err)
    });
}

async function tookanblockorunblockagents(res,agentId): Promise<string> {
    console.log("Tookan agents blocked or unblocked successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Blocking or Unblocking agent based on response for agentId started",agentId);
    console.log("Agent blocked or unblocked for agent id ",agentId,"content: ",res.data)
    //const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    // taskRef.set(res.data).then(() => 
    console.log("Editing agent block/unblock status based on agent Id:", agentId)
    //).catch(err => console.log("Editing agents block/unblock status based on agent id failed for: " + err));
	return agentId
}

export async function DeleteTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const deletedvalue = snapshot.data();

    console.log('Triggering Block or Unblock tookan agent for agent Id', agentId, deletedvalue);

      //Delete agents in tookan
      const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id:(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.fleet_id,
      };
    console.log('Deleting tookan agents for options: ', options);
    return client.deleteAgent(options).then(res => {
        return tookandeleteagents(res,agentId);   
    })
    .catch(err => {
        console.log("Tookan deleting agents task failed: " + err)
    });
}

async function tookandeleteagents(res,agentId): Promise<string> {
    console.log("Tookan agents deleted successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Deleting agent based on response for agentId started",agentId);
    console.log("Agent Deleted for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS_STATUS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Deleting agent successfully based on agent Id:", agentId)).catch(err => console.log("Deleting agents based on agent id failed for: " + err));
	return agentId
}

export async function ViewTookanAgentsProfile(req, res) {
    
    console.log('Triggering view tookan agent profile');
   const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id:req.body.fleet_id
      };
    
      //View agents profile in tookan
    console.log('Viewing profile of tookan agents for options: ', options);
    return client.viewAgentProfile(options)
    .then(re => {
        console.log("result of viewRegion =",re.data)
    })
    .catch(err => {
        console.log("Viewing tookan agents profile task failed: " + err)
    });
}
export async function ViewAgentsStripeDetails(req, res) {
    console.log('Triggering view tookan agent Stripe Details for agent Id',);
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.tookanapp.com/v2/get_fleet_stripe_details');

    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
    if (request.readyState === request.DONE) {
        if (request.status === 200) {
            console.log("Viewing Stripe Details of tookan agents:",(JSON.parse(request.responseText)).data);
        }
    }
};
    const body = {
    'api_key': TOOKAN_API_KEY,
    'fleet_id':req.body.fleet_id
    };
      request.send(JSON.stringify(body));

    }

export async function UpdateTookanAgentTags(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.after.data();
    

    console.log('Triggering Update Tookan agent Tags profile for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id:(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.fleet_id,
        tags: newValue.tags
      };
    
      //Update Tookan agents tags in tookan
    console.log('Updating tags of tookan agents for options: ', options);
    return client.updateAgentTags(options).then(res => {
        return tookanupdateagenttags(res,agentId);   
    })
    .catch(err => {
        console.log("Updating tookan agents tags task failed: " + err)
    });
}

async function tookanupdateagenttags(res,agentId): Promise<string> {
    console.log("Tookan agents tags updated successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Updating agent tags based on response for agentId started",agentId);
    console.log("Agent tags updated for agent id ",agentId,"content: ",res.data);
    //const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    //taskRef.set(res.data).then(() => 
    console.log("Tags of tookan agent updated successfully based on agent Id:", agentId)
   // ).catch(err => console.log("Updating agents tags based on agent id failed for: " + err));
	return agentId
}

export async function GetTookanAgentTags(req, res) {
    
   console.log('Triggering Get Tookan agent Tags profile ');

    const options = {
        api_key: TOOKAN_API_KEY,
        //fleet_id:req.body.fleet_id 
        fleet_id:req.query.fleet_id     
      };
    res.send(options);
    
      //Get agents tags in tookan
    console.log('Get tags of tookan agents for options: ', options);
    return client.getAgentTags(options).then(re => {
        console.log("result of viewRegion =",re.data)
    })
    .catch(err => {
        console.log("Get tookan agents tags task failed: " + err)
    });
}



export async function GetTookanAgentLogs(req, res) {
    

    console.log('Triggering Get Tookan agent logs');

    const options = {
        api_key: TOOKAN_API_KEY,
        date: req.body.date,
        team_ids: req.body.team_ids
      };
    
      //Get agents logs in tookan
    console.log('Get logs of tookan agents for options: ', options);
    return client.getAgentLogs(options).then(re => {
        console.log('Result of Get logs of tookan agents',re.data);
    })
    .catch(err => {
        console.log("Get tookan agents logs task failed: " + err)
    });
}
export async function GetTookanAgentLocation(req, res) {
    
    console.log('Triggering Get Tookan agent location');

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id:req.body.fleet_id     
      };
    
      //Get agents location in tookan
    console.log('Get location of tookan agents for options: ', options);
    return client.getAgentLocation(options).then(re => {
        console.log('Result of Get location of tookan agents',re.data);

    })
    .catch(err => {
        console.log("Get tookan agents location task failed: " + err)
    });
}

export async function SendAgentNotification(req, res) {
    
    console.log('Triggering Send Tookan agent Notification');

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_ids:req.body.fleet_ids, 
        message: req.body.message
      };
    
      //Send agents Notification in tookan
    console.log('Send notification to tookan agents for options: ', options);
    return client.sendNotificationToAgent(options).then(re => {
        console.log('Result of Send notification of tookan agents',re.data);

    })
    .catch(err => {
        console.log("Send notifications to tookan agents task failed: " + err)
    });
}



export async function GetTookanAgentSchedule(req, res) {
   
    console.log('Triggering Get Tookan agent Schedule');

    const options = {
      api_key: TOOKAN_API_KEY,
      local_date_time: req.body.local_date_time,
      limit: req.body.limit
    };
    
      //Get agents Schedule in tookan
    console.log('Get Schedule of tookan agents for options: ', options);
    return client.getAgentSchedule(options).then(re => {
        console.log('Result of Get Schedule of tookan agents',re.data);

    })
    .catch(err => {
        console.log("Get Schedule of tookan agents task failed: " + err)
    });
}
export async function GetTookanActivityTimeline(req,res) {
    

    console.log('Triggering Get Tookan activity timeline');
   
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();

    request.open('POST', 'https://api.tookanapp.com/v2/fleet_activity_timeline');
    
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                //console.log("Viewing Tokkan activity timeline of tookan agents:",JSON.parse(request.responseText).data);
                console.log("Viewing Tokkan activity timeline of tookan agents:",(request.responseText).toString());
            }
        }
    };

    const body = {
      'api_key': TOOKAN_API_KEY,
      'fleet_id':req.body.fleet_id, 
      'timezone': req.body.timezone,
      'date': req.body.date,
      'start_time': req.body.start_time,
      'end_time': req.body.end_time
    };

    request.send(JSON.stringify(body));
}
export async function GetTookanAgentRating(req,res) {
   

    console.log('Triggering Get Tookan agent rating');

    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.tookanapp.com/v2/fleet_ratings_and_reviews');

    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                console.log("Viewing Agent Rating of tookan agents:",(JSON.parse(request.responseText)).data);
            }
        }
    };
   const body = {
    'api_key':TOOKAN_API_KEY,
    'fleet_ids':req.body.fleet_ids
    };

    request.send(JSON.stringify(body));
}
export async function GetTookanAgentNearCustomer(req,res) {
   
    console.log('Triggering Get Tookan agent near customer');
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.tookanapp.com/v2/get_fleets_near_customer');

    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                console.log("Viewing agent near customer of tookan agents:",(JSON.parse(request.responseText)).data);
            }
        }
    };


    const body = {
    'api_key': TOOKAN_API_KEY,
    'customer_id': req.body.customer_id,
    'radius_in_metres': req.body.radius_in_metres
    };

    request.send(JSON.stringify(body));
    }

export async function AssignTookanAgentTask(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.after.data();
    

    console.log('Triggering Assign Tookan agent Task for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id:newValue.job_id,
        team_id: newValue.team_id,
        fleet_id:(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.fleet_id,
        notify: newValue.notify,
        geofence: newValue.geofence,
        job_status: newValue.job_status
      };
    
      //Assign task to agents in tookan
    console.log('Assign tasks to tookan agent for options: ', options);
    return client.assignAgentToTask(options).then(res => {
        return assigntasktoagent(res,agentId);   
    })
    .catch(err => {
        console.log("Assigning tasks to tookan agent failed: " + err)
    });
}

async function assigntasktoagent(res,agentId): Promise<string> {
    console.log("Task assigned successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Assigning agent task based on response for agentId started",agentId);
    console.log("Task assigned to agent id ",agentId,"content: ",res.data);
    //const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    //taskRef.set(res.data()).then(() => 
    console.log("Task assigned successfully based on agent Id:", agentId)
    //).catch(err => console.log("Task assigning based on agent id failed for: " + err));
	return agentId
}
export async function AssignTookanAgentRelatedTask(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.after.data();
    

    console.log('Triggering Assign Tookan agent Related Task for agent Id', agentId, newValue);
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.tookanapp.com/v2/assign_fleet_to_related_tasks');
    
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                console.log("Viewing Stripe Details of tookan agents:",(JSON.parse(request.responseText)).data);
            }
        }
    };
    
   
    const body =  {
        'api_key':TOOKAN_API_KEY,
        'pickup_delivery_relationship':newValue.pickup_delivery_relationship,
        'team_id':newValue.team_id,
        'fleet_id':(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.fleet_id,
        'notify':newValue.notify,
        'geofence':newValue.geofence,
        'job_status':newValue.job_status
    };
    
    request.send(JSON.stringify(body));
}
export async function ReAssignTookanAgentTask(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.after.data();
    console.log('Triggering Reassign Tookan agent Task for agent Id', agentId, newValue);
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();
        request.open('POST', 'https://api.tookanapp.com/v2/reassign_open_tasks');

        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function () {
            if (request.readyState === request.DONE) {
                if (request.status === 200) {
                    console.log("Viewing Stripe Details of tookan agents:",(JSON.parse(request.responseText)).data);
                }
            }
        };
        const body = {
        'api_key': TOOKAN_API_KEY,
        'user_id': newValue.user_id,
        'team_id': newValue.team_id,
        'fleet_id':(await firestoreInstance.collection(AGENTS_STATUS).doc(agentId).get())?.data()?.fleet_id,
        'job_ids':newValue.job_ids
        };

        request.send(JSON.stringify(body));
}
export async function GetMonthlyAgentSchedule(req, res) {
    
   
    console.log('Triggering GetMonthlyAgentSchedule');
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();
     request.open('POST', 'https://api.tookanapp.com/v2/get_fleets_monthly_availability');
     request.setRequestHeader('Content-Type', 'application/json');
     request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                console.log("Viewing Monthly Details of tookan agents:",(JSON.parse(request.responseText)).data);
            }
        }
    };


    const body = {
    'api_key': TOOKAN_API_KEY,
    'fleet_id': req.body.fleet_id,
    'start_date':req.body.start_date,
    'end_date': req.body.end_date
    };

    request.send(JSON.stringify(body));
}
export async function CreateFleetWalletTransaction(req, res) {
  
    console.log('Triggering CreateFleetWalletTransaction');

    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.tookanapp.com/v2/fleet/wallet/create_transaction');

    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                console.log("Viewing Create Fleet Wallet of tookan agents:",(JSON.parse(request.responseText)).data);
            }
        }
    };
    const body = {
    'api_key': TOOKAN_API_KEY,
    'fleet_id':req.body.fleet_id,
    'amount': req.body.amount,
    'transaction_type': req.body.transaction_type,
    'wallet_type': req.body.wallet_type,
    'description': req.body.description
    };

    request.send(JSON.stringify(body));
    }
export async function GetFleetWalletTransaction(req, res) {
    
        
        console.log('Triggering GetFleetWalletTransaction');
    
        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        const request = new XMLHttpRequest();

        request.open('POST', 'https://api.tookanapp.com/v2/fleet/wallet/read_transaction_history');
        request.setRequestHeader('Content-Type', 'application/json');

        request.onload = function () {
            if (request.readyState === request.DONE) {
                if (request.status === 200) {
                    console.log("Viewing Get fleet wallet Details of tookan agents:",(JSON.parse(request.responseText)).data);
                }
            }
        };

        const body = {
        'api_key': TOOKAN_API_KEY,
        'fleet_id': req.body.fleet_id,
        'wallet_type': req.body.wallet_type,
        'start_date':  req.body.starting_date,
        'end_date':  req.body.ending_date
        };

        request.send(JSON.stringify(body));
        }
 export async function AddNewCustomer(snapshot, context) {
    
            const customerId = context.params.customerId;
            const newValue = snapshot.data();
            
        
            console.log('Triggering Add new Customer for customer Id', customerId, newValue);
        
            const options = {
                api_key: TOOKAN_API_KEY,
                user_type: 0,
                name: newValue.name,
                phone: newValue.phone,
                email: newValue.email,
                address: newValue.address,
                latitude: newValue.latitude,
                longitude: newValue.longitude
              };
            
              //Add customers in tookan
            console.log('Add customers for options: ', options);
            return client.addCustomer(options).then(res => {
                return CustomerAdd(res,customerId);   
            })
            .catch(err => {
                console.log("Adding customers failed: " + err)
            });
        }
        
        async function CustomerAdd(res,customerId): Promise<string> {
            console.log("Customer Added for customerId: ",customerId,"Response received from tookan: ",res);
            console.log("Adding customers based on response for customerId started",customerId);
            console.log("Customer added for customerid ",customerId,"content: ",res.data);
            const taskRef = firestoreInstance.collection(USERS_STATUS).doc(customerId);
            taskRef.set(res.data).then(() => console.log("Customer added based on customer Id:", customerId)).catch(err => console.log("Adding customer based on customer id failed for: " + err));
            return customerId
        }

   export async function EditCustomer(change, context) {
    
            const customerId = context.params.customerId;
            const newValue = change.after.data();
            
        
            console.log('Triggering Edit Customer details for customer Id', customerId, newValue);
        
            const options = {
              api_key: TOOKAN_API_KEY,
              user_type: 0,
              customer_id: (await firestoreInstance.collection(USERS_STATUS).doc(customerId).get())?.data()?.customer_id,
              name: newValue.name,
              phone: newValue.phone,
              email: newValue.email,
              address: newValue.address,
              latitude: newValue.latitude,
              longitude: newValue.longitude
            };
            
              //Edit customers in tookan
            console.log('Edit customers for options: ', options);
            return client.editCustomer(options).then(res => {
                return CustomerEdit(res,customerId);   
            })
            .catch(err => {
                console.log("Editing customers failed: " + err)
            });
        }
        
        async function CustomerEdit(res,customerId): Promise<string> {
            console.log("Customer Edited for customerId: ",customerId,"Response received from tookan: ",res);
            console.log("Editing customers based on response for customerId started",customerId);
            console.log("Customer edited for customerid ",customerId,"content: ",res.data);
            //const taskRef = firestoreInstance.collection(USERS_STATUS).doc(customerId);
            //taskRef.set(res.data).then(() => 
            console.log("Customer edited based on customer Id:", customerId)
            //).catch(err => console.log("Editing customer based on customer id failed for: " + err));
            return customerId
        }

export async function FindCustomerWithPhone(req, res) {
    
   
    console.log('Triggering Find customer with phone ');

    const options = {
      api_key: TOOKAN_API_KEY,
      customer_phone: req.body.phone
    };
    
      //Getting customers with phone in tookan
    console.log('Get customers with phone for options: ', options);
    return client.findCustomerWithPhone(options).then(re => {
        console.log("result of FindCustomerWithPhone =",re.data)
    })
    .catch(err => {
        console.log("Getting customers with phone failed: " + err)
    });
}
export async function FindCustomerWithName(req, res) {
    
    
    console.log('Triggering Find customer with Name ');

    const options = {
      api_key: TOOKAN_API_KEY,
      customer_name: req.body.full_name
    };
    
      //Getting customers with name in tookan
    console.log('Get customers with name for options: ', options);
    return client.findCustomerWithName(options).then(re=> {
        console.log("result of FindCustomerWithName =",re.data)

    })
    .catch(err => {
        console.log("Getting customers with name failed: " + err)
    });
}



export async function ViewTookanCustomerProfile(req, res) {


    console.log('Triggering view customer profile');

    const options = {
      api_key: TOOKAN_API_KEY,
      customer_id: req.body.user_id
    };
    
      //viewing customers profile in tookan
    console.log('View customer profile for options: ', options);
    return client.viewCustomerProfile(options).then(re => {
        console.log("result of viewCustomerProfile =",re.data)


    })
    .catch(err => {
        console.log("Viewing customer profile failed: " + err)
    });
}



export async function DeleteTookanCustomer(snapshot, context) {
    
    const customerId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering delete customer for customer Id', customerId, newValue);

    const options = {
      api_key: TOOKAN_API_KEY,
      customer_id: (await firestoreInstance.collection(USERS_STATUS).doc(customerId).get())?.data()?.customer_id
    };
    
      //Deleting customers in tookan
    console.log('Delete customer for options: ', options);
    return client.deleteCustomer(options).then(res => {
        return CustomerDelete(res,customerId);   
    })
    .catch(err => {
        console.log("Deleting customer failed: " + err)
    });
}

async function CustomerDelete(res,customerId): Promise<string> {
    console.log("Deleting customers for customer ID: ",customerId,"Response received from tookan: ",res);
    console.log("Deleting customers based on response for customerId started",customerId);
    console.log("Deleting customers for customer Id ",customerId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(USERS_STATUS).doc(customerId);
    taskRef.set(res.data).then(() => console.log("Deleting customers for customer Id:", customerId)).catch(err => console.log("Deleting customer for customer id failed for: " + err));
	return customerId
}
export async function viewCustomers(req, res) {
        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        const request = new XMLHttpRequest();
        request.open('POST', 'https://api.tookanapp.com/v2/get_all_customers');

        request.setRequestHeader('Content-Type', 'application/json');

        request.onload = function () {
            if (request.readyState === request.DONE) {
                if (request.status === 200) {
                    console.log("Viewing Monthly Details of tookan agents:",(JSON.parse(request.responseText)).data);
                }
            }
        };
        const body = {
        'api_key': TOOKAN_API_KEY,
        'customer_username': req.body.customer_username,
        'customer_phone':  req.body.customer_phone,
        'is_pagination':  req.body.is_pagination,
        'requested_page':  req.body.requested_page,
        'vendor_id':  req.body.vendor_id
        };

        request.send(JSON.stringify(body));
        }
//create tookan team
export async function CreateTookanTeam(snapshot, context) {
    
    const teamId = context.params.teamId;
    const newValue = snapshot.data();
    

    console.log('Triggering Create Tookan team for team id ', teamId, newValue);
    
    const options = {
        api_key:TOOKAN_API_KEY,
        team_name:newValue.team_name,
        battery_usage:newValue.battery_usage,
        tags:newValue.tags
        
    };
    //Create task in tookan
    return client.createTeam(options).then(res => {
        console.log("Creating tookan team for options: ", options);
        return updateTeamOnTeamCreate(res,teamId);   
    })
    .catch(err => {
        console.log("Tookan Create team failed: " + err)
    });
}
async function updateTeamOnTeamCreate (res,teamId): Promise<string> {
    console.log("Tookan team created with response successfully for teamId: ",teamId,"Response received from tookan: ",res.data);
    console.log("Update team based on response for teamId started",teamId);
    console.log("Updated content for team_id ",teamId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TEAMS_STATUS).doc(teamId);
    taskRef.set(res.data).then(() => console.log("team updated based on tookan response for teamId:", teamId))
    .catch(err => console.log("Update team based on team id failed for: " + err));
	return teamId
}

//update team
export async function EditTookanTeam(snapshot, context) {
    
    const teamId = context.params.teamId;
    const newValue = snapshot.after.data();
    

    console.log('Triggering update Tookan team for team id ', teamId, newValue);
    
    const options = {
        api_key:TOOKAN_API_KEY,
        team_name:newValue.team_name,
        battery_usage:newValue.battery_usage,
        tags:newValue.tags,
        team_id:(await firestoreInstance.collection(TASKS_STATUS).doc(teamId).get())?.data()?.team_id
        
    };
    //Create task in tookan
    return client.editTeam(options).then(res => {
        console.log("Updating tookan team for options: ", options);
        return updateTeamOnTeamEdit(res,teamId);   
    })
    .catch(err => {
        console.log("Tookan edit team failed: " + err)
    });
}
async function updateTeamOnTeamEdit (res,teamId): Promise<string> {
    console.log("Tookan team edited with response successfully for teamId: ",teamId,"Response received from tookan: ",res.data);
    console.log("Update team based on response for teamId started",teamId);
    console.log("Updated content for team_id ",teamId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TEAMS_STATUS).doc(teamId);
    taskRef.set(res.data).then(() => console.log("team updated based on tookan response for teamId:", teamId))
    .catch(err => console.log("Update team based on team id failed for: " + err));
	return teamId
}

//Delete tookan team
export async function DeleteTookanTeam(snapshot, context) {
    
    const teamId = context.params.teamId;
    const newValue = snapshot.data();
    

    console.log('Triggering delete Tookan team for team id ', teamId, newValue);
    
    const options = {
        api_key:TOOKAN_API_KEY,
        team_id:(await firestoreInstance.collection(TASKS_STATUS).doc(teamId).get())?.data()?.team_id
        
    };
    return client.deleteTeam(options).then(res => {
        console.log("Deleting tookan team for options: ", options);
        return updateTeamDeletion(res,teamId);   
    })
    .catch(err => {
        console.log("Tookan delete team failed: " + err)
    });
}
async function updateTeamDeletion (res,teamId): Promise<string> {
    console.log("Tookan team deleted with response successfully for teamId: ",teamId,"Response received from tookan: ",res.data);
    console.log("Delete team based on response for teamId started",teamId);
    console.log("Deleted content for team_id ",teamId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TEAMS_STATUS).doc(teamId);
    taskRef.set(res.data).then(() => console.log("team deleted based on tookan response for teamId:", teamId))
    .catch(err => console.log("Delete team based on team id failed for: " + err));
	return teamId
}

export async function GetTookanTeamDetails(req, res) {
    
    

    console.log('Triggering get team details');
    
    const options = {
        api_key:TOOKAN_API_KEY      
    };
    //Create task in tookan
    console.log("Viewing tookan getTeamDetails for options: ", options);

    return client.getTeamDetails(options).then(re => {
        console.log("result of getTeamDetails =",re.data)
    })
    .catch(err => {
        console.log("Viewing tookan team Details failed: " + err)
    });
}
//get job and agent details
export async function GetJobAndAgentDetails(req, res) {
    
    console.log('Triggering get job and agent details');
    
    const options = {
        api_key:TOOKAN_API_KEY,
        date:req.body.date,
        team_id:req.body.team_id,
        fleet_id:req.body.fleet_id,
        unzip:req.body.unzip,
        sorting:req.body.sorting,
        ignore_fleets:req.body.ignore_fleets,
        has_agent_module:req.body.has_agent_module,
        is_offline:req.body.is_offline,
        search_string:req.body.search_string,
        form_id:req.body.form_id
    };
    return client.getJobAndAgentDetails(options).then(re=> {
        console.log("Viewing tookan job and agent Details for options: ", options);
        console.log("result of getJobAndAgentDetails =",re.data)

    })
    .catch(err => {
        console.log("Viewing tookan job and agent Details failed: " + err)
    });
}
export async function getAllTeams(req, res) {
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();
    request.open('POST', 'https://api.tookanapp.com/v2/view_all_team_only');
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                console.log("Viewing getAllTeams of tookan agents:",(JSON.parse(request.responseText)).data);
            }
        }
    };
    const body = {
    'api_key': TOOKAN_API_KEY,
    
    };

    request.send(JSON.stringify(body));
    }

export async function CreateNewMerchant(snapshot, context) {
    
    const merchantId = context.params.providerId;
    const newValue = snapshot.data();
    

    console.log('Triggering create new merchant for merchant Id', merchantId, newValue);

    const options = {
        name: newValue.name,
        first_name: newValue.first_name,
        last_name: newValue.last_name ,
        company_address: newValue.company_address,
        company_name: newValue.provider_name ,
        email: newValue.new_email ,
        timezone: newValue.timezone,
        phone_directory:{
          phone: newValue.phone_directory.phone,
          country_code: newValue.phone_directory.country_code
        },
        merchant_permission: {
          view_task: newValue.merchant_permission.view_task,
          add_task: newValue.merchant_permission.add_task,
          add_team: newValue.merchant_permission.add_team ,
          view_team: newValue.merchant_permission.view_team ,
          add_region: newValue.merchant_permission.add_region ,
          view_region: newValue.merchant_permission.view_region ,
          add_agent: newValue.merchant_permission.add_agent,
          view_agent: newValue.merchant_permission.view_agent ,
          view_fleet_avalibility: newValue.merchant_permission.view_fleet_avalibility ,
          edit_fleet_avalibility: newValue.merchant_permission.edit_fleet_avalibility 
        },
        commission_percentage: newValue.commission_percentage,
        password: newValue.password,
        geofence: newValue.geofence,
        api_key: TOOKAN_API_KEY,
        user_id: newValue.user_id
      };
    
      //Creatiing new merchant in tookan
    console.log('Creating new merchant for options: ', options);
    return client.createMerchant(options).then(res => {
        return NewMerchant(res,merchantId);   
    })
    .catch(err => {
        console.log("Creating new merchant failed: " + err)
    });
}

async function NewMerchant(res,merchantId): Promise<string> {
    console.log("Creating new merchant for merchant ID: ",merchantId,"Response received from tookan: ",res);
    console.log("Creating new merchants based on response for merchantId started",merchantId);
    console.log("Creating new merchants for merchant Id ",merchantId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(PROVIDERS_STATUS).doc(merchantId);
    taskRef.set(res.data).then(() => console.log("Creating new merchants for merchant Id:", merchantId)).catch(err => console.log("Creating new merchants for merchant id failed for: " + err));
	return merchantId
}

export async function EditTookanMerchant(snapshot, context) {
    
    const merchantId = context.params.providerId;
    const newValue = snapshot.after.data();
    

    console.log('Triggering edit merchant for merchant Id', merchantId, newValue);

    const options = {
        name: newValue.name,
        first_name: newValue.first_name,
        last_name: newValue.last_name ,
        company_address: newValue.company_address,
        company_name: newValue.provider_name ,
        email: newValue.new_email ,
        timezone: newValue.timezone,
        phone_directory: {
          phone: newValue.phone_directory.phone,
          country_code: newValue.phone_directory.country_code
        },
        merchant_permission: {
          view_task: newValue.merchant_permission.view_task,
          add_task: newValue.merchant_permission.add_task,
          add_team: newValue.merchant_permission.add_team ,
          view_team: newValue.merchant_permission.view_team ,
          add_region: newValue.merchant_permission.add_region ,
          view_region: newValue.merchant_permission.view_region ,
          add_agent: newValue.merchant_permission.add_agent,
          view_agent: newValue.merchant_permission.view_agent ,
          view_fleet_avalibility: newValue.merchant_permission.view_fleet_avalibility ,
          edit_fleet_avalibility: newValue.merchant_permission.edit_fleet_avalibility 
        },
        commission_percentage: newValue.commission_percentage,
        merchant_id:(await firestoreInstance.collection(PROVIDERS_STATUS).doc(merchantId).get())?.data()?.merchant_id,
        api_key: TOOKAN_API_KEY,
        user_id: newValue.user_id
      };
    
      //Editing merchant in tookan
    console.log('Editing merchant for options: ', options);
    return client.editMerchant(options).then(res => {
        return MerchantEdit(res,merchantId);   
    })
    .catch(err => {
        console.log("Editing merchant failed: " + err)
    });
}

async function MerchantEdit(res,merchantId): Promise<string> {
    console.log("Editing merchant for merchant ID: ",merchantId,"Response received from tookan: ",res);
    console.log("Editing merchants based on response for merchantId started",merchantId);
    console.log("Editing merchants for merchant Id ",merchantId,"content: ",res.data);
    //const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    //taskRef.set(res.data).then(() => 
    console.log("Editing merchants for merchant Id:", merchantId)
    //).catch(err => console.log("Editing merchants for merchant id failed for: " + err));
	return merchantId
}

export async function ViewTookanMerchant(req, res) {
    
   console.log('Triggering view merchant for merchant');

    const options = {
        api_key: TOOKAN_API_KEY,
        user_id: req.body.user_id
      };
    
      //Viewing merchant in tookan
    console.log('Viewing merchant for options: ', options);
    return client.viewMerchant(options).then(re => {
        console.log("result of viewRegion =",re.data)
    })
    .catch(err => {
        console.log("Viewing merchant failed: " + err)
    });
   
}

export async function GetMerchantDetails(req, res) {

    console.log('Triggering get merchant details for merchant');

    const options = {
        api_key: TOOKAN_API_KEY,
        user_id: req.query.user_id
      };
      //Getting merchant details in tookan
    console.log('Getting merchant details for options: ', options);
    return client.getMerchantDetails(options).then(re => {
        console.log("result of viewRegion =",re.data)


    })
    .catch(err => {
        console.log("Getting merchant details failed: " + err)
    });
    
}



export async function GetMerchantReports(req, res) {
    
    
    

    console.log('Triggering get merchant reports for merchant ');

    const options = {
        api_key: TOOKAN_API_KEY,
        user_id: req.query.user_id,
        merchant_id: req.query.merchant_id
      };
    
      //Getting merchant reports in tookan
    console.log('Getting merchant reports for options: ', options);
    return client.getMerchantReport(options).then(re => {
        console.log("result of viewRegion =",re.data)
    })
    .catch(err => {
        console.log("Getting merchant reports failed: " + err)
    });
}


export async function GetMerchantTeam(req, res) {
    
   
    

    console.log('Triggering get merchant team for merchant');

    const options = {
        api_key: TOOKAN_API_KEY,
        get_team_flag: 2,
        merchant_id: req.body.merchant_id
      };
    
      //Getting merchant reports in tookan
    console.log('Getting merchant teams for options: ', options);
    return client.getMerchantTeams(options).then(re => {
        console.log("result of viewRegion =",re.data)
    })
    .catch(err => {
        console.log("Getting merchant teams failed: " + err)
    });
}



export async function BlockUnblockMerchant(snapshot, context) {
    
    const merchantId = context.params.providerId;
    const newValue = snapshot.after.data();
    

    console.log('Triggering block or unblock merchants for merchant Id', merchantId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        is_blocked: newValue.is_blocked,
        merchant_id:(await firestoreInstance.collection(PROVIDERS_STATUS).doc(merchantId).get())?.data()?.merchant_id
      };
    
      //Blocking or Unblocking merchants in tookan
    console.log('Blocking or Unblocking merchants for options: ', options);
    return client.blockAndUnblockMerchant(options).then(res => {
        return MerchantBlockUnblock(res,merchantId);   
    })
    .catch(err => {
        console.log("Blocking/Unblocking merchant failed: " + err)
    });
}

async function MerchantBlockUnblock(res,merchantId): Promise<string> {
    console.log("Blocking/Unblocking merchants for merchant ID: ",merchantId,"Response received from tookan: ",res);
    console.log("Blocking/Unblocking merchants based on response for merchantId started",merchantId);
    console.log("Blocking/Unblocking merchants for merchant Id ",merchantId,"content: ",res.data);
   // const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    //taskRef.set(res.data).then(() => 
    console.log("Blocking/Unblocking merchants for merchant Id:", merchantId)
    //).catch(err => console.log("Blocking/Unblocking merchants for merchant id failed for: " + err));
	return merchantId
}

export async function AvailableMerchantAgents(req, res) {
    
    

    console.log('Triggering get available merchant agents for merchant Id');

    const options = {
        api_key: TOOKAN_API_KEY,
        merchant_id: req.body.merchant_id,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      };
    
      //Get Available merchant agents in tookan
    console.log('Get Available merchant agents for options: ', options);
    return client.getAvailableMerchantAgents(options).then(re=> {
        console.log(' Available merchant agents for options',re)
    })
    .catch(err => {
        console.log("Getting Available merchant agents failed: " + err)
    });
}



export async function AssignMerchantAgentsTask(snapshot, context) {
    
    const merchantId = context.params.providerId;
    const newValue = snapshot.after.data();
    

    console.log('Triggering assign task to merchant agents for merchant Id', merchantId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        merchant_id:(await firestoreInstance.collection(PROVIDERS_STATUS).doc(merchantId).get())?.data()?.merchant_id,
        job_id: newValue.job_id,
        team_id:newValue.team_id,
        fleet_id:newValue.fleet_id,
        job_status: newValue.job_status,
        notify:newValue.notify,
        geofence:newValue.geofence
      };
    
      //Assigning tasks to merchant agents in tookan
    console.log('Assigning tasks merchant agents for options: ', options);
    return client.assignMerchantAgentToTask(options).then(res => {
        return MerchantTasktoAgents(res,merchantId);   
    })
    .catch(err => {
        console.log("Assigning tasks to merchant agents failed: " + err)
    });
}

async function MerchantTasktoAgents(res,merchantId): Promise<string> {
    console.log("Assigning tasks to merchant agents for merchant ID: ",merchantId,"Response received from tookan: ",res);
    console.log("Assigning tasks to merchant agents based on response for merchantId started",merchantId);
    console.log("Assigning tasks to merchant agents for merchant Id ",merchantId,"content: ",res.data);
    //const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    //taskRef.set(res.data).then(() => 
    console.log("Assigning tasks to merchant agents for merchant Id:", merchantId)
    //).catch(err => console.log("Assigning tasks to merchant agents for merchant id failed for: " + err));
	return merchantId
}
export async function AssignMerchantToTask(snapshot, context) {
    
    const merchantId = context.params.providerId;
    const newValue = snapshot.after.data();
    

    console.log('Triggering assign task to merchant for merchant Id', merchantId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        merchant_id:(await firestoreInstance.collection(PROVIDERS_STATUS).doc(merchantId).get())?.data()?.merchant_id,
        user_id:newValue.user_id,
        job_id: newValue.job_id,
        team_id: newValue.team_id,
        fleet_id: newValue.fleet_id,
        job_status: newValue.job_status,
      };
    
      //Assigning tasks to merchant agents in tookan
    console.log('Assigning tasks to merchant for options: ', options);
    return client.assignMerchantToTask(options).then(res => {
        return MerchantToTask(res,merchantId);   
    })
    .catch(err => {
        console.log("Assigning tasks to merchant agents failed: " + err)
    });
}

async function MerchantToTask(res,merchantId): Promise<string> {
    console.log("Assigning tasks to merchant  for merchant ID: ",merchantId,"Response received from tookan: ",res);
    console.log("Assigning tasks to merchant  based on response for merchantId started",merchantId);
    console.log("Assigning tasks to merchant  for merchant Id ",merchantId,"content: ",res.data);
    //const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    //taskRef.set(res.data).then(() => 
    console.log("Assigning tasks to merchant for merchant Id:", merchantId)
    //).catch(err => console.log("Assigning tasks to merchant agents for merchant id failed for: " + err));
	return merchantId
}
export async function DeleteTookanMerchant(snapshot, context) {
    
    const merchantId = context.params.providerId;
    const newValue = snapshot.data();
    

    console.log('Triggering delete merchant for merchant Id', merchantId, newValue);
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const request = new XMLHttpRequest();

    request.open('POST', 'https://api.tookanapp.com/v2/merchant/delete');
    
    request.setRequestHeader('Content-Type', 'application/json');
    
    
    
    const body = {
      'api_key': TOOKAN_API_KEY,
      'merchant_id':newValue.merchant_id
    };
    
    request.send(JSON.stringify(body));
}
export async function CreateMissonTask(snapshot, context) {
    
    const missionId = context.params.missionId;
    const newValue = snapshot.data();
    

    console.log('Triggering create new mission for mission Id', missionId, newValue);

    const options = {
        api_key:TOOKAN_API_KEY,
        dispatched_status:newValue.dispatched_status,
        mission_name:newValue.mission_name,
        create_task_body:[
        {
            access_token:newValue.create_task_body.access_token,
            is_dashboard:newValue.create_task_body.is_dashboard,
            fleet_id:newValue.create_task_body.fleet_id,
            timezone:newValue.create_task_body.timezone,
            has_pickup:newValue.create_task_body.has_pickup,
            has_delivery:newValue.create_task_body.has_delivery,
            pickup_delivery_relationship:newValue.create_task_body.pickup_delivery_relationship,
            layout_type:newValue.create_task_body.layout_type,
            team_id:newValue.create_task_body.team_id,
            geofence:newValue.create_task_body.geofence,
            auto_assignment:newValue.create_task_body.auto_assignment,
            tags:newValue.create_task_body.tags,
            no_of_agents:newValue.create_task_body.no_of_agents,
            deliveries:newValue.create_task_body.deliveries,
            pickups:newValue.create_task_body.pickups,
            appointments:[{
                address:newValue.create_task_body.appointments.address,
                name:newValue.create_task_body.appointments.name,
                job_description:newValue.create_task_body.appointments.job_description,
                latitude:newValue.create_task_body.appointments.latitude,
                longitude:newValue.create_task_body.appointments.longitude,
                start_time:newValue.create_task_body.appointments.start_time,
                end_time:newValue.create_task_body.appointments.end_time,
                phone:newValue.create_task_body.appointments.phone,
                template_data:newValue.create_task_body.appointments.template_data,
                ref_images:newValue.create_task_body.appointments.ref_images,
                email:newValue.create_task_body.appointments.email
            }]
        }],
        end_date:newValue.end_date,
        start_date:newValue.start_date
      };
    
    console.log('Creating new mission for options: ', options);
    return client.createMission(options).then(res => {
        return NewMission(res,missionId);   
    })
    .catch(err => {
        console.log("Creating new merchant failed: " + err)
    });
}

async function NewMission(res,missionId): Promise<string> {
    console.log("Creating new merchant for merchant ID: ",missionId,"Response received from tookan: ",res);
    console.log("Creating new merchants based on response for merchantId started",missionId);
    console.log("Creating new merchants for merchant Id ",missionId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS_STATUS).doc(missionId);
    taskRef.set(res.data).then(() => console.log("Creating new merchants for merchant Id:", missionId)).catch(err => console.log("Creating new merchants for merchant id failed for: " + err));
	return missionId
}
export async function missionList(req, res) {
    
    console.log('Triggering view mission for tasks');
 
     const options = {
         api_key: TOOKAN_API_KEY,
         end_date: req.body.end_date,
         start_date:req.body.start_date
       };
     
       //Viewing merchant in tookan
     console.log('Viewing mission for options: ', options);
     return client.missionList(options).then(re => {
         console.log("result of Mission =",re.data)
     })
     .catch(err => {
         console.log("Viewing mission failed: " + err)
     });
    
 }

export async function DeleteTookanMission(snapshot, context) {
    
    const missionId = context.params.missionId;
    const deletedvalue = snapshot.data();

    console.log('Triggering Block or Unblock tookan agent for agent Id', missionId, deletedvalue);

      //Delete agents in tookan
      const options = {
        api_key: TOOKAN_API_KEY,
        mission_id:(await firestoreInstance.collection(TASKS_STATUS).doc(missionId).get())?.data()?.mission_id,
      };
    console.log('Deleting tookan agents for options: ', options);
    return client.deleteMission(options).then(res => {
        return tookandeleteMission(res,missionId);   
    })
    .catch(err => {
        console.log("Tookan deleting agents task failed: " + err)
    });
}

async function tookandeleteMission(res,missionId): Promise<string> {
    console.log("Tookan missions deleted successfully for missionId: ",missionId,"Response received from tookan: ",res);
    console.log("Deleting missions based on response for missionsId started",missionId);
    console.log("missions Deleted for mission id ",missionId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS_STATUS).doc(missionId);
    taskRef.set(res.data).then(() => console.log("Deleting agent successfully based on agent Id:", missionId)).catch(err => console.log("Deleting agents based on agent id failed for: " + err));
	return missionId
}
export async function TookanWebHook(snapshot, context) {
    
    const merchantId = context.params.providerId;
    const newValue = snapshot.data();
    

    console.log('Triggering create Tookan WebHook for ', merchantId, newValue);
    console.log('Triggering delete merchant for merchant Id', merchantId, newValue);
    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    //const XMLHttpRequest = require('xhr2');
    const request = new XMLHttpRequest();

    request.open('POST', 'https://api.tookanapp.com/v2/set_tookan_shared_secret_key');

    request.setRequestHeader('Content-Type', 'application/json');
    const body = {
    'api_key':TOOKAN_API_KEY,
    'tookan_shared_secret':newValue.tookan_shared_secret
    };

    request.send(JSON.stringify(body));
}
export async function UpdateJobStatus(req,res){
    const taskref = firestoreInstance.collection('tasks_status');
          taskref.where('job_id', '==',req.body.job_id).get()
            .then(snapshot => {
            if (snapshot.empty) {
            console.log('Error.');
             return;
             }  
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          taskref.doc(doc.id).update(req.body).catch(err => {
         console.log("Getting onRequests failed: " + err)
     });
        });
       
    }).catch(err => {
        console.log("Getting onRequests failed: " + err)
    });
}
export async function cancelOrder(snapshot, context) {
    const path=context.params.orderId
    console.log("Orders cancelled refund initiated for",path)
}
export async function setOrder(snapshot, context) {
        const path1=context.params.messageId
        const path=context.params.orderId
        console.log("Path",path1,path)
        firestoreInstance.collection("tasks").doc(path1).set({
            api_key:TOOKAN_API_KEY,
            order_id:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.order_id,
            job_description:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.job_description,
            customer_email:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.customer_email,
            customer_username:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.customer_username,
            customer_phone:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.customer_phone,
            customer_address:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.customer_address,
            latitude:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.latitude,
            longitude:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.longitude,
            job_delivery_datetime:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.job_delivery_datetime,
            custom_field_template:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.custom_field_template,
            meta_data:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.meta_data,
            team_id:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.team_id,
            auto_assignment:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.auto_assignment,
            has_pickup:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.has_pickup,
            has_delivery:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.has_delivery,
            layout_type:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.layout_type,
            tracking_link:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.tracking_link,
            merchant_id: (await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.merchant_id,
            timezone:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.timezone,
            fleet_id:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.fleet_id,
            ref_images:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.ref_images,
            notify:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.notify,
            tags:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.tags,
            geofence:(await firestoreInstance.collection(ORDERS).doc(path).collection('tasks').doc(path1).get())?.data()?.geofence,
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

}
export async function CreateTookanManager(snapshot, context) {
    const managerId = context.params.managerId;
    const newValue = snapshot.data();

    console.log('Triggering tookan manager of manager Id', managerId, newValue);

    const options = {
        'api_key': TOOKAN_API_KEY,
        'email': newValue.email,
        'password': newValue.password,
        'first_name': newValue.first_name,
        'last_name': newValue.last_name,
        'phone': newValue.phone,
        'timezone': newValue.timezone,
        'task_access': newValue.task_access,
        'add_driver_access': newValue.add_driver_access,
        'dispatcher_teams': newValue.dispatcher_teams

    }

    const opt = {
        'api_key' : TOOKAN_API_KEY,
    }

    return client.createManager(options).then(res => {
        console.log("result :",res);
        const resultData = res.data
        const Ref = firestoreInstance.collection('manager_tookan').doc(managerId)
        Ref.update(resultData).then(() => console.log("updated resultData")).catch(err => console.log("error =",err))

        return client.viewManager(opt).then(re => {
            console.log("result of viewManager =",re)
            const reData = re.data
            const currData = reData.filter(item => item.email === newValue.email);
            console.log("currData =",currData)
            const curr = currData.pop()
            const dispatcher_id = curr.dispatcher_id;
            console.log("dispatcher id =",dispatcher_id)
            const dis_Ref = firestoreInstance.collection('manager_tookan').doc(managerId)
            dis_Ref.update({'dispatcher_id': dispatcher_id}).then(() => console.log("updated dispatcher Id")).catch(err => console.log("error =",err))

        })
        .catch(err => {
            console.log("error in view manager :", err)
        })
    })
    .catch(err => {
        console.log("error occures =",err);
    })
}


export async function TookanViewManager(req,res) {
    console.log(req,res)
    const opt = {
        'api_key' : TOOKAN_API_KEY,
    }
    client.viewManager(req).then(re => {
        console.log("option of viewManager =",opt,req)
        console.log("result of viewManager =",re)

    })
    .catch(err => {
        console.log("error in view manager :", err)
    })

}


export async function DeleteTookanManager(snapshot,context) {
    const managerId = context.params.managerId;
    const newValue = snapshot.data();

    console.log('Triggering tookan manager delete of manager Id', managerId, newValue);

    const options = {
        'api_key': TOOKAN_API_KEY,
        'dispatcher_id': newValue.dispatcher_id
    }

    const opt = {
        'api_key' : TOOKAN_API_KEY,
    }

    return client.deleteManager(options).then(res =>
        {
            console.log("result of deletion manager =",res)
            
            client.viewManager(opt).then(re => {
                console.log("result of viewManager =",re)
            })
            .catch(err => {
                console.log("error in view manager :", err)
            })
        })
        .catch(err => {
            console.log("error in deleting manager =",err)
        })
}




export async function GeofenceAddRegion(snapshot,context) {
    const regionId = context.params.regionId;
    const newValue = snapshot.data();

    console.log('Triggering tookan geofence add region of region Id', regionId, newValue);

    const options =
    {
        'api_key': TOOKAN_API_KEY,
        'user_id': newValue.user_id,
        'region_name': newValue.region_name,
        'region_description': newValue.region_description,
        'region_data': newValue.region_data,
        'selected_team_id': newValue.selected_team_id,
        'fleet_id': newValue.fleet_id,
        'is_force': newValue.is_force
    }


    return client.addRegion(options).then(res =>
        {
            console.log("result of add region =",res);
            const opt ={
                'user_id': newValue.user_id,
            }
            return client.viewRegions(opt).then(re =>
                {
                    console.log("result of viewRegion=",re)
                    const reData = re.data
                    const currData = reData.filter(item => item.region_name === newValue.region_name);
                    console.log("currData =",currData)
                    const curr = currData.pop()
                    const reg_id = curr.region_id;
                    console.log("region id =",reg_id)
                    const Ref = firestoreInstance.collection('tookan_add_region').doc(regionId)
                    Ref.update({region_id : reg_id}).then(() => console.log("updated region Id")).catch(err => console.log("error =",err))


                })
            .catch(err =>{console.log("error in view Region",err)})
        })
        .catch(err => {
            console.log("error in adding region =",err);
        })

}


export async function GeofenceUpdateRegion(snapshot,context) {
    const regionId = context.params.regionId;
    const newValue = snapshot.after.data();

    console.log('Triggering tookan geofence edit region of region Id', regionId, newValue);

    const options =
    {     
        'region_id': newValue.region_id,
        'api_key': TOOKAN_API_KEY,
        'user_id': newValue.user_id,
        'region_name': newValue.region_name,
        'region_description': newValue.region_description,
        'region_data': newValue.region_data,
        'selected_team_id': newValue.selected_team_id,
        'fleet_id': newValue.fleet_id,
        'is_force': newValue.is_force

    }

   return client.editRegion(options).then(res =>
        {
            console.log("result of editing region =",res);
            const opt ={
                'user_id': newValue.user_id,
            }
            client.viewRegions(opt).then(re =>
                {console.log("result of viewRegion=",re)})
            .catch(err =>{console.log("error in view Region",err)})
        })
        .catch(err => {
            console.log("error in editing region =",err);
        })
}


export async function GeofenceDeleteRegion(snapshot,context) {
    const regionId = context.params.regionId;
    const newValue = snapshot.data();

    console.log('Triggering tookan geofence delete region of region Id', regionId, newValue);

    const options =
    {
        'user_id': newValue.user_id,
        'region_id': newValue.region_id
    }


    return client.deleteRegion(options).then(res =>{
        console.log("result of delete region=",res)

        const opt ={
            'user_id': newValue.user_id,
        }
        client.viewRegions(opt).then(re =>
            {console.log("result of viewRegion=",re)})
        .catch(err =>{console.log("error in view Region",err)})
    })
    .catch(err => {
        console.log("errorin editing region = ",err)
    })
}


export async function TookanViewRegion(data,context) {
    console.log(data,context)

    const opt = {
        api_key: TOOKAN_API_KEY,
        user_id: data.body.user_id,
    }
    client.viewRegions(opt).then(re => {
        console.log("result of viewRegion =",re)
    })
    .catch(err => {
        console.log("error in view Region :", err)
    })
}


export async function TookanViewRegionDetails(data,context) {
    console.log(data,context)

    const opt = {
        //'api_key': TOOKAN_API_KEY,
        'user_id': data.user_id,
        'region_id': data.region_id
    }
    client.viewRegionDetails(opt).then(re => {
        console.log("result of viewRegionDetails =",re)
    })
    .catch(err => {
        console.log("error in view Region Details :", err)
    })
}


export async function TookanRemoveRegionfromAgent(data,context) {
    console.log(data,context)

    const opt = {
        //'api_key': TOOKAN_API_KEY,
        'user_id': data.user_id,
        'region_id': data.region_id,
        'fleet_id':data.fleet_id	
    }
    client.removeRegionForAgent(opt).then(re => {
        console.log("result of removeRegionForAgent  =",re)
    })
    .catch(err => {
        console.log("error in removeRegionForAgent  :", err)
    })
}
export async function createTookanMultipleTask(snapshot,context){
    const multipleTaskId = context.params.multipleTaskId;
    const newValue = snapshot.data();
    console.log("multipleTaskId,newValue",multipleTaskId,newValue)

    const options = {
        "api_key": TOOKAN_API_KEY,
        "fleet_id": newValue.fleet_id, //19750,
        "timezone": newValue.timezone, //-330,
        "has_pickup": newValue.has_pickup, //1,
        "has_delivery": newValue.has_delivery, //1,
        "layout_type": newValue.layout_type, //0,
        "geofence": newValue.geofence, //0,
        "team_id": newValue.team_id, //"",
        "auto_assignment": newValue.auto_assignment, //0,
        "tags": newValue.tags, // "",
        "pickups": [{
            "address": newValue.pickups_address, //"Chandigarh International Airport, Sahibzada Ajit Singh Nagar, Punjab, India",
            "latitude": newValue.pickups_latitude,  //30.7333148,
            "longitude": newValue.pickups_longitude, //76.7794179,
            "time": newValue.pickups_time, //"2020-04-15 17:24:00",
            "phone": newValue.pickups_phone, // "+911234567890",
            "template_name": newValue.pickups_template_name, // "Template_1",
            "template_data": [{
                "label": newValue.pickups_template_data_label_p, //"Price",
                "data": newValue.pickups_template_data_price, //"100"
            }, {
                "label": newValue.pickups_template_data_label_q, //"Quantity",
                "data": newValue.pickups_template_data_quantity, //"100"
            }],
            "ref_images": newValue.pickups_ref_images,//["http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png"],
            "name": newValue.pickups_name, //"Saurabh",
            "email": newValue.pickups_email, //"saurabh@saurabh.com",
            "order_id": newValue.pickups_order_id, //"12234556",
            "job_description": newValue.pickups_job_description, //"Job description goes here"
        }], 
        "deliveries": [{
            "address": newValue.deliveries_address, // "Chandigarh Railway Station, Daria, Chandigarh, India",
            "latitude": newValue.deliveries_latitude, //30.7022191,
            "longitude": newValue.deliveries_lognitude, //76.82247009999992,
            "time": newValue.deliveries_time, //"2020-04-15 17:30:00",
            "phone": newValue.deliveries_phone, //"+913242342342",
            "template_name": newValue.deliveries_template_name, //"Template_1",
            "template_data": [
            {
            "label": newValue.deliveries_label_p, //"Price",
            "data": newValue.deliveries_data_price //"100"
            },
            {
            "label": newValue.deliveries_label_q, //"Quantity",
            "data": newValue.deliveries_data_quantity // "100"
            }
            ], 
            "ref_images": newValue.deliveries_ref_images, //["http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png"],
            "name": newValue.deliveries_name, //"Saurabh",
            "email": newValue.deliveries_email, //"saurabh@saurabh.com",
            "order_id": newValue.deliveries_order_id, //"123456",
            "job_description": newValue.deliveries_job_description //"Job description goes here"
        }] 

    }       

    return client.createMultipleTasks(options).then(res => {
        console.log('Creating tookan task for options: ', options);
        console.log("result of multiple tasks =",res);
        const pickupRes = res.data.pickups;
        console.log("pickupRes=",pickupRes);
        const pick = pickupRes.pop();
        console.log("pick=",pick);
        const deliveriesRes = res.data.deliveries;
        console.log("deliverRes =",deliveriesRes);
        const deliver = deliveriesRes.pop();
        console.log("deliver =",deliver);

        const pickRef = firestoreInstance.collection('multiple_tasks').doc(multipleTaskId)
        pickRef.update(pick).then(() => console.log("updated multiple tassks result")).catch(err => console.log("error =",err))
        const Ref = firestoreInstance.collection('multiple_tasks').doc(multipleTaskId)
        Ref.update(deliver).then(() => console.log("updated multiple tassks result")).catch(err => console.log("error =",err))
 
        return   

    })
    .catch(err => {
        console.log("Tookan Create multiple task failed: " + err)
    });

}


export async function EditTookanMultipleTask(snapshot,context) {
    const multipleTaskId = context.params.multipleTaskId;
    const newValue = snapshot.data();
    console.log("multipleTaskId,newValue",multipleTaskId,newValue)
    const pick = newValue.pick;
    const deliver = newValue.deliver;

    const options = 
        {
            "api_key":TOOKAN_API_KEY,
            "pickups":[{
                        "job_id": pick.job_id, //"254737",
                        "address": pick.address, //"Chandigarh International Airport, Sahibzada Ajit Singh Nagar, Punjab, India",
                        "latitude": pick.latitude, //30.7333148,
                        "longitude": pick.longitude, //76.7794179,
                        "time": pick.time,//"2017-08-14 17:24:00",
                        "phone": pick.phone//"+911234567890"
                        }],
            "deliveries":[{
                        "job_id": deliver.job_id, //"123345",
                        "address": deliver.address, //"Chandigarh Railway Station, Daria, Chandigarh, India",
                        "latitude": deliver.latitude, //30.7022191,
                        "longitude": deliver.longitude, //76.82247009999992,
                        "time":  deliver.time, //"2017-08-14 17:30:00",
                        "phone": deliver.phone, //"+913242342342"
                        }]
        }
    

    return client.editMultipleTasks(options).then(res => {
        console.log('editing tookan task for options: ', options);
        console.log("result of editing multiple tasks =",res);
        return   
    })
    .catch(err => {
        console.log("Tookan edit multiple task failed: " + err)
    });
}


export async function TookanGetTaskDetails(data,context){
    console.log(data,context)
    //console.log("data.data() =",data.get())

    const options = {
        "api_key":TOOKAN_API_KEY,
        "job_ids":data.body.job_ids,
        "include_task_history": data.body.include_task_history
    } 

    return client.getTaskDetails(options).then(res => {
        //console.log("data.data() =",data.get())
                
        console.log("get Task details options =",options)
        console.log("result of task details =",res)
    })
    .catch(err => {
        console.log("get task details tookan error =",err)
    })
}


export async function TookanViewAllDeletedTasks(data,context) {
    console.log(data,context)

    const options = {
        "api_key": TOOKAN_API_KEY,              //"00be7353ba73d5cb9812b9b9af404f8b",
        "job_type": data.job_type,              // 1,
        "start_date": data.start_date,          //"2016-08-20",
        "end_date": data.end_date,              //"2016-08-20",
        "custom_fields": data.custom_fields,    //0,
        "is_pagination": data.is_pagination,    //1,
        "requested_page": data.requested_page,  //1,
        "customer_id": data.customer_id,        //"",
        "fleet_id": data.fleet_id,              //1234,
        "job_id": data.job_id,                  //[123, 456, 789],
        "order_id": data.order_id,              //["123", "Y-456", "O_789"],
        "team_id": data.team_id                 //123
    }

    return client.getAllDeletedTasks(options).then(res => {
        console.log("get all deleted tasks options = ",options)
        console.log("result of get all deleted tasks =",res)
    })
    .catch(err => {
        console.log("get all deleted tasks error =",err)
    })
}


export async function TookanonGetAllRelatedTasks(data,context){
    console.log(data,context)

    const options = {
        "api_key": TOOKAN_API_KEY,              //"00be7353ba73d5cb9812b9b9af404f8b",
        "pickup_delivery_relationship": data.pickup_delivery_relationship      //"229315408060285612612"
    }

    return client.getAllRelatedTasks(options).then(res => {
        console.log("get all Related tasks options = ",options)
        console.log("result of get all related tasks =",res)
    })
    .catch(err => {
        console.log("get all related tasks error =",err)
    })
}
