import * as _ from 'lodash';
import {SERVICE_BASE_URL} from '../constants/system-constant';
import {getHttpInstance} from './httputil';

let instance = getHttpInstance(SERVICE_BASE_URL);

export let deleteTestId = (id) =>{
 let promise = new Promise((resolve,reject) =>{
  instance.delete("/examtestpaper/delete/"+id).then(resp =>{  
   resolve({message:'Test deleted!!'});
  }).catch(error =>{
   console.log('Error while deleting test ',error);
   reject({message:'Error while deleting test!'});
  });
 });
 return promise; 
};

export let getHighestScore =(testId)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get('/examtestpaper/'+testId+'/attempt/highestscore').then(resp =>{
   resolve({highestScore:resp.data});
  }).catch(error =>{
   console.log('Error while reterving highest score for test! >' , testId,error);
   reject({message:'Error while reterving highest score for test!'});
  });  
 });
 return promise;
};
export let startTestAttempt = (testId)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get('/examtestpaper/'+testId+'/attempt/start').then(resp =>{     
   resolve({message:'Test attempt started successsfully with id = '+resp.data.id,testAttempt:resp.data});
  }).catch(error =>{
   console.log('Error while saving test! >' , error);
   reject({message:'Error while saving test!'});
  });  
 });
 return promise;
};


export let saveTestAttempt = (testAttempt)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/examtestpaper/attempt/save",JSON.stringify(testAttempt)).then(resp =>{     
   resolve({message:'Test attempt saved successsfully with id = '+resp.data.id,testAttempt:resp.data});
  }).catch(error =>{
   console.log('Error while saving test result >' , error);
   reject({message:'Error while saving test result!'});
  });  
 });
 return promise;
};

export let saveTest = (test)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/examtestpaper/save",JSON.stringify(test)).then(resp =>{     
   resolve({message:'Test saved successsfully saved with id = '+resp.data.id,test:resp.data});
  }).catch(error =>{
   console.log('Error while saving test! >' , error);
   reject({message:'Error while saving test!'});
  });  
 });
 return promise;
};

export let addQuestionToTest = (id,questionId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.post("/examtestpaper/question/add/"+id+"/"+questionId,{}).then(resp =>{     
   resolve({message:'Question add successfully!'});
  }).catch(error =>{
   console.log('Error while saving test! >' , error);
   reject({message:'Error while adding question to test!'});
  });
 });
 return promise;
};

export let removeQuestionFromTest = (id,questionId)=>{
 let promise = new Promise((resolve,reject)=>{     
  instance.post("/examtestpaper/question/remove/"+id+"/"+questionId,{})
   .then(resp =>{     
    resolve({message:'Question removed successfully!', test:resp.data});
   }).catch(error =>{
    console.log('Error while removing question from test! >' , error);
    reject({message:'Error while removing question from test!'});
   });  
 });      
 return promise;
};

export let getAllTests=()=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get("/examtestpaper/get").then(resp => {
   resolve({testList:resp.data});
  }).catch(error =>{
   console.log('Error while reterving test list.');
   reject({message:'Error while reterving test list!'});
  });
 });
 return promise;
};

export let getTestById = (id)=>{    
 let promise = new Promise((resolve,reject)=>{
  instance.get("/examtestpaper/get/"+id).then(resp => {
   resolve({test:resp.data});
  }).catch(error =>{
   console.log('Error while reterving test.',error);
   reject({message:'Error while reterving test!'});
  });
 });
 return promise;

};

export let getTestsBySubject = (subjectId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/examtestpaper/get/subject/"+subjectId).then(resp => {
   resolve({testList:resp.data});
  }).catch(error =>{
   console.log('Error while reterving test by subject .'+subjectId);
   reject({message:'Error while reterving test!'});
  });
 });
 return promise;
};

export let getTestsByChapter = (chapterId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/examtestpaper/get/chapter/"+chapterId).then(resp => {
   resolve({testList:resp.data});
  }).catch(error =>{
   console.log('Error while reterving test by chapter .'+chapterId);
   reject({message:'Error while reterving test!'});
  });  
 });
 return promise;
};
