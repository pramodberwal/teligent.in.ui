
import * as _ from 'lodash';

import {SERVICE_BASE_URL} from '../../constants/system-constant';
import {getHttpInstance} from '../httputil';
let instance = getHttpInstance(SERVICE_BASE_URL);


let TOPIC_STORE = [];
let CHAPTER_TOPIC_MAP_STORE = [];
export let saveTopic = (topic)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/topic/save",JSON.stringify(topic)).then(resp =>{ 
   topic = resp.data;
   resolve({message:'Topic saved successfully! topic id '+topic.id, topic:topic});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while saving topic!'});
  });
 });
 return promise;
};

export let deleteTopic = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.delete("/topic/delete/"+id).then(resp=>{
   _.remove(TOPIC_STORE, topic => Number(topic.id) === Number(id));   
   resolve({message:'Topic deleted success! Topic Id '+id});   
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

export let getAllTopics=()=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/topic/get").then(resp=>{
   TOPIC_STORE = resp.data;
   resolve({topics:TOPIC_STORE});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all topics!'});
  });
 }); 
 return promise;
};

export let getTopicById = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  let topic = _.find(TOPIC_STORE, topic => Number(topic.id) === Number(id));
  if(!topic){
   instance.get("/topic/get/"+id).then(resp=>{
    _.add(TOPIC_STORE,resp.data);
    resolve({topic:resp.data});
   }).catch(error =>{
    console.log(error);
    reject({message:'Error while fetching all topics!'});
   });
  }else{
   resolve({topic:topic});
  }
 });              
 return promise;
};

export let getTopicsByChapter=(chapterId)=>{
 let promise = new Promise((resolve,reject)=>{
  let topics = CHAPTER_TOPIC_MAP_STORE[chapterId];
  if(!topics){
   instance.get("/topic/getByChapterId/"+chapterId).then(resp=>{  
    CHAPTER_TOPIC_MAP_STORE[chapterId] =  resp.data; 
    resolve({topics:resp.data});
   }).catch(error =>{
    console.log(error);
    reject({message:'Error while fetching all topics!'});
   });  
  }else{
   resolve({topics:topics});
  }
 });  
 return promise;
};





