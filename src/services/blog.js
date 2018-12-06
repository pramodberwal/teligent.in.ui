import * as _ from 'lodash';
import {SERVICE_BASE_URL} from '../constants/system-constant';
import {getHttpInstance} from './httputil';
let instance = getHttpInstance(SERVICE_BASE_URL);

export let saveBlog = (blog)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/blog/save",JSON.stringify(blog)).then(resp =>{ 
   blog = resp.data;
   resolve({message:'Blog saved successfully! blog id '+blog.id, blog:blog});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while saving blog!'});
  });
 });
 return promise;
};

export let deleteBlog = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.delete("/blog/delete/"+id).then(resp=>{       
   resolve({message:'Blog deleted success! Blog Id '+id});   
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

export let getAllBlogs=()=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/blog/get").then(resp=>{     
   resolve({blogs: resp.data});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all blogs!'});
  });
 }); 
 return promise;
};

export let getBlogById = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/blog/get/"+id).then(resp=>{       
   resolve({blog:resp.data});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all blogs!'});
  });
     
 });              
 return promise;
};