import * as _ from 'lodash';
import axios from 'axios';
import {SERVICE_BASE_URL} from '../../constants/system-constant';
import {getHttpInstance} from '../httputil';
let instance = getHttpInstance(SERVICE_BASE_URL);

export let saveResources = (resourceName,resourceId, resource)=>{ 

 let promise = new Promise((resolve,reject)=>{  
  let formData = new FormData();
  formData.append('resourceName',resourceName);
  formData.append('resourceId',resourceId);
  formData.append('title',resource.title);
  formData.append('file',resource.file);  
  instance.post("/resources/save",formData).then(resp =>{    
   resolve({message:'Resources uploaded successfully!'});
  }).catch(resp =>{
   reject({message:'Error while uploading resources!'});
  });
 }); 
 return promise;
};

export let deleteResource = (resourceId)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.delete('resource/delete/'+resourceId)
   .then(resp =>{
    resolve({message:'Resource Removed!'});
   })
   .catch(error =>{
    reject({message:error});
   });
 }); 
 return promise;
};

export let getResources = (resourceName, resourceId)=>{
////resource/get/{name}/{id}
 let promise = new Promise((resolve,reject)=>{
  instance.get('resource/get/'+resourceName+'/'+resourceId)
   .then(resp =>{
    resolve({resources:resp.data});
   })
   .catch(error =>{
    reject({message:error});
   });
 }); 
 return promise;
};


