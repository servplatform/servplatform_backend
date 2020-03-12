import {
    TOOKAN_API_KEY,TASKS, AGENTS, USERS, PROVIDERS
} from "../constants";
import {firestoreInstance} from "../index";
import * as Tookan from "tookan-api";
const client = new Tookan.Client({api_key: TOOKAN_API_KEY});

export async function createTookanTask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

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
        meta_data:newValue.pickup_meta_data,
        team_id:newValue.team_id,
        auto_assignment:newValue.auto_assignment,
        has_pickup:newValue.has_pickup,
        has_delivery:newValue.has_delivery,
        layout_type:newValue.layout_type,
        tracking_link:newValue.tracking_link,
        timezone:newValue.timezone,
        fleet_id:newValue.fleet_id,
        ref_images:newValue.p_ref_images,
        notify:newValue.notify,
        tags:newValue.tags,
        geofence:newValue.geofencing
    };
    //Create task in tookan
    console.log('Creating tookan task for options: ', options);
    return client.createTask(options).then(res => {
        return updateTaskOnTaskCreate(res,taskId);   
    })
    .catch(err => {
        console.log("Tookan Create task failed: " + err)
    });
}

async function updateTaskOnTaskCreate (res,taskId): Promise<string> {
    console.log("Tookan task created with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Update Task based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data).then(() => console.log("task updated based on tookan response for taskId:", taskId)).catch(err => console.log("Update task based on task id failed for: " + err));
	return taskId
}

export async function edittookantask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Edit Tookan task for task id ', taskId, newValue);

    const options = {
        customer_email: newValue.customer_email,
        customer_username: newValue.customer_username,
        customer_phone: newValue.customer_phone,
        customer_address: newValue.customer_address,
        latitude: newValue.latitude,
        longitude: newValue.longitude,
        job_description: newValue.job_description,
        job_pickup_datetime: newValue.job_pickup_datetime,
        job_delivery_datetime: newValue.job_delivery_datetime,
        has_pickup: newValue.has_pickup,
        has_delivery: newValue.has_delivery,
        layout_type: newValue.layout_type,
        tracking_link: newValue.tracking_link,
        timezone: newValue.timezone,
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        notify: newValue.notify
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

async function updateTaskOnTaskEdit (res,taskId): Promise<string> {
    console.log("Tookan task edited with response successfully for taskId: ",taskId,"Response received from tookan: ",res);
    console.log("Update Task based on response for taskId started",taskId);
    console.log("Updated content for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
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
    taskRef.set(res.data).then(() => console.log("task deleted based on tookan response for taskId:", taskId)).catch(err => console.log("Task Deletion based on task id failed for: " + err));
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
    taskRef.set(res.data).then(() => console.log("task status updated based on tookan response for taskId:", taskId)).catch(err => console.log("Updating task status based on task id failed for: " + err));
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
    taskRef.set(res.data).then(() => console.log("task started based on tookan response for taskId:", taskId)).catch(err => console.log("Task Start based on task id failed for: " + err));
	return taskId
}

export async function Canceltookantask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Cancel Tookan task for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        job_status: newValue.job_status
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
    taskRef.set(res.data).then(() => console.log("task cancelled based on tookan response for taskId:", taskId)).catch(err => console.log("Task Cancelled based on task id failed for: " + err));
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
    console.log("Task assigned for task_id ",taskId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(TASKS).doc(taskId);
    taskRef.set(res.data).then(() => console.log("task assigned based on tookan response for taskId:", taskId)).catch(err => console.log("Task assigned based on task id failed for: " + err));
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
    taskRef.set(res.data).then(() => console.log("task auto assigned based on tookan response for taskId:", taskId)).catch(err => console.log("Task auto assigned based on task id failed for: " + err));
	return taskId
}

export async function GettookantaskStatistics(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan task Statistics for task id ', taskId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_status: newValue.job_status
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
    taskRef.set(res.data).then(() => console.log("Task Statistics calculated based on tookan response for taskId:", taskId)).catch(err => console.log("Task Statistics Calculated based on task id failed for: " + err));
	return taskId
}

export async function getAllTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering get all tookan agents for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        tags: newValue.tags,
        name: newValue.name,
        fleet_ids: newValue.fleet_id,
        include_any_tag: newValue.include_any_tag,
        status: newValue.status,
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
        rule_id: newValue.rule_id
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

async function tookanaddagents(res,agentId): Promise<string> {
    console.log("Tookan add agents with response successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Adding agents based on response for agentId started",agentId);
    console.log("Agent added for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Adding agents based on agent Id:", agentId)).catch(err => console.log("Update agents based on agent id failed for: " + err));
	return agentId
}

export async function EditTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering edit tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
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
        rule_id: newValue.rule_id
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

async function tookaneditagents(res,agentId): Promise<string> {
    console.log("Tookan edit agents with response successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Editing agents information based on response for agentId started",agentId);
    console.log("Agent information edited for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Editing agent information based on agent Id:", agentId)).catch(err => console.log("Editing agents information based on agent id failed for: " + err));
	return agentId
}

export async function BlockorUnblockTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Block or Unblock tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
        block_status: newValue.block_status
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
    console.log("Agent blocked or unblocked for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Editing agent block/unblock status based on agent Id:", agentId)).catch(err => console.log("Editing agents block/unblock status based on agent id failed for: " + err));
	return agentId
}

export async function DeleteTookanAgents(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Block or Unblock tookan agent for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
      };
    
      //Delete agents in tookan
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
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Deleting agent successfully based on agent Id:", agentId)).catch(err => console.log("Deleting agents based on agent id failed for: " + err));
	return agentId
}

export async function ViewTookanAgentsProfile(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering view tookan agent profile for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
      };
    
      //View agents profile in tookan
    console.log('Viewing profile of tookan agents for options: ', options);
    return client.viewAgentProfile(options).then(res => {
        return tookanviewagentsprofile(res,agentId);   
    })
    .catch(err => {
        console.log("Viewing tookan agents profile task failed: " + err)
    });
}

async function tookanviewagentsprofile(res,agentId): Promise<string> {
    console.log("Tookan agents profile viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Viewing agent profile based on response for agentId started",agentId);
    console.log("Agent profile viewed for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Profile of tookan agent viewed successfully based for agent Id:", agentId)).catch(err => console.log("Viewing agents profile based on agent id failed for: " + err));
	return agentId
}

export async function UpdateTookanAgentTags(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Update Tookan agent Tags profile for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
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
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Tags of tookan agent updated successfully based on agent Id:", agentId)).catch(err => console.log("Updating agents tags based on agent id failed for: " + err));
	return agentId
}

export async function GetTookanAgentTags(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan agent Tags profile for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
      };
    
      //Get agents tags in tookan
    console.log('Get tags of tookan agents for options: ', options);
    return client.getAgentTags(options).then(res => {
        return tookangetagenttags(res,agentId);   
    })
    .catch(err => {
        console.log("Get tookan agents tags task failed: " + err)
    });
}

async function tookangetagenttags(res,agentId): Promise<string> {
    console.log("Tookan agent tags viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Get agent tags based on response for agentId started",agentId);
    console.log("Agent tags viewed for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Tags of tookan agent viewed successfully based on agent Id:", agentId)).catch(err => console.log("Getting agents tags based on agent id failed for: " + err));
	return agentId
}

export async function GetTookanAgentLogs(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan agent logs for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        date: newValue.date,
        team_ids: newValue.team_ids
      };
    
      //Get agents logs in tookan
    console.log('Get logs of tookan agents for options: ', options);
    return client.getAgentLogs(options).then(res => {
        return tookangetagentlogs(res,agentId);   
    })
    .catch(err => {
        console.log("Get tookan agents logs task failed: " + err)
    });
}

async function tookangetagentlogs(res,agentId): Promise<string> {
    console.log("Tookan agent logs viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Get agent logs based on response for agentId started",agentId);
    console.log("Agent logs viewed for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Logs of tookan agent viewed successfully based on agent Id:", agentId)).catch(err => console.log("Getting agents logs based on agent id failed for: " + err));
	return agentId
}

export async function GetTookanAgentLocation(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan agent location for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id
      };
    
      //Get agents location in tookan
    console.log('Get location of tookan agents for options: ', options);
    return client.getAgentLocation(options).then(res => {
        return tookangetagentlocation(res,agentId);   
    })
    .catch(err => {
        console.log("Get tookan agents location task failed: " + err)
    });
}

async function tookangetagentlocation(res,agentId): Promise<string> {
    console.log("Tookan agent location viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Get agent location based on response for agentId started",agentId);
    console.log("Agent location viewed for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Location of tookan agent viewed successfully based on agent Id:", agentId)).catch(err => console.log("Getting agents location based on agent id failed for: " + err));
	return agentId
}

export async function SendAgentNotification(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Send Tookan agent Notification for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        fleet_id: newValue.fleet_id,
        message: newValue.message
      };
    
      //Send agents Notification in tookan
    console.log('Send notification to tookan agents for options: ', options);
    return client.sendNotificationToAgent(options).then(res => {
        return tookannotificationstoagents(res,agentId);   
    })
    .catch(err => {
        console.log("Send notifications to tookan agents task failed: " + err)
    });
}

async function tookannotificationstoagents(res,agentId): Promise<string> {
    console.log("Notification sent to agent successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Sending Notifications to agent based on response for agentId started",agentId);
    console.log("Notification sent to agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Notification to tookan agent sent successfully based on agent Id:", agentId)).catch(err => console.log(" Sending Notifications task based on agent id failed for: " + err));
	return agentId
}

export async function GetTookanAgentSchedule(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Get Tookan agent Schedule for agent Id', agentId, newValue);

    const options = {
      api_key: TOOKAN_API_KEY,
      local_date_time: newValue.local_date_time,
      limit: newValue.limit
    };
    
      //Get agents Schedule in tookan
    console.log('Get Schedule of tookan agents for options: ', options);
    return client.getAgentSchedule(options).then(res => {
        return tookangetagentschedule(res,agentId);   
    })
    .catch(err => {
        console.log("Get Schedule of tookan agents task failed: " + err)
    });
}

async function tookangetagentschedule(res,agentId): Promise<string> {
    console.log("Schedule of agent viewed successfully for agentId: ",agentId,"Response received from tookan: ",res);
    console.log("Viewing agent Schedule based on response for agentId started",agentId);
    console.log("Schedule seen for agent id ",agentId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Schedule of tookan agent seen successfully based on agent Id:", agentId)).catch(err => console.log(" Getting Schedule based on agent id failed for: " + err));
	return agentId
}

export async function AssignTookanAgentTask(snapshot, context) {
    
    const agentId = context.params.agentId;
    const newValue = snapshot.data();
    

    console.log('Triggering Assign Tookan agent Task for agent Id', agentId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        job_id: newValue.job_id,
        team_id: newValue.team_id,
        fleet_id: newValue.fleet_id,
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
    const taskRef = firestoreInstance.collection(AGENTS).doc(agentId);
    taskRef.set(res.data).then(() => console.log("Task assigned successfully based on agent Id:", agentId)).catch(err => console.log("Task assigning based on agent id failed for: " + err));
	return agentId
}

export async function AddNewCustomer(snapshot, context) {
    
    const customerId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering Add new Customer for customer Id', customerId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        user_type: 0,
        name: newValue.full_name,
        phone: newValue.phone_number,
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
    const taskRef = firestoreInstance.collection(USERS).doc(customerId);
    taskRef.set(res.data).then(() => console.log("Customer added based on customer Id:", customerId)).catch(err => console.log("Adding customer based on customer id failed for: " + err));
	return customerId
}

export async function EditCustomer(snapshot, context) {
    
    const customerId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering Edit Customer details for customer Id', customerId, newValue);

    const options = {
      api_key: TOOKAN_API_KEY,
      user_type: 0,
      customer_id: newValue.user_id,
      name: newValue.full_name,
      phone: newValue.phone_number,
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
    const taskRef = firestoreInstance.collection(USERS).doc(customerId);
    taskRef.set(res.data).then(() => console.log("Customer edited based on customer Id:", customerId)).catch(err => console.log("Editing customer based on customer id failed for: " + err));
	return customerId
}

export async function FindCustomerWithPhone(snapshot, context) {
    
    const customerId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering Find customer with phone for customer Id', customerId, newValue);

    const options = {
      api_key: TOOKAN_API_KEY,
      customer_phone: newValue.phone_number
    };
    
      //Getting customers with phone in tookan
    console.log('Get customers with phone for options: ', options);
    return client.findCustomerWithPhone(options).then(res => {
        return Customerwithphone(res,customerId);   
    })
    .catch(err => {
        console.log("Getting customers with phone failed: " + err)
    });
}

async function Customerwithphone(res,customerId): Promise<string> {
    console.log("Finding customers with phone for customerId: ",customerId,"Response received from tookan: ",res);
    console.log("Finding customers with phone based on response for customerId started",customerId);
    console.log("Finding customers with phone for customerid ",customerId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(USERS).doc(customerId);
    taskRef.set(res.data).then(() => console.log("Finding customers with phone based on customer Id:", customerId)).catch(err => console.log("Finding customer with phone based on customer id failed for: " + err));
	return customerId
}

export async function FindCustomerWithName(snapshot, context) {
    
    const customerId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering Find customer with Name for customer Id', customerId, newValue);

    const options = {
      api_key: TOOKAN_API_KEY,
      customer_name: newValue.full_name
    };
    
      //Getting customers with name in tookan
    console.log('Get customers with name for options: ', options);
    return client.FindCustomerWithName(options).then(res => {
        return Customerwithname(res,customerId);   
    })
    .catch(err => {
        console.log("Getting customers with name failed: " + err)
    });
}

async function Customerwithname(res,customerId): Promise<string> {
    console.log("Finding customers with name: ",customerId,"Response received from tookan: ",res);
    console.log("Finding customers with name based on response for customerId started",customerId);
    console.log("Finding customers with name ",customerId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(USERS).doc(customerId);
    taskRef.set(res.data).then(() => console.log("Finding customers with name based on customer Id:", customerId)).catch(err => console.log("Finding customer with name based on customer id failed for: " + err));
	return customerId
}

export async function ViewTookanCustomerProfile(snapshot, context) {
    
    const customerId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering view customer profile for customer Id', customerId, newValue);

    const options = {
      api_key: TOOKAN_API_KEY,
      customer_id: newValue.user_id
    };
    
      //viewing customers profile in tookan
    console.log('View customer profile for options: ', options);
    return client.viewCustomerProfile(options).then(res => {
        return Customerprofile(res,customerId);   
    })
    .catch(err => {
        console.log("Viewing customer profile failed: " + err)
    });
}

async function Customerprofile(res,customerId): Promise<string> {
    console.log("Viewing customers profile with name: ",customerId,"Response received from tookan: ",res);
    console.log("Viewing customers profile based on response for customerId started",customerId);
    console.log("Viewing customers profile for customer Id ",customerId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(USERS).doc(customerId);
    taskRef.set(res.data).then(() => console.log("Viewing customers profile for customer Id:", customerId)).catch(err => console.log("Viewing customer profile for customer id failed for: " + err));
	return customerId
}

export async function DeleteTookanCustomer(snapshot, context) {
    
    const customerId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering delete customer for customer Id', customerId, newValue);

    const options = {
      api_key: TOOKAN_API_KEY,
      customer_id: newValue.user_id
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
    const taskRef = firestoreInstance.collection(USERS).doc(customerId);
    taskRef.set(res.data).then(() => console.log("Deleting customers for customer Id:", customerId)).catch(err => console.log("Deleting customer for customer id failed for: " + err));
	return customerId
}

export async function CreateNewMerchant(snapshot, context) {
    
    const merchantId = context.params.customerId;
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
        phone_directory: {
          phone: newValue.phone,
          country_code: newValue.country_code
        },
        merchant_permission: {
          view_task: newValue.view_task,
          add_task: newValue.add_task,
          add_team: newValue.add_team ,
          view_team: newValue.view_team ,
          add_region: newValue.add_region ,
          view_region: newValue.view_region ,
          add_agent: newValue.add_agent,
          view_agent: newValue.view_agent ,
          view_fleet_avalibility: newValue.view_fleet_avalibility ,
          edit_fleet_avalibility: newValue.edit_fleet_avalibility 
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
    const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    taskRef.set(res.data).then(() => console.log("Creating new merchants for merchant Id:", merchantId)).catch(err => console.log("Creating new merchants for merchant id failed for: " + err));
	return merchantId
}

export async function EditTookanMerchant(snapshot, context) {
    
    const merchantId = context.params.customerId;
    const newValue = snapshot.data();
    

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
          phone: newValue.phone,
          country_code: newValue.country_code
        },
        merchant_permission: {
          view_task: newValue.view_task,
          add_task: newValue.add_task,
          add_team: newValue.add_team ,
          view_team: newValue.view_team ,
          add_region: newValue.add_region ,
          view_region: newValue.view_region ,
          add_agent: newValue.add_agent,
          view_agent: newValue.view_agent ,
          view_fleet_avalibility: newValue.view_fleet_avalibility ,
          edit_fleet_avalibility: newValue.edit_fleet_avalibility 
        },
        commission_percentage: newValue.commission_percentage,
        merchant_id: newValue.merchant_id,
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
    const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    taskRef.set(res.data).then(() => console.log("Editing merchants for merchant Id:", merchantId)).catch(err => console.log("Editing merchants for merchant id failed for: " + err));
	return merchantId
}

export async function ViewTookanMerchant(snapshot, context) {
    
    const merchantId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering view merchant for merchant Id', merchantId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        user_id: newValue.user_id
      };
    
      //Viewing merchant in tookan
    console.log('Viewing merchant for options: ', options);
    return client.viewMerchant(options).then(res => {
        return MerchantView(res,merchantId);   
    })
    .catch(err => {
        console.log("Viewing merchant failed: " + err)
    });
}

async function MerchantView(res,merchantId): Promise<string> {
    console.log("Viewing merchant for merchant ID: ",merchantId,"Response received from tookan: ",res);
    console.log("Viewing merchants based on response for merchantId started",merchantId);
    console.log("Viewing merchants for merchant Id ",merchantId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    taskRef.set(res.data).then(() => console.log("Viewing merchants for merchant Id:", merchantId)).catch(err => console.log("Viewing merchants for merchant id failed for: " + err));
	return merchantId
}

export async function GetMerchantDetails(snapshot, context) {
    
    const merchantId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering get merchant details for merchant Id', merchantId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        user_id: newValue.user_id
      };
    
      //Getting merchant details in tookan
    console.log('Getting merchant details for options: ', options);
    return client.getMerchantDetails(options).then(res => {
        return MerchantDetails(res,merchantId);   
    })
    .catch(err => {
        console.log("Getting merchant details failed: " + err)
    });
}

async function MerchantDetails(res,merchantId): Promise<string> {
    console.log("Getting merchant details for merchant ID: ",merchantId,"Response received from tookan: ",res);
    console.log("Getting merchants details based on response for merchantId started",merchantId);
    console.log("Getting merchants details for merchant Id ",merchantId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    taskRef.set(res.data).then(() => console.log("Getting merchants details for merchant Id:", merchantId)).catch(err => console.log("Getting merchants details for merchant id failed for: " + err));
	return merchantId
}

export async function GetMerchantReports(snapshot, context) {
    
    const merchantId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering get merchant reports for merchant Id', merchantId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        user_id: newValue.user_id,
        merchant_id: newValue.merchant_id
      };
    
      //Getting merchant reports in tookan
    console.log('Getting merchant reports for options: ', options);
    return client.getMerchantReport(options).then(res => {
        return MerchantReports(res,merchantId);   
    })
    .catch(err => {
        console.log("Getting merchant reports failed: " + err)
    });
}

async function MerchantReports(res,merchantId): Promise<string> {
    console.log("Getting merchant reports for merchant ID: ",merchantId,"Response received from tookan: ",res);
    console.log("Getting merchants reports based on response for merchantId started",merchantId);
    console.log("Getting merchants reports for merchant Id ",merchantId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    taskRef.set(res.data).then(() => console.log("Getting merchants reports for merchant Id:", merchantId)).catch(err => console.log("Getting merchants reports for merchant id failed for: " + err));
	return merchantId
}

export async function BlockUnblockMerchant(snapshot, context) {
    
    const merchantId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering block or unblock merchants for merchant Id', merchantId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        is_blocked: newValue.is_blocked,
        merchant_id: newValue.merchant_id
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
    const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    taskRef.set(res.data).then(() => console.log("Blocking/Unblocking merchants for merchant Id:", merchantId)).catch(err => console.log("Blocking/Unblocking merchants for merchant id failed for: " + err));
	return merchantId
}

export async function AvailableMerchantAgents(snapshot, context) {
    
    const merchantId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering get available merchant agents for merchant Id', merchantId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        merchant_id: newValue.merchant_id,
        latitude: newValue.latitude,
        longitude: newValue.longitude
      };
    
      //Get Available merchant agents in tookan
    console.log('Get Available merchant agents for options: ', options);
    return client.getAvailableMerchantAgents(options).then(res => {
        return MerchantAvailableAgents(res,merchantId);   
    })
    .catch(err => {
        console.log("Getting Available merchant agents failed: " + err)
    });
}

async function MerchantAvailableAgents(res,merchantId): Promise<string> {
    console.log("Getting Available merchants agents for merchant ID: ",merchantId,"Response received from tookan: ",res);
    console.log("Getting Available merchants agents based on response for merchantId started",merchantId);
    console.log("Getting Available merchants agents for merchant Id ",merchantId,"content: ",res.data);
    const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    taskRef.set(res.data).then(() => console.log("Getting Available merchants agents for merchant Id:", merchantId)).catch(err => console.log("Getting Available merchants agents for merchant id failed for: " + err));
	return merchantId
}

export async function AssignMerchantAgentsTask(snapshot, context) {
    
    const merchantId = context.params.customerId;
    const newValue = snapshot.data();
    

    console.log('Triggering assign task to merchant agents for merchant Id', merchantId, newValue);

    const options = {
        api_key: TOOKAN_API_KEY,
        merchant_id: newValue.merchant_id,
        job_id: newValue.job_id,
        team_id: newValue.team_id,
        fleet_id: newValue.fleet_id,
        notify: newValue.notify,
        geofence: newValue.geofence,
        job_status: newValue.job_status
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
    const taskRef = firestoreInstance.collection(PROVIDERS).doc(merchantId);
    taskRef.set(res.data).then(() => console.log("Assigning tasks to merchant agents for merchant Id:", merchantId)).catch(err => console.log("Assigning tasks to merchant agents for merchant id failed for: " + err));
	return merchantId
}
