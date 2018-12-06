
import * as _ from 'lodash';

import {SERVICE_BASE_URL} from '../../constants/system-constant';
import {getHttpInstance} from '../httputil';
let instance = getHttpInstance(SERVICE_BASE_URL);

let SUBJECT_STORE = [];

export let saveSubject = (subject)=>{ 
  
 let promise = new Promise((resolve,reject)=>{     
  instance.post("/subject/save",JSON.stringify(subject)).then(subjectResp =>{
   subject=subjectResp.data; 
   resolve({message:'Subject saved successfully with id '+subject.id,subject:subject});  
  }).catch(resp =>{
   reject({message:'Error while saving subject!'});
  });  
 } 
 );
 return promise;
};

export let deleteSubject = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.delete("/subject/delete/"+id).then(resp=>{
   _.remove(SUBJECT_STORE, subject => Number(subject.id) === Number(id)); 
   resolve({message:'Subject deleted successfully ! subject id '+id}); 
  }).catch(error =>{  
   console.log('Error while deleting subject.',error);    
   if(error.response && Array.isArray(error.response.data.errors)){
    reject({message:error.response.data.errors[0].errorMessage});
   }else{
    reject({message:'Error: Looks like the service is taking too long to process the request.'});
   }   
  });
 });
 return promise;
};

export let getAllSubjects=()=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/subject/get").then(resp=>{
   SUBJECT_STORE=resp.data;   
   resolve({subjects:SUBJECT_STORE});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all subjects!'});
  });
 }); 
 return promise;
};

export let getSubjectById = (id)=>{  
 let promise = new Promise((resolve,reject)=>{
  instance.get("/subject/get/"+id).then(resp=>{
   resolve({subject:resp.data});
  }).catch(error =>{
   console.log('Error while fetaching subjectById',id,error);
   reject({message:'Error while fetching subject by id !',id});
  });
 });             
 return promise;
};

export let getSubjectByCourse = (courseId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/subject/getByCourseId/"+courseId).then(resp=>{
   resolve({subjects:resp.data});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all subjects by course id!',courseId});
  });
 });
 return promise;
};