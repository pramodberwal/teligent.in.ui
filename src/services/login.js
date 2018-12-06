import * as _ from 'lodash';
import * as $ from 'jquery';
import {getHttpInstance} from '../services/httputil';
import {ACCOUNT_SERVICE_BASE_URL} from '../constants/system-constant';

let csrfToken = '';
let userSession='';
let http = getHttpInstance(ACCOUNT_SERVICE_BASE_URL);

export let getUserSession =()=>{
 if(!userSession){
  userSession = $.cookie('userSession');
  if(userSession){
   userSession = JSON.parse(userSession);      
  } 
 }
 return userSession;
};

export let doLogout =()=>{ 
 let promise = new Promise((resolve, reject) =>{ 
  http.get('/user/logout')
   .then(resp =>{
    userSession='';
    $.cookie('userSession',userSession,
     {path:'/',
     // domain:'localhost',
      expires:0,
      secure:false}
    );
    resolve({message:'Logout success!'}); 
   })
   .catch(error =>{
    console.log('Error while logout!');
    reject({message:error.error +',' +error.message});
   });
 });
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

export let doUserSignup = (user)=>{
 let promise = new Promise((resolve, reject) =>{
  http.post('/user/signup'
   ,JSON.stringify({user:user})
   ,{headers:{[csrfToken.headerName]:csrfToken.token}}
  )
   .then(resp =>{   
    resolve({message:'User registred successfully!'});  
   })
   .catch(error =>{
    console.log('Error while registring user... ',error);
    let message = error.message;
    if(error.response && error.response.data &&Array.isArray(error.response.data.errors)){
     message = error.response.data.errors[0].errorMessage;
    }
    reject({message:message});
   });
 });
 return promise;
};

export let doLogin = (username, password)=>{
 let promise = new Promise((resolve, reject) =>{
  http.post('/user/login'
   ,{username:username,password:password}
   ,{headers:{[csrfToken.headerName]:csrfToken.token}}
  )
   .then(resp =>{   
    userSession = resp.data;
    console.log('userSession data ',userSession);
    $.cookie('userSession',JSON.stringify(userSession),
     {
      path:'/',
      //  domain:'localhost',
      secure:false
     }
    );
    if($.cookie('userSession')){
     userSession =JSON.parse($.cookie('userSession'));
    }
    resolve({userSession:userSession});
   })
   .catch(error =>{
    console.log('Error while loging... ',error);
    let message = error.message;
    if(error.response && error.response.data){
     message = error.response.data;
    }
    reject({message:message});
   });
 });
 return promise;
};

let receiveFromPlatform = (event)=>{
 
 // var t=window.location.protocol+"//"+config.platform.notification.domain;
//e.origin===t && n.onSocialConnected(e.data.data,e.data.source,e.data.authToken)
};
export let doFacebookLogin = ()=>{
 let promise = new Promise((resolve, reject) =>{ 
  window.addEventListener("message",receiveFromPlatform,!1);
  var n="toolbar=no, scrollbars=no, resizable=no, top=200, left=500, width=400, height=400"; 
  window.open('//localhost:8080/accounts/login/facebook','_blank',n);  
  /* http.get('/login/facebook')
   .then(resp =>{
    console.log('Facebook login successfull!!!',resp);
   })
   .catch(error =>{
    console.log('Facebook login error!!!',error);
   }); */
 });
 return promise;
};

export let doGoogleLogin = ()=>{
 let promise = new Promise((resolve, reject) =>{
 
 });
 return promise;
};