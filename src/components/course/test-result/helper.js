import * as _ from 'lodash';
import {getTestById} from '../../../services/exam-test';
import {getHighestScore} from '../../../services/exam-test';

export let loadData = (props,component)=>{
 let testAttempt = props.location.state.testAttempt; 
 let test = props.location.state.test; 
 
 if(!testAttempt || !test){
  component.setState({isError:true, message:'Error while reterving the result.'});
  return;
 } 
 if(test && Array.isArray(test.questions)){
  let {correctCount,wrongCount,} = checkAttemptAnswers(testAttempt);
  getHighestScore(props.testId)
   .then( data =>{
    component.setState({test:test,
     wrongCount:wrongCount,
     score:testAttempt.score,
     notAttempted:(test.questions.length - (wrongCount + correctCount)),
     correctCount:correctCount,
     highestScore:data.highestScore,
     testAttempt:testAttempt});
   })
   .catch(error =>{
    console.log('Error while getting highest score for the test.');
    component.setState({isError:true, message:'Error while getting highest score for the test.'});
   });
 }  
};

function checkAttemptAnswers(testAttempts){
 let attemptAnswers = testAttempts.attemptAnswers;
 let correctCount = 0;
 let wrongCount = 0;
 _.forEach(attemptAnswers,answer => {
  if(answer.isCorrect){
   correctCount +=1;
  }else{
   wrongCount +=1;
  }
 }); 
 return {correctCount:correctCount,wrongCount:wrongCount};
}
