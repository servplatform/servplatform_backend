import {
    TOOKAN_API_KEY,TASKS
} from "../constants";
import {firestoreInstance} from "../index";
import * as Tookan from "tookan-api";
const client = new Tookan.Client({api_key: TOOKAN_API_KEY});

export async function createTookanTask(snapshot, context) {
    
    const taskId = context.params.taskId;
    const newValue = snapshot.data();
    

    console.log('Triggering Create Tookan task for task id ', taskId, newValue);

    const options = {
        api_key:"50646087f2454f051c157a7c521025431be3c3fb2ed9783b541f01",
        order_id:newValue.order_id,
        job_description:newValue.job_description,
        customer_email:"aman@gmail.com",
        customer_username:"John Doe",
        customer_phone:"+12015555555",
        customer_address:"frigate bay 2",
        latitude:"30.7188978",
        longitude:"76.810298",
        job_delivery_datetime:"2020-08-14 21:00:00",
        custom_field_template:"Template_1",
        meta_data:[{"label":"Price","data":"100"},{"label":"Quantity","data":"100"}],
        team_id:"",
        auto_assignment:"0",
        has_pickup:"0",
        has_delivery:"1",
        layout_type:"0",
        tracking_link:1,
        timezone:"-330",
        fleet_id:"636",
        ref_images:["http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png(2 kB) http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png","http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png(2 kB) http://tookanapp.com/wp-content/uploads/2015/11/logo_dark.png"],
        notify:1,
        tags:"",
        geofence:0
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