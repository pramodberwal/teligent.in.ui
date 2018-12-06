import * as _ from 'lodash';
import {SERVICE_BASE_URL} from '../constants/system-constant';
import {getHttpInstance} from './httputil';
let instance = getHttpInstance(SERVICE_BASE_URL);

export let getTagsForResource = (resourceName ) =>{
 let promise = new Promise((resolve, reject)=>{
  instance.get('/tag/'+resourceName)
   .then(resp =>{       
    resolve({tags:resp.data});
   })
   .catch(error =>{
    console.log(error);
    reject({tamessagegs:'Error while geting tags!'});
   });
 });

 return promise;
};