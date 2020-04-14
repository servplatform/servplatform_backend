import * as CM from "azure-cognitiveservices-contentmoderator";
import * as azureMsRest from "ms-rest-azure";
import {firestoreInstance} from "../index";
import {AZURE_KEY, AZURE_ENDPOINT} from "../constants"

const contentModeratorKey = process.env[AZURE_KEY] || AZURE_KEY;
const contentModeratorEndPoint =
    process.env[AZURE_ENDPOINT] || AZURE_ENDPOINT;

const cognitiveServiceCredentials = new azureMsRest.CognitiveServicesCredentials(contentModeratorKey);
const client = new CM.ContentModeratorClient(cognitiveServiceCredentials, contentModeratorEndPoint);

export async function createMsgJob(snapshot,context,msgId,msgValue,resColl,jobColl,activity) {
    //let start
    const jobcheckRef = firestoreInstance.collection(jobColl).doc(msgId)
    jobcheckRef.get()
    .then(doc =>{
        console.log(" job Id Data = ",doc.data())
        const checkRef = doc.data()
        if (checkRef === undefined)
        {
            console.log("x")
           // start = '1'
           console.log('context = ',context);
           console.log('snapshot = ',snapshot);
           let msg
           if (activity==='message')
           {
               msg = msgValue.text
           }
           else if (activity === 'service')
           {
               const msg1 = msgValue.service_name
               const msg2 = msgValue.service_description
               msg = msg1 + " " + msg2;
           }
           
       
          // var key = Object.keys(snapshot.data())[0];
         //   console.log(key);
           console.log('Triggering createMsgJob for message id ', msgId, msg);
           
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
           
           client.reviews.createJob('tushantteam','Text','929334345884','textworkflow','application/json',content).then(jId =>{
               console.log("jId: ",jId);
               const jobId = jId.jobId;
               
               console.log(jobId);
               return updateJobId(jobId,msgId,jobColl)
           })
           .catch(err =>{
               console.log("Error :",err);
           })
       
           return client.textModeration.screenText(msgContentType,msg,options).then(res =>{
               console.log("message is :",msg);
               console.log("result is :",res);
       
               return updateMsgResult(res,msgId,msg,resColl);
               
           })
           .catch(err => {
               console.log("Message result getting failed :",err)
           });
            return '1'
        }
        else{
            console.log("y")
           // start = '0'
        
            return '0'
        }
    })
    .catch(() => console.log("error"))

}


async function updateMsgResult (res,msgId,msg,resColl): Promise<string> {
    console.log("Updated content for task_id ",msgId);
    const lang = res.language;
    const cat1 = res.classification?.category1;
    const cat2 = res.classification?.category2;
    const cat3 = res.classification?.category3;
    const rev =  res.classification.reviewRecommended;

    const scoreCat1 = cat1.score;
    const scoreCat2 = cat2.score;
    const scoreCat3 = cat3.score;

    

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
        const msgRef = firestoreInstance.collection(resColl).doc(msgId);
        msgRef.set(resultData).then(() => console.log("msgId:", msgId)).catch(err => console.log(" failed : " + err));
   
    return msgId
}


async function updateJobId (jobId,msgId,jobColl): Promise<string> {
    
        const jobRef = firestoreInstance.collection(jobColl).doc(msgId);
        jobRef.set({'job_id':jobId}).then(() => console.log("JobId :",jobId)).catch(err => console.log("failed : "+err));
   
    return jobId
}





export async function getMsgCmJobDet(snapshot,context,msgId,msgValue,jobColl,revColl,okColl,notOkColl,activity){
    
    console.log("snapshot,context,activity =",snapshot,context,activity)
    const jobId = msgValue.job_id
    console.log("msgId,jobId : ",msgId,jobId)

    return client.reviews.getJobDetails('tushantteam',jobId).then(res =>{
        console.log("result:",res)
        //const status = res.status;
        const rev = res.reviewId;

            if (rev!==""){
                const ref = firestoreInstance.collection(jobColl).doc(msgId)
                ref.update({'status':'Pending'}).then(()=>console.log("status updated")).catch(err =>console.log(err));
    
                const revref = firestoreInstance.collection(revColl).doc(msgId)
                revref.set({'rev_id':rev}).then(()=>console.log("review id updated")).catch(err =>console.log(err));


                const getRef = firestoreInstance.collection(okColl).doc(msgId)
                getRef.get()
                .then(doc => {
                    if (!doc.exists) {
                      console.log('No such document!');
                    } else {
                      console.log('Document data:', doc.data());
                      const setDoc = doc.data()
                      const docId = doc.id
                    

                      console.log("docId :",docId)
                      console.log("setDoc :",setDoc)
                      console.log("doc: ",doc)
                      //setDoc = {text : something}
                      const setRef = firestoreInstance.collection(notOkColl).doc(msgId)
                      setRef.set({setDoc}).then(()=>console.log("result send to not_okay list")).catch(err =>console.log(err));

                      const delData = firestoreInstance.collection(okColl).doc(msgId).delete()
                      console.log("delData:",delData)
                    }
                  })
                  .catch(err => {
                    console.log('Error getting document', err);
                  });
                
            }
            else {
                const ref = firestoreInstance.collection(jobColl).doc(msgId)
                ref.update({'status':'Okay'}).then(()=>console.log("status updated")).catch(err =>console.log(err));
            }
    })
    .catch(err => console.log("error:",err))

}

export async function getMsgRev(snapshot,context,msgId,msgValue,jobColl,okColl,notOkColl,activity){
   
    console.log("msgId",msgId,snapshot,context,activity);

    const revId = msgValue.rev_id
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
            const ref = firestoreInstance.collection(jobColl).doc(msgId)
            ref.update({'status':'Not_Okay'}).then(()=>console.log("status updated")).catch(err =>console.log(err));
        }
        else {
            const ref = firestoreInstance.collection(jobColl).doc(msgId)
            ref.update({'status':'Okay'}).then(()=>console.log("status updated")).catch(err =>console.log(err));

            const getRef = firestoreInstance.collection(notOkColl).doc(msgId)
            getRef.get()
            .then(doc => {
                console.log("docData outside :",doc.data())
                if (!doc.exists) {
                  console.log('No such document!');
                } else {
                  console.log('Document data:', doc.data());
                  const setDoc = doc.data()
                  console.log("setDoc =",setDoc);

                  for (const key in setDoc){
                     const attrValue = setDoc[key]
                     console.log("attrValue =",attrValue)
                         
                      const setRef = firestoreInstance.collection(okColl).doc(msgId);
                     setRef.set(setDoc[key]).then(() => console.log("data updated to okay list")).catch(err => console.log(err));

                  }

                }
              })
              .catch(err => {
                console.log('Error getting document', err);
              });
            
            }
    })
    .catch(err =>{
        console.log("error :",err)
    });

}

