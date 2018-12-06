import {getUserSession} from '../services/login';

export let getUserFName = ()=>{
 let userSession = getUserSession();
 if(userSession){
  return userSession.fName;
 }
};

export let getUserFullName = ()=>{
 let userSession = getUserSession();
 if(userSession){
  return userSession.fname + ' '+userSession.lname;
 }
};

export let getUserLName = ()=>{
 let userSession = getUserSession();
 if(userSession){
  return userSession.lName;
 }
};

export let userHasRole =(role)=>{
 let userSession = getUserSession();
 let hasRole = false;
 if(userSession && userSession.authenticated && Array.isArray(userSession.userRoles)){
  userSession.userRoles.forEach(r =>{
   if(r.name === role){
    hasRole = true;
   }
  });
 }
 return hasRole;
};

export let isUserAuthenticated =()=>{
 let userSession = getUserSession();
 return userSession?userSession.authenticated:false;
};