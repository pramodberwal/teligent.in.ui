import React from 'react';
import {loadData} from './helper';
import AttemptedQuestionsTable from './AttemptedQuestionsTable';
import './style.css';
import BarChart from './BarChart';


export default class TestResultComponent extends React.Component{
    state ={
     isError:false,
     message:'Please wait while we are calculating your test result.',
     test:{},
     testAttempt:'',
     notAttempted:0,
     correctCount:0,
     wrongCount:0,
     highestScore:0,
     score:'',
    }
    componentDidMount=()=>{    
     loadData(this.props,this); 
    }

    render(){
     let higestScoreLineColor = 'rgb(155, 99, 132)';
     let yourScoreLineColor = this.state.score> 0?'rgb(0, 255, 0 )':'rgb(255, 0, 0 )';
     let correctAnsLineColor = 'rgb(0, 255, 0 )';
     let wrongAnsLineColor = 'rgb(255, 0, 0 )';
     let NotattemptLineColor = 'rgb(155, 99, 132)';
     let scoredata = 
        {
         labels:['Score'],
         datasets:[
          {
           label: 'Your Score',      
           data:[this.state.score],
           backgroundColor: [
            yourScoreLineColor,
           ],
           datalabels: {
            align: 'end',
            anchor: 'start'
           },
          },
          {
           label: 'Highest Score',      
           data:[this.state.highestScore],
           backgroundColor: [
            higestScoreLineColor,
           ]
          },
         ]       
        }; 

     let responsedata = 
        {
         labels:['Response'],
         datasets:[
          {
           label: 'Correct Answers',      
           data:[this.state.correctCount],
           backgroundColor: [
            correctAnsLineColor,
           ]
          },
          {
           label: 'Wrong Answers',      
           data:[this.state.wrongCount],
           backgroundColor: [
            wrongAnsLineColor,
           ]
          },
          {
           label: 'Not Attempted',      
           data:[this.state.notAttempted],
           backgroundColor: [
            NotattemptLineColor,
           ]
          }
         ]       
        }; 
     if(this.state.testAttempt 
      && Array.isArray(this.state.testAttempt.attemptAnswers)){
      return (
       <div className="container-flux test-result-container">
        <div className="row heading-row justify-content-center">
         <span className="heading-text">TEST RESULT for {this.state.test.name} </span>
        </div>
        <div className="row score-container">
         <div className="col-md-6">
          <BarChart data={scoredata} title="This is how you perform in this test."/>
         </div>
         <div className="col-md-6">
          <BarChart data={responsedata} title="Your response in the test"/>
         </div>
        </div>
       </div>
      );
     }else{
      return (<div className="test-result-container">
       {this.state.message}
      </div>);
     }
     
    }
}