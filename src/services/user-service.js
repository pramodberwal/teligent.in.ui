import * as _ from 'lodash';
import {ACCOUNT_SERVICE_BASE_URL} from '../constants/system-constant';
import {getHttpInstance} from '../services/httputil';

let http = getHttpInstance(ACCOUNT_SERVICE_BASE_URL);

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
     resolve({users:resp.data});
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
 http.get('/user/login')
  .then(tokenResp =>{
   csrfToken=tokenResp.data;
  })
  .catch(error =>{
   console.log('Error while getting csrf token!');
  });
};

export let passwordResetRequest = (username)=>{
 let promise = new Promise((resolve,reject)=>{
   console.log('Request password reset for ',username);
  http.get('/user/password/reset/request',JSON.stringify({username:username}))
   .then(resp =>{
    resolve({message:'Password reset request generated with request id ='+resp.data});
   })
   .catch(error =>{
    reject({message:'Error while changeing password'});
   });
 });
 return promise;
};

export let passwordChange  =(currentPassword, newPassword)=>{
 let promise = new Promise((resolve,reject)=>{

  http.post('/user/password/change',JSON.stringify({currentPassword:currentPassword,newPassword:newPassword}),
   {headers:{[csrfToken.headerName]:csrfToken.token}})
   .then(reps =>{
    resolve({message:'Password change successfully!'});
   })
   .catch(error =>{
    reject({message:'Error while changeing password'});
   });
 });
 return promise;
};

export let passwordReset = (username,id)=>{
 let promise = new Promise((resolve,reject)=>{
  http.post('/user/password/reset',{username:username},{headers:{[csrfToken.headerName]:csrfToken.token}})
   .then(resp =>{
    getUserById(id)
     .then(userResp =>{      
      resolve({user:userResp.user,message:'Password reset success, new password = '+resp.data.user.password});
     })
     .catch(error =>{
      reject({message:'Error while resetting the password!'});
     });   
   })
   .catch(error =>{
    console.log(error);
    reject({message:'Error while resetting the password!'});
   });
 });
 return promise;
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
   resolve({message:'This operation is not supported!'});  
  }catch(error){
   reject({message:error});
  }
 }
 );
 return promise;
};
