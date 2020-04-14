import * as CM from "azure-cognitiveservices-contentmoderator";
import * as azureMsRest from "ms-rest-azure";
import {firestoreInstance} from "../index";
import {AZURE_KEY, AZURE_ENDPOINT} from "../constants"


const contentModeratorKey = process.env[AZURE_KEY] || AZURE_KEY;
const contentModeratorEndPoint =
    process.env[AZURE_ENDPOINT] || AZURE_ENDPOINT;

const cognitiveServiceCredentials = new azureMsRest.CognitiveServicesCredentials(contentModeratorKey);
const client = new CM.ContentModeratorClient(cognitiveServiceCredentials, contentModeratorEndPoint);
    


export async function createImgJob(snapshot,context,imgId,imgValue,jobColl) {
    console.log("snapshot,context",snapshot,context)
    

    console.log("Trigerring function createImgJob for imgId :", imgId, imgValue);

    const img = imgValue.img;

    const content = {
        //DataRepresentation:"URL",
        contentValue:img
    }


    return client.reviews.createJob('tushantteam','Image','43453','default','application/json',content).then(jid =>{
        console.log("job Id :",jid);
        const job_id = jid.jobId
        const ref = firestoreInstance.collection(jobColl).doc(imgId)
        ref.set({'job_id':job_id}).then(()=>console.log("jobid updated")).catch(err =>console.log(err));
    })
    .then(err =>{
        console.log("Job create Id error:",err);
    }); 

}


export async function getImgCmJobDet(snapshot,context,imgId,imgValue,jobColl,revColl) {

    const jobId = imgValue.job_id
    console.log("imgId,jobId : ",imgId,jobId)

    return client.reviews.getJobDetails('tushantteam',jobId).then(res =>{
        console.log("result:",res)
        const status = res.status;
        if (status==="Complete"){
            const rev = res.reviewId;
            const ref = firestoreInstance.collection(jobColl).doc(imgId)
            ref.update({'status':'Pending'}).then(()=>console.log("status updated")).catch(err =>console.log(err));

            const revref = firestoreInstance.collection(revColl).doc(imgId)
            revref.set({'rev_id':rev}).then(()=>console.log("review id updated")).catch(err =>console.log(err));
        }
        else {
            const ref = firestoreInstance.collection(jobColl).doc(imgId)
            ref.update({'status':'Okay'}).then(()=>console.log("status updated")).catch(err =>console.log(err));
        }
    })
    .catch(err =>{
        console.log("error:",err)
    });

}

export async function getImgRev(snapshot,context,imgId,imgValue,jobColl){
    
    console.log("imgId",imgId);

    const revId = imgValue.rev_id
    console.log("review Id:",revId)

    return client.reviews.getReview('tushantteam',revId).then(res =>{
        console.log("result of review:",res)
        const tags = res.reviewerResultTags
        console.log("tags:",tags);

        const use_tag = tags?.filter(item => item.key === "o");
        const ok = use_tag?.pop()
        console.log("ok",ok);
        const okTag = ok?.value;
        console.log("okTag:",okTag)
        if (okTag==="False"){
            const ref = firestoreInstance.collection(jobColl).doc(imgId)
            ref.update({'status':'Not_Okay'}).then(()=>console.log("status updated")).catch(err =>console.log(err));
        }
        else {
            const ref = firestoreInstance.collection(jobColl).doc(imgId)
            ref.update({'status':'Okay'}).then(()=>console.log("status updated")).catch(err =>console.log(err));
        }
        
        
    })
    .catch(err =>{
        console.log("error :",err)
    });
};
