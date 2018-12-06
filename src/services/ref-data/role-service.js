import * as _ from 'lodash';
import {getHttpInstance} from '../../services/httputil';
import {SERVICE_BASE_URL} from '../../constants/system-constant';
let http = getHttpInstance(SERVICE_BASE_URL);

let ROLES = [];
export let getRoleById = (id)=>{
 let promise = new Promise((resolve, reject)=>{
  http.get("/role/get/"+id).then(resp =>{
   resolve({role:resp.data });
  }).catch(error =>{
   console.log('Error ->',error);
   reject({message:'Error while getting role!'});
  });
 });
      
 return promise;
};

export let getRoles = ()=>{
 let promise = new Promise((resolve, reject)=>{
  http.get("/role/get").then(resp =>{ 
   ROLES =  resp.data;
   resolve({roles:resp.data });
  }).catch(error =>{
   console.log('Error ->',error);
   reject({message:'Error while getting roles!'});
  });
 });

 return promise;
};