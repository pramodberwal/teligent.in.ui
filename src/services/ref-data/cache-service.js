
import {SERVICE_BASE_URL} from '../../constants/system-constant';
import {getHttpInstance} from '../httputil';

let instance = getHttpInstance(SERVICE_BASE_URL);

export let getAllCaches =()=>{
 let promise = new Promise((resolve,reject) =>{
  instance.get("/cache/get")
   .then(resp =>{    
    resolve({caches:resp.data});
   })
   .catch(error =>{
    reject({message:error.message});
   });
 });

 return promise;

};

export let clearCache =(cacheName)=>{
 let promise = new Promise((resolve,reject) =>{
  instance.get("/cache/"+cacheName+"/clear")
   .then(resp =>{
    resolve({message:resp.data});
   })
   .catch(error =>{
    reject({message:error.message});
   });
 });
   
 return promise;
   
};
