import * as _ from 'lodash';
import {COMPLEXITY_LEVELS} from '../../constants/system-constant';


/* 
This function will filter out question based on filters
*/
export let applyFilters = (questions, filters)=>{
 let filteredQuestions = questions;
 if(filters.idFilter){
  filteredQuestions = _.filter(questions, (question)=>{
   return (Number(filters.idFilter) === Number(question.id));
  } );
 }
 if(filters.classFilter){
  filteredQuestions = _.filter(filteredQuestions, (question)=>{
   return (question.course.toLowerCase().indexOf(filters.classFilter.toLowerCase()) > -1);
  });
 }
   
   
 if(filters.subjectFilter){
  filteredQuestions = _.filter(filteredQuestions, (question)=>{
   return (question.subject.toLowerCase().indexOf(filters.subjectFilter.toLowerCase()) > -1);
  });
 }
    
 if(filters.descFilter){
  filteredQuestions = _.filter(filteredQuestions, (question)=>{
   return (question.desc.toLowerCase().indexOf(filters.descFilter.toLowerCase()) > -1);
  });
 }
 return filteredQuestions;
};

export let getComplexityLevel = (id)=>{
 let level = _.find(COMPLEXITY_LEVELS, c => Number(c.id) === Number(id));
 return level? level.name :'N/A';
};