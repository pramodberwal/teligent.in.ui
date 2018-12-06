import * as _ from 'lodash';
import {SERVICE_BASE_URL} from '../constants/system-constant';
import {getHttpInstance} from './httputil';
let instance = getHttpInstance(SERVICE_BASE_URL);

export let savePreviousYearPaper = (previousYearPaper,files)=>{
 let promise = new Promise((resolve, reject)=>{
  previousYearPaper.resourceType='previous_year_paper';
  instance.post('/studymaterial/save',previousYearPaper)
   .then(resp =>{
    previousYearPaper = resp.data;
    let formData = new FormData();   
    formData.append('studyMatrialId',resp.data.id);
    formData.append('file',files.files[0]);
    instance.post('/studymaterial/upload',formData)
     .then(fileResp =>{
      resolve({previousYearPaper:previousYearPaper});
     })
     .catch(error =>{
      console.log('Error while uploading parper ',error);
      reject({message:'Error while saving previous year paper.'});
     });
    
   })
   .catch(error =>{
    console.log('Error while saving previous year paper ',error);
    reject({message:'Error while saving previous year paper.'});
   });
 });

 return promise;
};

export let saveRecommendedBook = (recommendedBook, files)=>{
 let promise = new Promise((resolve, reject)=>{
  recommendedBook.resourceType='recommended_book';
  instance.post('/studymaterial/save',recommendedBook)
   .then(resp =>{
    recommendedBook = resp.data;     
    let formData = new FormData();   
    formData.append('studyMatrialId',resp.data.id);
    formData.append('file',files.files[0]);
    console.log('Uploading eBook...');
    instance.post('/studymaterial/upload',formData)
     .then(fileResp =>{
      resolve({recommendedBook:recommendedBook});
     })
     .catch(error =>{
      console.log('Error while uploading parper ',error);
      reject({message:'Error while saving previous year paper.'});
     });
   })
   .catch(error =>{
    console.log('Error while saving recommended ',error);
    reject({message:'Error while saving recommended'});
   });
 });
      
 return promise;
};

export let saveHandWrittenNote = (handWrittenNode, files)=>{
 let promise = new Promise((resolve, reject)=>{
  handWrittenNode.resourceType='hand_written_note';
  instance.post('/studymaterial/save',handWrittenNode)
   .then(resp =>{
    let formData = new FormData();   
    formData.append('studyMatrialId',resp.data.id);
    formData.append('file',files.files[0]);
    instance.post('/studymaterial/upload',formData)
     .then(fileResp =>{      
      resolve({handWrittenNode:resp.data});
     })
     .catch(error =>{
      console.log('Error while uploading hand written note ',error);
      reject({message:'Error while uploading hand written note'});
     });          
   })
   .catch(error =>{
    console.log('Error while saving hand written note ',error);
    reject({message:'Error while uploading hand written note'});
   });
 });
      
 return promise;
};

export let deleteStudyMatrial = (id)=>{
 let promise = new Promise((resolve, reject)=>{
  instance.delete('/studymaterial/delete/'+id)
   .then(resp =>{
    resolve({message:'Message'});
   })
   .catch(error =>{
    reject({message:'Message'});
   });

 });

 return promise;
};

export let getPreviousYearPapers =()=>{

 let promise = new Promise((resolve, reject)=>{
  instance.get('/studymaterial/previous_year_paper/get')
   .then(resp =>{
    resolve({previousYearPapers:resp.data});
   })
   .catch(error =>{
    reject({message:error});
   });
 });
 return promise;

 
};

export let getAllRecommendedBooks =()=>{
 let promise = new Promise((resolve, reject)=>{
  instance.get('/studymaterial/recommended_book/get')
   .then(resp =>{
    resolve({recommendedBooks:resp.data});
   })
   .catch(error =>{
    reject({message:error});
   });
 });
 return promise;
      
};

export let getAllHandWrittenNotes =()=>{
//hand_written_note
 let promise = new Promise((resolve, reject)=>{
  instance.get('/studymaterial/hand_written_note/get')
   .then(resp =>{
    resolve({handWrittenNotes:resp.data});
   })
   .catch(error =>{
    reject({message:error});
   });
 });
 return promise;
};