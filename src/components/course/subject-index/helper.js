import * as _ from 'lodash';
import { getSubjectByCourse } from "../../../services/ref-data/subject";
import { getChaptersBySubject } from "../../../services/ref-data/chapter";

export let loadData=(props,component)=>{
  
 getSubjectByCourse(props.courseId)
  .then(
   data =>{ 
    component.setState({subjects:data.subjects});
    component.onSubjectExpandClick(null,props.subjectId);
   });
};

export let loadChapters = (subjectId, component)=>{
 let subjects = component.state.subjects;
 let subject = _.find(subjects, s => Number(s.id) === Number(subjectId)); 
 if(!subject) return;

 getChaptersBySubject(subjectId)
  .then(data =>{ 
   let isSubjectCollapse = component.state.isSubjectCollapse;
   if(isSubjectCollapse[subjectId]){
    isSubjectCollapse[subjectId] = !isSubjectCollapse[subjectId];
   }else{
    isSubjectCollapse[subjectId] = true;
   }
   subject.chapters =  data.chapters;
   component.setState(
    {
     isSubjectCollapse:isSubjectCollapse,
     subjects:subjects,
    }        
   );
  }); 

};