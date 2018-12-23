import React from 'react';
import * as _ from 'lodash';
import {Prompt,Redirect} from 'react-router-dom';
import {Value} from 'slate';
import RichTextEditor from '../../admin/rich-text-editor/container';
import Instructions from './instructions';
import './style.css';
import {  loadData } from './helper';
import QuestionPanel from '../question-panel/container';
import TimerComponent from '../../helper/timer';
import {PopUpModel} from '../../helper/popup';
import {startTestAttempt} from '../../../services/exam-test';
import {saveTestAttempt} from '../../../services/exam-test';

export default class TestPanelComponent extends React.Component{
 state={
  test:'',
  testAttempt:'',
  isInstructions:true,
  isStart:false,
  isFinished:false,
  isSubmit:false,
  isPopup:true,     
  attemptedQuestions:{},
  questionPanelState:'',
 }
 componentDidMount = ()=>{
  window.scroll(0,0);
  
  loadData(this.props,this);
 }
 componentWillReceiveProps = (props)=>{
  loadData(props,this);
 }

 onStart = ()=>{   
  let duration = {'hour':this.state.test.durationHour,'minutes':this.state.test.durationMinutes,'seconds':0};  
  startTestAttempt(this.state.test.id)
   .then(data =>{
    this.setState({
     isStart:true,
     isInstructions:false,
     testAttempt:data.testAttempt,
     duration:duration});
   })
   .catch(error =>{
    console.log('Error while starting   data ', error);
   });
  
 }
 onInstructions = ()=>{
  this.setState({isInstructions:!this.state.isInstructions});
 }

 onSubmit = ()=>{
  let attemptAnswers = [];
  let decision = window.confirm("Are you sure you want to submit the test answers?");  
  if(!decision){
   return;
  }
  this.setState({isFinished:true});
  let  testAttempt = this.state.testAttempt;
  if(Array.isArray(this.state.test.questions)){
   _.forEach(this.state.test.questions,question =>{
    if(this.state.attemptedQuestions[question.id]){
     let attemptAnswer = {
      questionId:question.id,
      selectedAns:this.state.attemptedQuestions[question.id]
     };
     attemptAnswers.push(attemptAnswer);
    }
   });
   testAttempt.attemptAnswers = attemptAnswers;
  }
  saveTestAttempt(testAttempt)
   .then(resp =>{
    testAttempt = resp.testAttempt;
    this.props.history.push({
     pathname: this.props.match.url+"/result",
     state: {
      testAttempt:testAttempt,
      test:this.state.test
     }
    });
   })
   .catch(error =>{
    this.setState({isError:true, message:error.message});
   });
 }
 
 onOptionSelect = (questionPanelState)=>{  
  this.setState({
   questionPanelState:questionPanelState,
   attemptedQuestions:questionPanelState['attemptedQuestions']});
 }
 render (){
  
  let {test} = this.state; 
  if(test){
   return (
    <div className="test--panel-container">
     <Prompt when={this.state.isStart} 
      message={(location)=>{ 
       if(this.state.isFinished){
        return true;
       }else{
        return "Are you sure you want to leave this test in between?";
       }
      
      }}    />
     <div className="heading-row">
      {!this.state.isStart?<button type="button" className="btn btn-primary back-button"
       onClick={()=>this.props.history.goBack()}>Back</button>:''}
      <div className="flex-grow-1 text-center">
       <span className="heading-text">
        {test.desc}
       </span>
      </div> 
      <div className="row justify-content-center">
       {this.state.message?
        <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
         {this.state.message}       
        </div>:''}   
      </div>
      {this.state.isStart?
       <div className="d-flex heading-detail-row">
        <div className="timer-col">
         <TimerComponent 
          hour={this.state.duration && this.state.duration.hour?this.state.duration.hour:0}
          minutes={this.state.duration && this.state.duration.minutes?this.state.duration.minutes:0}
          seconds={this.state.duration && this.state.duration.seconds?this.state.duration.seconds:0}
         />        
        </div>
        <div className="instructions-col">
         <button type="button" data-toggle="modal" 
          className="btn btn-primary instructions-btn " 
          data-target={"#instructionsId"}          
         >Instructions</button>
        </div>        
       
       
        <PopUpModel id='instructionsId' title=" Instructions"
         Component={()=>
          <RichTextEditor id="instructionsId" 
           readOnly={true}
           value={test.instructions?Value.fromJSON(JSON.parse(test.instructions)):''}  
          />        
         }
        />
        <div className="submit-col pl-1  pl-1">
         <button type="button" 
          className="btn btn-primary submit-btn"
          onClick={this.onSubmit} 
         >Submit</button> 
        </div>
      
       </div>  :''}
         
     </div>
     <hr className="divider m-0"/>
     {this.state.isInstructions?
      <Instructions test={test} match={this.props.match}/>
      :
      this.state.isStart?
       <QuestionPanel
        questionPanelState={this.state.questionPanelState}
        attemptedQuestions={this.state.attemptedQuestions}
        onOptionSelect={this.onOptionSelect} 
        currentQuestionIndex={0} 
        questions={test.questions}  
        {...this.props} 
        onSubmit={this.onSubmit}/>
       :''
     }
     {!this.state.isStart?<div className="start--button text-center">
      <button onClick={this.onStart} className="btn btn-primary"> Start </button>
     </div>:''}     
    </div>
   );
  }else{
   return (
    <div className="test--panel-container">
     <div className="heading-row">
      <button type="button" className="btn btn-primary back-button"
       onClick={()=>this.props.history.goBack()}>Back</button>
      <span className="heading-text">
                                 Please wait while loading test ...
      </span>
     </div>
    </div>
   );
  }

  
 }
};