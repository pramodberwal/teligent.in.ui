
import * as $ from 'jquery';
import * as CookieService from 'jquery.cookie';
import {getTestSeriseById} from '../../../services/test-series';

export let loadTestSeries = (props,component)=>{
 if(props.testSeriesId){
  getTestSeriseById(props.testSeriesId).then(
   data =>{
    if(data.testSeries && data.testSeries.questions && data.testSeries.questions.length > 0){
     let currentQuestionIndex = Number(props.currentQuestionIndex);
     let isPreviousDisabled = true;
     let isNextDisabled = true;
     let attemptedQuestions = $.cookie(props.testSeriesId+'_attemptedQuestions');
     if(attemptedQuestions){
      attemptedQuestions = JSON.parse(attemptedQuestions);
     }else{
      attemptedQuestions={};
     }
     
     if(Number(currentQuestionIndex) < (data.testSeries.questions.length - 1) ){
      isNextDisabled = false;
     } 
     // Reached Start of the series, disable previous
     if( currentQuestionIndex > 0){
      isPreviousDisabled = false;
     }
        
     component.setState({
      testSeries:data.testSeries,
      currentQuestionIndex:currentQuestionIndex,
      isNextDisabled:isNextDisabled,
      isPreviousDisabled:isPreviousDisabled,
      attemptedQuestions:attemptedQuestions,
      activeQuestion:data.testSeries.questions[currentQuestionIndex],
     });
    }else{
     component.setSate({testSeries:data.testSeries});
    }
   }
  ).catch(error =>{
   component.setState({isError:true,message:error.message});
  });
 }
};