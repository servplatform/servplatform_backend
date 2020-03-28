import * as CM from "azure-cognitiveservices-contentmoderator";
import * as azureMsRest from "ms-rest-azure";
import {firestoreInstance} from "../index";

const contentModeratorKey = process.env["54e4c6f1784347e78fe58f4be81e9626"] || "54e4c6f1784347e78fe58f4be81e9626";
const contentModeratorEndPoint =
    process.env["https://tushantcontentmoderation.cognitiveservices.azure.com/"] || "https://tushantcontentmoderation.cognitiveservices.azure.com/";

const cognitiveServiceCredentials = new azureMsRest.CognitiveServicesCredentials(contentModeratorKey);
const client = new CM.ContentModeratorClient(cognitiveServiceCredentials, contentModeratorEndPoint);

export async function createMsgJob(snapshot,context,activity) {
    let msgId

    if (activity==='message'){
        msgId = context.params.msgId;
    }
    else if (activity === 'serviceName'){
        msgId = context.params.serviceId;
    }
    else if (activity === 'serviceDescription'){
        msgId = context.params.serviceId;
    }

    const msgValue = snapshot.data();


   // var key = Object.keys(snapshot.data())[0];
  //   console.log(key);

    console.log('Triggering getMsgResult for message id ', msgId, msgValue);
    let msg

    if (activity==='message'){
        msg = msgValue.text;
    }
    else if ( activity === 'serviceName'){
        msg = msgValue.service_name;
    }
    else if ( activity === 'serviceDescription'){
        msg = msgValue.service_description;
    }
    




    const msgContentType = "text/plain";
    console.log("msg : ",msg);
    console.log("Client :", client);

    const options={
        'language': 'eng',
        'autocorrect': true,
        'pII': false,
        //listId?: string | undefined;
        'classify': true
    }

    const content = {
        contentValue : msg,
    }

    const opts = {
        customHeaders : {
            'Ocp-Apim-Subscription-Key' : '7482fd48c8654bbc93685f7f04015185',
        }
    }

    
    client.reviews.createJob('team1037','Text','9293884','default','application/json',content,opts).then(jId =>{
        console.log("jId: ",jId);
        const jobId = jId.jobId;
        
        console.log(jobId);
        return updateJobId(jobId,msgId,activity)
    })
    .catch(err =>{
        console.log("Error :",err);
    })

    return client.textModeration.screenText(msgContentType,msg,options).then(res =>{
        console.log("message is :",msg);
        console.log("result is :",res);

        return updateMsgResult(res,msgId,msg,activity);
        
    })
    .catch(err => {
        console.log("Message result getting failed :",err)
    });
}


async function updateMsgResult (res,msgId,msg,activity): Promise<string> {
    console.log("Updated content for task_id ",msgId);
    const lang = res.language;
    const cat1 = res.classification?.category1;
    const cat2 = res.classification?.category2;
    const cat3 = res.classification?.category3;
    const rev =  res.classification.reviewRecommended;

    const scoreCat1 = cat1.score;
    const scoreCat2 = cat2.score;
    const scoreCat3 = cat3.score;

    

    
    if (activity==="message"){

        const resultData = {
            "result of message" :{
            "msg" : msg,
            language : lang,
            "sexually explicit or adult" : scoreCat1,
            "sexually suggestive or mature" : scoreCat2,
            "offensive" : scoreCat3,
            "Review Recommond" : rev,
            }
        }
        const msgRef = firestoreInstance.collection("messages").doc(msgId);
        msgRef.update(resultData).then(() => console.log("msgId:", msgId)).catch(err => console.log(" failed : " + err));
    }
    else if (activity==="serviceName"){

        const resultData = {
            'result of service name' :{
            "msg" : msg,
            language : lang,
            "sexually explicit or adult" : scoreCat1,
            "sexually suggestive or mature" : scoreCat2,
            "offensive" : scoreCat3,
            "Review Recommond" : rev,
            }
        }

        const msgRef = firestoreInstance.collection("services").doc(msgId);
        msgRef.update(resultData).then(() => console.log("msgId:", msgId)).catch(err => console.log(" failed : " + err));
    }
    else if (activity==="serviceDescription"){

        const resultData = {
            'result of service Description' :{
            "msg" : msg,
            language : lang,
            "sexually explicit or adult" : scoreCat1,
            "sexually suggestive or mature" : scoreCat2,
            "offensive" : scoreCat3,
            "Review Recommond" : rev,
            }
        }

        const msgRef = firestoreInstance.collection("services").doc(msgId);
        msgRef.update(resultData).then(() => console.log("msgId:", msgId)).catch(err => console.log(" failed : " + err));
    }


    return msgId
}

async function updateJobId (jobId,msgId,activity): Promise<string> {
    
    if (activity==="message"){
        const jobRef = firestoreInstance.collection('messages').doc(msgId);
        jobRef.update({'JobId of message':jobId}).then(() => console.log("JobId :",jobId)).catch(err => console.log("failed : "+err));
    }
    else if (activity==="serviceName"){
        const jobRef = firestoreInstance.collection('services').doc(msgId);
        jobRef.update({'JobId of serviceName':jobId}).then(() => console.log("JobId :",jobId)).catch(err => console.log("failed : "+err));
    }
    else if (activity==="serviceDescription"){
        const jobRef = firestoreInstance.collection('services').doc(msgId);
        jobRef.update({'JobId of serviceDescription':jobId}).then(() => console.log("JobId :",jobId)).catch(err => console.log("failed : "+err));
    }


    client.reviews.getJobDetails('team1037',jobId).then(det =>{
        console.log("job details : ",det);

    })
    .catch(err => console.log("job details failed : ",+err));

    return jobId
}




