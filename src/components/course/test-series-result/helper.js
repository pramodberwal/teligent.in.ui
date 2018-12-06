import * as _ from 'lodash';
import {getTestSeriseById} from '../../../services/test-series';
import {getHighestScore} from '../../../services/test-series';

export let loadData = (props,component)=>{
 let testAttempt = props.location.state.testAttempt; 
 let testSeries = props.location.state.testSeries; 
 
 if(!testAttempt || !testSeries){
  component.setState({isError:true, message:'Error while reterving the result.'});
  return;
 } 
 if(testSeries && Array.isArray(testSeries.questions)){
  let {correctCount,wrongCount,} = checkAttemptAnswers(testAttempt);
  getHighestScore(props.testSeriesId)
   .then( data =>{
    component.setState({testSeries:testSeries,
     wrongCount:wrongCount,
     score:testAttempt.score,
     notAttempted:(testSeries.questions.length - (wrongCount + correctCount)),
     correctCount:correctCount,
     highestScore:data.highestScore,
     testAttempt:testAttempt});
   })
   .catch(error =>{
    console.log('Error while getting highest score for the series.');
    component.setState({isError:true, message:'Error while getting highest score for the series.'});
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
