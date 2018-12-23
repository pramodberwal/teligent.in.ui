import { getSubjectById } from "../../../services/ref-data/subject";
import { getTestBySubject } from "../../../services/exam-test";
import {getResources} from '../../../services/ref-data/resource';


export let loadData =(props,component)=>{ 
 if(!props.subjectId ){
  return;
 }

 getSubjectById(props.subjectId)
  .then(data =>{
   component.setState({subject:data.subject});
  }).catch(data=>{
   component.setState({subject:''});
  });
 getResources('SUBJECT',props.subjectId)
  .then(data =>{

  })
  .catch(error =>{
    
  });
 getTestBySubject(props.subjectId)
  .then(data =>{
   component.setState({testList:data.testList});
  }).catch(data=>{
   component.setState({testList:[]});
  });
};

export let componentWillMountHelper =(component)=>{
 getSubjectById(component.props.subjectId)
  .then(data =>{
   component.setState({subject:data.subject});
  }).catch(data=>{
   component.setState({subject:''});
  });

 getTestBySubject(component.props.subjectId)
  .then(data =>{
   component.setState({testList:data.testList});
  }).catch(data=>{
   component.setState({testList:[]});
  });
};