import * as CM from "azure-cognitiveservices-contentmoderator";
import * as azureMsRest from "ms-rest-azure";
import {firestoreInstance} from "../index";

const contentModeratorKey = process.env["919a1c36b6a24e4585f53b4c0bd64752"] || "919a1c36b6a24e4585f53b4c0bd64752";
const contentModeratorEndPoint =
    process.env["https://tushant.cognitiveservices.azure.com/"] || "https://tushant.cognitiveservices.azure.com/";

const cognitiveServiceCredentials = new azureMsRest.CognitiveServicesCredentials(contentModeratorKey);
const client = new CM.ContentModeratorClient(cognitiveServiceCredentials, contentModeratorEndPoint);
    


export async function createImgJob(snapshot,context) {
    const imgId = context.params.imgId;
    const imgValue = snapshot.data();

    console.log("Trigerring function createImgJob for imgId :", imgId, imgValue);

    const img = imgValue.img;

    const content = {
        //DataRepresentation:"URL",
        contentValue:img
    }


    return client.reviews.createJob('tushantteam','Image','43453','default','application/json',content).then(jid =>{
        console.log("job Id :",jid);
        const job_id = jid.jobId
        const ref = firestoreInstance.collection('image_cm_result').doc(imgId)
        ref.set({'job_id':job_id}).then(()=>console.log("jobid updated")).catch(err =>console.log(err));
        return
    })
    .then(err =>{
        console.log("Job create Id error:",err);
    }); 

}

