import { getSubjectById } from "../../../services/ref-data/subject";
import { getTestSeriseBySubject } from "../../../services/test-series";
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
 getTestSeriseBySubject(props.subjectId)
  .then(data =>{
   component.setState({testSeriesList:data.testSeriesList});
  }).catch(data=>{
   component.setState({testSeriesList:[]});
  });
};

export let componentWillMountHelper =(component)=>{
 getSubjectById(component.props.subjectId)
  .then(data =>{
   component.setState({subject:data.subject});
  }).catch(data=>{
   component.setState({subject:''});
  });

 getTestSeriseBySubject(component.props.subjectId)
  .then(data =>{
   component.setState({testSeriesList:data.testSeriesList});
  }).catch(data=>{
   component.setState({testSeriesList:[]});
  });
};