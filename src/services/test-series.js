import * as _ from 'lodash';
import {SERVICE_BASE_URL} from '../constants/system-constant';
import {getHttpInstance} from './httputil';

let instance = getHttpInstance(SERVICE_BASE_URL);

export let TEST_SERIES_STORE=[{
 id:1,
 name:'TEST1',
 desc:'To test you fundamental skils, try this test',
 course:33,
 subject:25,
 chapter:13,
 instructions:[{desc:''}],
 eachQuestionMark:1,
 questions:[1]       
},
];

export let deleteTestSeriesId = (id) =>{
 let promise = new Promise((resolve,reject) =>{
  instance.delete("/testseries/delete/"+id).then(resp =>{
   _.remove(TEST_SERIES_STORE, s=>Number(s.id) === Number(id));
   resolve({message:'Test series removed!!'});
  }).catch(error =>{
   console.log('Error while deleting test series ',error);
   reject({message:'Error while deleting testseries!'});
  });
 });
 return promise; 
};

export let getHighestScore =(seriesId)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get('/testseries/'+seriesId+'/attempt/highestscore').then(resp =>{
   resolve({highestScore:resp.data});
  }).catch(error =>{
   console.log('Error while reterving highest score for series! >' , seriesId,error);
   reject({message:'Error while reterving highest score for series!'});
  });  
 });
 return promise;
};
export let startTestAttempt = (seriesId)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get('/testseries/'+seriesId+'/attempt/start').then(resp =>{     
   resolve({message:'Test attempt started successsfully with id = '+resp.data.id,testAttempt:resp.data});
  }).catch(error =>{
   console.log('Error while saving testseries! >' , error);
   reject({message:'Error while saving testseries!'});
  });  
 });
 return promise;
};


export let saveTestAttempt = (testAttempt)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/testseries/attempt/save",JSON.stringify(testAttempt)).then(resp =>{     
   resolve({message:'Test attempt saved successsfully with id = '+resp.data.id,testAttempt:resp.data});
  }).catch(error =>{
   console.log('Error while saving test result >' , error);
   reject({message:'Error while saving testseries result!'});
  });  
 });
 return promise;
};

export let saveTestSerise = (testseries)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/testseries/save",JSON.stringify(testseries)).then(resp =>{     
   resolve({message:'Testseries saved successsfully saved with id = '+resp.data.id,testseries:resp.data});
  }).catch(error =>{
   console.log('Error while saving testseries! >' , error);
   reject({message:'Error while saving testseries!'});
  });  
 });
 return promise;
};

export let addQuestionToTestSeries = (id,questionId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.post("/testseries/question/add/"+id+"/"+questionId,{}).then(resp =>{     
   resolve({message:'Question add successfully!'});
  }).catch(error =>{
   console.log('Error while saving testseries! >' , error);
   reject({message:'Error while adding question to testseries!'});
  });
 });

 return promise;
};

export let removeQuestionFromTestSeries = (id,questionId)=>{
 let promise = new Promise((resolve,reject)=>{     
  instance.post("/testseries/question/remove/"+id+"/"+questionId,{})
   .then(resp =>{     
    resolve({message:'Question removed successfully!', testSeries:resp.data});
   }).catch(error =>{
    console.log('Error while removing question from testseries! >' , error);
    reject({message:'Error while removing question from testseries!'});
   });
  
 });
      
 return promise;

 
};

export let getAllTestSeries=()=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get("/testseries/get").then(resp => {
   resolve({testSeriesList:resp.data});
  }).catch(error =>{
   console.log('Error while reterving test series list.');
   reject({message:'Error while reterving test series list!'});
  });
 });
 return promise;
};

export let getTestSeriseById = (id)=>{    
 let promise = new Promise((resolve,reject)=>{
  instance.get("/testseries/get/"+id).then(resp => {
   resolve({testSeries:resp.data});
  }).catch(error =>{
   console.log('Error while reterving test series.',error);
   reject({message:'Error while reterving test series!'});
  });
 });
 return promise;

};

export let getTestSeriseByName = (name)=>{
    
 let index = TEST_SERIES_STORE.findIndex(series =>series.name === name); 
 return TEST_SERIES_STORE[index];
};
export let getTestSeriseBySubject = (subjectId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/testseries/get/subject/"+subjectId).then(resp => {
   resolve({testSeriesList:resp.data});
  }).catch(error =>{
   console.log('Error while reterving test series by subject .'+subjectId);
   reject({message:'Error while reterving test series!'});
  });
 });
 return promise;
};

export let getTestSeriseByChapter = (chapterId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/testseries/get/chapter/"+chapterId).then(resp => {
   resolve({testSeriesList:resp.data});
  }).catch(error =>{
   console.log('Error while reterving test series by chapter .'+chapterId);
   reject({message:'Error while reterving test series!'});
  });  
 });
 return promise;
};

export let getTestSeriseByCourse = (course)=>{
 let index = TEST_SERIES_STORE.findIndex(series =>series.course === course); 
 return TEST_SERIES_STORE[index];
};
export let getAllQuestions = (seriesCode)=>{
 let index = TEST_SERIES_STORE.findIndex(series =>series.code === seriesCode); 
 return TEST_SERIES_STORE[index].questions;
};