
import * as _ from 'lodash';

import {SERVICE_BASE_URL} from '../../constants/system-constant';
import {getHttpInstance} from '../httputil';
let instance = getHttpInstance(SERVICE_BASE_URL);

export let saveChapter = (chapter)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/chapter/save",JSON.stringify(chapter)).then(resp =>{ 
   chapter = resp.data; 
   resolve({message:'Chapter saved successfully! chapter id '+chapter.id, chapter:chapter});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while saving chapter!'});
  });
 });
 return promise;
};

export let deleteChapter = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.delete("/chapter/delete/"+id).then(resp=>{
   resolve({message:'Chapter deleted success! Chapter Id '+id});   
  }).catch(error =>{
   if(error.response && Array.isArray(error.response.data.errors)){
    reject({message:error.response.data.errors[0].errorMessage});
   }else{
    reject({message:'Error: Looks like the service is taking too long to process the request.'});
   }   
  });
 });
 return promise;
};

export let getAllChapters=()=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/chapter/get").then(resp=>{   
   resolve({chapters:resp.data});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all chapters!'});
  });
 }); 
 return promise;
};

export let getChapterById = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  
  instance.get("/chapter/get/"+id).then(resp=>{  
   resolve({chapter:resp.data});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching chapter!'});
  });
  
 });              
 return promise;
};

export let getChaptersBySubject=(subjectId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/chapter/getBySubjectId/"+subjectId).then(resp=>{  
   resolve({chapters:resp.data});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all chapters by subject!'});
  });  
 
 });  
 return promise;
};





