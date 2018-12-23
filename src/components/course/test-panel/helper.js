import {getTestById} from '../../../services/exam-test';

export let loadData=(props,component)=>{
 if(props.testId){
  getTestById(props.testId)
   .then(data => {
    component.setState({test:data.test});
   })
   .catch(data=>{
    component.setState({test:''});
   });
 }
};
