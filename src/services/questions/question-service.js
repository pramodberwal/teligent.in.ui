import * as _ from 'lodash';
import axios from 'axios';
import {SERVICE_BASE_URL} from '../../constants/system-constant';
import {getHttpInstance} from '../httputil';
import {defaultQuestion} from './initial-value';
let QUESTION_STORE = [];
let QUESTION_CHOICES =[];
let instance = getHttpInstance(SERVICE_BASE_URL);
export let getAllChoices = () =>{
 let promise = new Promise((resolve,reject)=>{
  instance.get('/questiontype/get')
   .then(resp =>{
    resolve({choices:resp.data});
   })
   .catch(error =>{
    console.log(error);
    reject({message:'Error while getting question choices!'});
   });
 });
 return promise;
};

export let getChoiceName = (typeId) =>{
 let promise = new Promise((resolve,reject)=>{
  let choice = _.find(QUESTION_CHOICES , choice => Number(typeId) === Number(choice.id));
  if( !choice){
   instance.get('/questiontype/get/'+typeId)
    .then(resp =>{        
     resolve({name:resp.data.name});
    })
    .catch(error =>{
     console.log(error);
     reject({message:'Error while getting question type!'});
    });
  }else{
   resolve({name:choice.name});
  }   
 });
 return promise;
};

export let getAllFiltred =(filter, pageNumber) =>{
 let promise = new Promise((resolve,reject)=>{
  if(Number.isNaN(Number(pageNumber))){
   pageNumber = 0;
  }

  instance.post("/question/filter?page="+pageNumber, JSON.stringify(filter) )
   .then(resp =>{
   
    QUESTION_STORE = resp.data.content;
    let pagable=resp.data.pageable;
    pagable.totalPages = resp.data.totalPages;
    pagable.isLast = resp.data.last;
    pagable.isFirst = resp.data.first;
    pagable.size = resp.data.size;
    pagable.totalElements = resp.data.totalElements; 
    if(Array.isArray(QUESTION_STORE) && QUESTION_STORE.length === 0){
     QUESTION_STORE.push(defaultQuestion);
    }
    resolve({questions:QUESTION_STORE,pagable:pagable});

   })
   .catch(error =>{
    console.log(error);
    let message = error && error.response && error.response.data ? JSON.stringify(error.response.data):JSON.stringify(error.response);
    reject({message:'Error while fetching all filtered question!'+message});
   });

 });
 return promise;
};

export let getAll = (pageNumber)=>{
 let promise = new Promise((resolve,reject)=>{
  if(Number.isNaN(Number(pageNumber))){
   pageNumber = 0;
  }
  instance.get("/question/get?page="+pageNumber).then(resp=>{
   QUESTION_STORE = resp.data.content;
   let pagable=resp.data.pageable;
   pagable.totalPages = resp.data.totalPages;
   pagable.isLast = resp.data.last;
   pagable.isFirst = resp.data.first;
   pagable.size = resp.data.size;
   pagable.totalElements = resp.data.totalElements;   
   if(Array.isArray(QUESTION_STORE) && QUESTION_STORE.length === 0){
    QUESTION_STORE.push(defaultQuestion);
   }
   resolve({questions:QUESTION_STORE,pagable:pagable});
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while fetching all question!'});
  });
 });

 return promise;
};

export let  saveQuestion = (question)=>{
 let promise = new Promise((resolve,reject)=>{ 
  instance.post("/question/save",JSON.stringify(question)).then(resp=>{
   let savedQuestion = resp.data;
   let index =_.findIndex(QUESTION_STORE, q => (Number(q.id) === Number(savedQuestion.id) ) );
   QUESTION_STORE[index] = savedQuestion;
   resolve({message:'Question saved, question id = '+savedQuestion.id,question:savedQuestion});      
  }).catch(error =>{
   console.log(error);
   reject({message:'Error while saving question!' });
  });
 });    
 return promise; 
};

export let deleteQuestion = (questionId)=>{
 let promise = new Promise((resolve,reject)=>{
  instance.delete("/question/delete/"+questionId)
   .then(resp=>{
    resolve({message:'Question deleted successfully!'});
   })
   .catch(error =>{
    reject({message:'Error while deleting question.'});
   });
  resolve({message:'Question deleted successfully!'});
 });
 return promise;
};

export let getAnswer = (questionId) =>{
 let promise = new Promise((resolve,reject)=>{ 
  instance.get("/question/answer/get/"+questionId)
   .then(resp =>{
    resolve({answerKey:resp.data});
   })
   .catch(error =>{
    reject({message:'Error while geting answer for question '+questionId});
   });


 });
 return promise;
};
export let getQuestionById = (questionId)=>{  
 let promise = new Promise((resolve,reject)=>{  
  let question = _.find(QUESTION_STORE,q => Number(q.id) === Number(questionId));
  if(!question){
   instance.get("/question/get/"+questionId).then(resp=>{
    question = resp.data; 
    QUESTION_STORE.push(question);    
    resolve({question:question});
   }).catch(error =>{
    console.log(error);
    reject({message:'Error while fetching question detail!'});
   });
  }else{
   resolve({question:question});
  }
 });
 return promise;
};
export let getQuestionForSubject = (subjectId)=>{
 let promise = new Promise((resolve,reject)=>{
  
 });
 return promise;
};