import React from 'react';
import * as $ from 'jquery';
import moment from 'moment';
import RichTextEditor from '../../admin/rich-text-editor/container';
import {Value} from 'slate';
import './style.css';
import SingleSelectOptions from './single-select-options';
/* window.oncontextmenu =(e)=>{
 console.log('oncontextmenu ',e);
 e.preventDefault();
}; */

export default class QuestionPanelComponent extends React.Component{
    state={
     currentQuestionIndex:0,
     questions:'',    
     attemptedQuestions:{},
     needReviewQuestions:{},
     activeQuestion:'',
     isPreviousDisabled:true,
     isNextDisabled:true,    
     durationLeft:moment.duration({'hour':1,'minutes':1,'seconds':10})
     
    }   
    componentWillUnmount =()=>{
     window.oncontextmenu =(e)=>{     
     };
     window.onkeydown  = (e) => {     
     };
    }

    componentWillReceiveProps =(props)=>{
     if(props.questionPanelState){
      this.setState(props.questionPanelState);
      return;
     }


     let questions = props.questions;
     let isPreviousDisabled = true;
     let isNextDisabled = true;
     let currentQuestionIndex = props.currentQuestionIndex?props.currentQuestionIndex:0;

     if(!Array.isArray(questions)){
      return;
     }
    
     if(questions.length > 1){
      isNextDisabled = false;
     }

     if(questions.length <= currentQuestionIndex){
      isNextDisabled = true;
     }

     window.oncontextmenu =(e)=>{
      e.preventDefault();
     };
     window.onkeydown  = (e) => {
      if ((e.which || e.keyCode) === 116 || (e.which || e.keyCode) === 82) {
       e.preventDefault(); 
      }   
     };


     this.setState({
      attemptedQuestions:props.attemptedQuestions,
      currentQuestionIndex:currentQuestionIndex,
      isNextDisabled:isNextDisabled,
      isPreviousDisabled:isPreviousDisabled,
      questions:questions,
      activeQuestion:questions[currentQuestionIndex],
     });
    }

    componentDidMount=()=>{      
     this.componentWillReceiveProps(this.props);
    };

    onOptionSelect = (value)=>{     
     
     let attemptedQuestions = this.state.attemptedQuestions;
     let needReviewQuestions = this.state.needReviewQuestions;
     
     attemptedQuestions[this.state.activeQuestion.id] = value;
     
     needReviewQuestions[this.state.activeQuestion.id]=false;
     
     let newState = this.state;
     newState['needReviewQuestions'] = needReviewQuestions;
     newState['attemptedQuestions'] = attemptedQuestions;
     this.props.onOptionSelect(newState);
    }

    onSkipQuestion = ()=>{
     let element = $('input[name='+this.state.activeQuestion.id+']:checked');     
     if(element.length === 1){
      let attemptedQuestions = this.state.attemptedQuestions;
      attemptedQuestions[this.state.activeQuestion.id] = '';     
      let needReviewQuestions = this.state.needReviewQuestions;
      needReviewQuestions[this.state.activeQuestion.id] = false;  
      this.setState({
       needReviewQuestions:needReviewQuestions,
       attemptedQuestions:attemptedQuestions});
      element[0].checked=false;      
     } 
    }
onNext =()=>{
 window.scroll(0,0);
 let isPreviousDisabled = this.state.isNextDisabled;
 let isNextDisabled = this.state.isNextDisabled;
 let currentQuestionIndex = this.state.currentQuestionIndex + 1;
 let activeQuestion = this.state.activeQuestion;
 
 if( currentQuestionIndex <= 0 ){
  isPreviousDisabled = true;
 }else{
  isPreviousDisabled=false;
 }
 if( Number(currentQuestionIndex) === Number(this.state.questions.length - 1)  ){
  isNextDisabled = true;
 }else{
  isNextDisabled=false;
 }
 
 if( currentQuestionIndex < this.state.questions.length ){
  activeQuestion=this.state.questions[currentQuestionIndex];
 }
 this.setState({
  isPreviousDisabled:isPreviousDisabled,
  isNextDisabled:isNextDisabled,
  activeQuestion:activeQuestion,
  currentQuestionIndex:currentQuestionIndex,
 });
}

onQuestionIdClick = (currentQuestionIndex)=>{
 window.scroll(0,0); 
 let activeQuestion=this.state.questions[currentQuestionIndex];
 let isPreviousDisabled = this.state.isNextDisabled;
 let isNextDisabled = this.state.isNextDisabled;
 
 if( currentQuestionIndex <= 0 ){
  isPreviousDisabled = true;
 }else{
  isPreviousDisabled=false;
 }
 if( Number(currentQuestionIndex) === Number(this.state.questions.length - 1)  ){
  isNextDisabled = true;
 }else{
  isNextDisabled=false;
 }
 this.setState({
  isPreviousDisabled:isPreviousDisabled,
  isNextDisabled:isNextDisabled,
  activeQuestion:activeQuestion,
  currentQuestionIndex:currentQuestionIndex,
 });
}
onPrevious = ()=>{
 window.scroll(0,0);
 
 let isPreviousDisabled = this.state.isPreviousDisabled;
 let isNextDisabled = this.state.isNextDisabled;
 let currentQuestionIndex = this.state.currentQuestionIndex - 1;
 let activeQuestion = '';
 
 if( currentQuestionIndex <= 0 ){
  isPreviousDisabled = true;
 }else{
  isPreviousDisabled=false;
 }

 if( Number(currentQuestionIndex) === Number(this.state.questions.length - 1)  ){
  isNextDisabled = true;
 }else{
  isNextDisabled=false;
 }

 if( currentQuestionIndex >= 0 ){
  activeQuestion=this.state.questions[currentQuestionIndex];
 }
 this.setState({
  isPreviousDisabled:isPreviousDisabled,
  isNextDisabled:isNextDisabled,
  activeQuestion:activeQuestion,
  currentQuestionIndex:currentQuestionIndex,
 });
}

onNeedReview = ()=>{
 let needReviewQuestions = this.state.needReviewQuestions;
 needReviewQuestions[this.state.activeQuestion.id] = !needReviewQuestions[this.state.activeQuestion.id];
 this.setState({needReviewQuestions:needReviewQuestions});
 //this.onNext();
}

onReviewed = ()=>{
 let needReviewQuestions = this.state.needReviewQuestions;
 needReviewQuestions[this.state.activeQuestion.id] = false;
 this.setState({needReviewQuestions:needReviewQuestions});
}

onSubmit = () =>{
 this.props.onSubmit();
}

render(){        
 if(this.state.activeQuestion){
  return (
   <div className="question-panel-container  container-fluid" onKeyDown={this.disableF5}>
    <div className="row">
     <div className="questions-navigator-col col-lg-2">
      <div className="container-fluid">
       <div className="row">
        <div className="flex-grow-1 legend-col"><span className="need-review shadow rounded">Review</span></div>
        <div className="flex-grow-1 legend-col"><span className="question-btn-attempted pl-2 pr-2">Done</span></div>
        <div  className="flex-grow-1 legend-col"><span className="not-attempted pl-2 pr-2">Skipped</span></div>
       </div>
       <div className="row justify-content-center">
        {Array.isArray(this.state.questions)?
         this.state.questions.map((question,index)=>{
          return  <div key={index} className={this.state.activeQuestion.id === question.id ?' active ': ''}>
           <button type="button"
            onClick={()=>this.onQuestionIdClick(index)}
            className={"question-btn "+
            ((this.state.needReviewQuestions && this.state.needReviewQuestions[question.id])?' need-review '
             :(this.state.needReviewQuestions && this.state.attemptedQuestions[question.id])?' question-btn-attempted ':'' ) 
            }>{index + 1}</button>
          </div>  ;
         })
         :''}
       </div>
      </div>
     </div>
     <div className="questions-panel-col col">
      <form>
       <div className="container">
        <div className="question-description-row row">
         <div className="question-seq">
        Q.- {Number(this.state.currentQuestionIndex) + 1}:
         </div>          
         <div className="description">
          <RichTextEditor 
           id={this.state.activeQuestion.id} 
           readOnly={true} 
           value={Value.fromJSON(JSON.parse(this.state.activeQuestion.desc))} />
         </div>
        </div>
        <div className="row question-options-row">
         <SingleSelectOptions 
          activeQuestion={this.state.activeQuestion}
          attemptedQuestions={this.state.attemptedQuestions}
          onOptionSelect={this.onOptionSelect}
         />
        </div>

        <div className="question-panel-action-row row">
         <div>
          <button type="button"
           disabled={this.state.isPreviousDisabled} 
           className="btn btn-primary next-btn"
           onClick={this.onPrevious}
          > Prev </button>
          <button  type="button" 
           className="btn btn-primary skip-btn" 
           onClick={this.onSkipQuestion}> Skip </button> 
          <button  type="button" 
           className="btn btn-primary skip-btn" 
           onClick={this.onNeedReview}> Review Later </button>   
          {this.state.attemptedQuestions && this.state.needReviewQuestions[this.state.activeQuestion.id]?<button  type="button" 
           className="btn btn-primary skip-btn" 
           onClick={this.onReviewed}> Reviewed </button> :''}
          <button type="button"
           disabled={this.state.isNextDisabled} 
           className="btn btn-primary next-btn"
           onClick={this.onNext}
          > Next </button>
         </div>
        </div>
       </div>
      </form>
     </div>
    </div>
   </div>
  );
 }else{
  return (<div className="question-panel-container mx-auto">Questions not added?</div>);
 }
}
}