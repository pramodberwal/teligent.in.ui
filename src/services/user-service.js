import * as _ from 'lodash';
import {ACCOUNT_SERVICE_BASE_URL} from '../constants/system-constant';
import {getHttpInstance} from '../services/httputil';

let http = getHttpInstance(ACCOUNT_SERVICE_BASE_URL);

let USER_STORE = [];
let csrfToken = '';
export let getAllUser = ()=>{
 let promise = new Promise((resolve,reject)=>{
  try{ 
   http.get('/user/get')
    .then(resp =>{
     if(resp.data.indexOf('Login Page') > -1){
      resolve({login:true});
      return;
     }
     USER_STORE = resp.data;
     resolve({users:USER_STORE});
    })
    .catch(error =>{
     console.log('Error while fetching users!', error);
     reject({message:'Error while fetching user!'});
    });  
  }catch(error){
   reject({message:error});
  }
 }
 );
 return promise;
};

export let getCsrfToken = ()=>{
 http.get('/user/get')
  .then(tokenResp =>{
   csrfToken=tokenResp.data;
  })
  .catch(error =>{
   console.log('Error while getting csrf token!');
  });
};

export let getUserById =(id) =>{
 let promise = new Promise((resolve,reject)=>{
  try{
   http.get('/user/get/'+id)
    .then(resp =>{
     csrfToken=resp.data.csrfToken;
     resolve({user:resp.data.user});
    })
    .catch(error =>{
     console.log('Error:', error);
     if(error.response && Array.isArray(error.response.data.errors)){
      reject({message:error.response.data.errors[0].errorMessage});
     }else{
      reject({message:'Error: Looks like the service is taking too long to process the request.'});
     } 
    });   
  }catch(error){
   reject({message:error});
  }
 }
 );
 return promise;
};

export let saveUser =(user) =>{
 let promise = new Promise((resolve,reject)=>{  
  http.post('/user/save',{user:user}
   ,{headers:{[csrfToken.headerName]:csrfToken.token}})
   .then(resp =>{
    resolve({message:'User saved successfully!',user:resp.data});
   })
   .catch(error =>{
    reject({message:error.message});
   });
 }
 );

 return promise;
};

export let deleteUser =(id) =>{
 let promise = new Promise((resolve,reject)=>{
  try{
   let index = _.findIndex(USER_STORE,u=>Number(u.id)===Number(id));
   if(index > -1){ 
    _.remove(USER_STORE, u => Number(u.id) === Number(id));
    resolve({message:'User deleted successfully!'});
   }else{
    reject({message:'User not found!'});
   }   
  }catch(error){
   reject({message:error});
  }
 }
 );
 return promise;
};
