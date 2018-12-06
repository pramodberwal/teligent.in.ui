import * as _ from 'lodash';
import axios from 'axios';
import {SERVICE_BASE_URL} from '../constants/system-constant';
import {getHttpInstance} from './httputil';
let instance = getHttpInstance(SERVICE_BASE_URL);

export let saveStrategy = (strategy)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/strategy/save",JSON.stringify(strategy)).then(resp =>{ 
   strategy = resp.data;
   resolve({message:'Strategy saved successfully! strategy id '+strategy.id, strategy:strategy});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while saving strategy!'});
  });
 });
 return promise;
};

export let deleteStrategy = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.delete("/strategy/delete/"+id).then(resp=>{       
   resolve({message:'Strategy deleted success! Strategy Id '+id});   
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

export let getAllStrategies=()=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/strategy/get").then(resp=>{     
   resolve({strategies: resp.data});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all strategies!'});
  });
 }); 
 return promise;
};

export let getStrategyById = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/strategy/get/"+id).then(resp=>{       
   resolve({strategy:resp.data});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all strategies!'});
  });
     
 });              
 return promise;
};