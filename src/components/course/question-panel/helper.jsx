
import * as $ from 'jquery';
import * as CookieService from 'jquery.cookie';
import {getTestById} from '../../../services/exam-test';

export let loadTest = (props,component)=>{
 if(props.testId){
  getTestById(props.testId).then(
   data =>{
    if(data.test && data.test.questions && data.test.questions.length > 0){
     let currentQuestionIndex = Number(props.currentQuestionIndex);
     let isPreviousDisabled = true;
     let isNextDisabled = true;
     let attemptedQuestions = $.cookie(props.testId+'_attemptedQuestions');
     if(attemptedQuestions){
      attemptedQuestions = JSON.parse(attemptedQuestions);
     }else{
      attemptedQuestions={};
     }
     
     if(Number(currentQuestionIndex) < (data.test.questions.length - 1) ){
      isNextDisabled = false;
     } 
     // Reached Start of the , disable previous
     if( currentQuestionIndex > 0){
      isPreviousDisabled = false;
     }
        
     component.setState({
      test:data.test,
      currentQuestionIndex:currentQuestionIndex,
      isNextDisabled:isNextDisabled,
      isPreviousDisabled:isPreviousDisabled,
      attemptedQuestions:attemptedQuestions,
      activeQuestion:data.test.questions[currentQuestionIndex],
     });
    }else{
     component.setSate({test:data.test});
    }
   }
  ).catch(error =>{
   component.setState({isError:true,message:error.message});
  });
 }
};