import * as _ from 'lodash';
import {SERVICE_BASE_URL} from '../constants/system-constant';
import {getHttpInstance} from './httputil';

let instance = getHttpInstance(SERVICE_BASE_URL);


export let deleteExamById = (id) =>{
 let promise = new Promise((resolve,reject) =>{
  instance.delete("/mockexam/delete/"+id).then(resp =>{  
   resolve({message:'Mock Exam removed!!'});
  }).catch(error =>{
   let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
   reject({message:'Error while deleting mock Exam!'+message});
  });
 });
 return promise; 
};

export let saveMockExam = (mockExam)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.post("/mockexam/save",JSON.stringify(mockExam)).then(resp =>{     
   resolve({message:'Mock Exam saved successsfully saved with id = '+resp.data.id,mockExam:resp.data});
  }).catch(error =>{
   console.log('Error while saving mock Exam! >' , error);
   reject({message:'Error while saving mock Exam!'});
  });  
 });
 return promise;
};

export let addTestToMockExam = (ExamId,testId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.post("/mockexam/"+ExamId+"/add/test/"+testId,{}).then(resp =>{     
   resolve({message:'Test added successfully!',mockExam:resp.data});
  }).catch(error =>{
   console.log('Error while adding test to mock Exam! >' , error);
   reject({message:'Error while adding test to mock Exam!'});
  });
 });
 return promise;
};

export let removeTestFromMockTest = (ExamId,testId)=>{
 let promise = new Promise((resolve,reject)=>{     
  instance.post("/mockexam/"+ExamId+"/add/test/"+testId,{})
   .then(resp =>{     
    resolve({message:'Test removed successfully!', mockExam:resp.data});
   }).catch(error =>{
    let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
    reject({message:'Error while removing mock Exam!'+message});
   });  
 });      
 return promise;
};

export let getAllExams=()=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get("/mockexam/get").then(resp => {
   resolve({examList:resp.data});
  }).catch(error =>{
   let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
   reject({message:'Error while reterving mock Exam list!'+message});
  });
 });
 return promise;
};

export let getAllCourseFutureExames=(courseId)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get("/mockexam/course/"+courseId).then(resp => {
   resolve({examList:resp.data});
  }).catch(error =>{
   let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
   reject({message:'Error while reterving mock Exam list!'+message});  
  });
 });
 return promise;
};


export let getAllTestsByCourse=(courseId)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get("/mockexam/course/"+courseId+"/get").then(resp => {
   resolve({mockExams:resp.data});
  }).catch(error =>{
   let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
   reject({message:'Error while reterving mock Exam list!'+message});
  });
 });
 return promise;
};

export let getAllMockTestsBySubject=(subjectId)=>{ 
 let promise = new Promise((resolve,reject)=>{
  instance.get("/examtestExam/subject/mock/"+subjectId).then(resp => {
   resolve({mockTests:resp.data});
  }).catch(error =>{
   let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
   reject({message:'Error while reterving exam list!'+message}); 
  });
 });
 return promise;
};


export let getMockExamById = (id)=>{    
 let promise = new Promise((resolve,reject)=>{
  instance.get("/mockexam/get/"+id).then(resp => {
   resolve({mockExam:resp.data});
  }).catch(error =>{
   let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
   reject({message:'Error while reterving exam !'+message});  
  });
 });
 return promise;
};

export let getMockExamByIdPublic = (id)=>{    
 let promise = new Promise((resolve,reject)=>{
  instance.get("/mockexam/"+id+"/public").then(resp => {
   resolve({mockExam:resp.data});
  }).catch(error =>{
   console.log('Error while reterving exam .',error);
   let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
   reject({message:'Error while reterving exam !'+message});
  });
 });
 return promise;
};


export let startExamAttempt = (id)=>{    
 let promise = new Promise((resolve,reject)=>{
  instance.get("/mockexam/"+id+"/attempt/start").then(resp => {
   resolve({examAttempt:resp.data});
  }).catch(error =>{
   console.log('Error while starting exam .',error);
   let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
   reject({message:'Error while starting the exam! Message from server >'+message});
  });
 });
 return promise;
};

export let finishExamAttempt = (examId,examAttempt, testAttempts)=>{
 ///mockexam/{examId}/attempt/finish
 let promise = new Promise((resolve,reject)=>{
  console.log('Exam attempt>>>>',examAttempt);
  let data = {examResponse:{
   examAttempt:examAttempt,
   testAttempts:testAttempts
  }
  };
   
  console.log('Data >?', data);
  instance.post("/mockexam/"+examId+"/attempt/finish",JSON.stringify(data)).then(resp => {
   resolve({examAttempt:resp.data.examAttempt,testAttempts:resp.data.testAttempts});
  }).catch(error =>{   
   let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
   console.log('Error while finishing the exam .',message);
   reject({message:'Error while finishing the exam!'});
  });
 });
 return promise;
};
