
import * as _ from 'lodash';
import {SERVICE_BASE_URL} from '../../constants/system-constant';
import {getHttpInstance} from '../httputil';
let COURSE_STORE = [];

let instance = getHttpInstance(SERVICE_BASE_URL);

export let saveCourse = (course)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/course/save",JSON.stringify(course)).then(resp =>{  
   _.remove(COURSE_STORE,course =>Number(course.id) === Number(resp.data.id));
   COURSE_STORE.push(resp.data);
   resolve({message:'Course saved successfully! with id '+course.id, course:course });
  }).catch(resp =>{
   reject({message:'Error while saving course!'});
  });
 });
 return promise;
};

export let deleteCourse = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.delete("/course/delete/"+id).then(resp=>{
   _.remove(COURSE_STORE,course =>Number(course.id) === Number(id));
   resolve({message:'Course deleted successfully! with id '+id });
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

export let getAllCourses=()=>{
 let promise = new Promise((resolve,reject)=>{
  if(COURSE_STORE.length > 0){
   resolve({courses:COURSE_STORE});
   return;
  }  
  instance.get("/course/get").then(resp=>{
   COURSE_STORE = resp.data;
   resolve({courses:COURSE_STORE});
  }).catch(error =>{
   console.log("Error while getting all courses....",error);
   reject({message:'Error while fetching all courses!'});
  });
 }); 
 return promise;
};

export let getAllPublicCourses=()=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/public/course/get").then(resp=>{
   resolve({courses:resp.data});
  }).catch(error =>{
   console.log("Error while getting all courses....",error);
   reject({message:'Error while fetching all courses!'});
  });
 }); 
 return promise;
};

export let getCourseById = (id)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.get("/course/get/"+id).then(resp=>{ 
   resolve({course:resp.data});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all courses!'});
  });
  
 });             
 return promise;
};