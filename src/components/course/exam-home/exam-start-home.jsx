import React from 'react';
import * as _ from 'lodash';
import {Link} from 'react-router-dom';
import {Prompt} from 'react-router-dom';
import TimerComponent from '../../helper/timer';
import {getMockExamByIdPublic,startExamAttempt,finishExamAttempt} from '../../../services/mock-exam';
import {startTestAttempt} from '../../../services/exam-test';
import QuestionPanelComponent from '../question-panel/component';
import TogglerComp from './toggler-comp';


export default class ExamStartHome extends React.Component{
    state={
     isError:false,
     message:'Please wait while we are loading exam details...',
     exam:'',
     activeTest:'',
     examStarted:true,
     attemptedQuestions:{},
     testStarted:{}, 
     examAttempt:{},
     testAttempts:{},
     questionPanelStates:{}
    }

   
    componentDidMount=()=>{
     startExamAttempt(this.props.examId)
      .then(attemptData =>{
       getMockExamByIdPublic(attemptData.examAttempt.examId)
        .then(examData =>{
         console.log('Exam attempt >');
         this.setState({isError:false, message:'',examAttempt:attemptData.examAttempt,exam:examData.mockExam});
        })
        .catch(error =>{
         console.error('Error while loading the exam ',error);
         this.setState({isError:true, message:error.message});
        });
      })
      .catch(error =>{
       console.error('Error while starting the exam ',error);
       this.setState({isError:true, message:error.message});
      });
    }
    onOptionSelect = (questionPanelState)=>{ 
     let testAttempts = this.state.testAttempts;
     let activeTestAttempt = testAttempts[this.state.activeTest.id];
     activeTestAttempt['attemptAnswers']=questionPanelState['attemptedQuestions'];
      
     let questionPanelStates = this.state.questionPanelStates;
     questionPanelStates[this.state.activeTest.id] = questionPanelState;

     this.setState({
      testAttempts:testAttempts
      ,questionPanelStates:questionPanelStates
     }
     );
    }
    onTestStart = (testId)=>{
     startTestAttempt(testId)
      .then( attemptData  =>{
       let testAttempts = this.state.testAttempts || {};
       testAttempts[testId] = attemptData.testAttempt;
       this.setState({testAttempts:testAttempts});
      })
      .catch(error =>{
       console.error('Error >',error);
       this.setState({isError:true, message:'Test could not start'});
      });
    }

    onExamFinish =()=>{

     let examTestAttempts = [];
     _.forEach(this.state.exam.tests , t =>{
      if(this.state.testAttempts[t.id]){
       examTestAttempts.push(this.state.testAttempts[t.id]);
      }
     });

     this.setState({isError:false, message:'Please wait while we are validating your exam attempt'});
     console.log(this.state.exam);
     finishExamAttempt(this.state.exam.id,this.state.examAttempt,examTestAttempts)
      .then(attemptData =>{
       this.props.history.push({
        pathname:`${this.props.match.url}/finish/`+this.state.exam.id,
        state:{
         examAttempt:attemptData.examAttempt,
         testAttempts:attemptData.testAttempts,
         exam:this.state.exam
        }});
       
      })
      .catch(error =>{
       this.setState({isError:true, message:error.message});
      });
    }

    onTestClick = (testId)=>{
     let tests = this.state.exam.tests || [];
     let activeTest = {};
     if(Array.isArray(tests)){
      activeTest = _.find(tests, t => Number(t.id) === Number(testId));
     }
     
     this.setState({activeTest:activeTest});
    }

    render(){
     let tests = this.state.exam.tests;
     let subjectsHtml ='';     
     if(tests && Array.isArray(tests)){
      subjectsHtml = tests.map((test,index)=>{
       let subjectName = test.name?test.name.split('-')[1]:test.name;
       return <div key={index} className={"exam-test-col"+(Number(this.state.activeTest.id) === Number(test.id)?' active ':'')}>       
        <button type="button" 
         onClick={()=>this.onTestClick(test.id)}
         className="exam-test-name-btn"         
        >
         <span  className="text-style">{subjectName}  </span></button>
       </div>;
      });
     }else{
      return <div className="container">
       <div className="row">
        <div className="mx-auto"><span className="text-style">{this.state.message}</span></div>
       </div>
      </div>;
     }
    
     return <div className="container-fluid exam-start-home-container">
      <Prompt when={this.state.examAttempt}
       message="Are you sure you finished the exam?"
      />
      <div className=" row heading-row ">        
       <div className="mx-auto"><span className="text-style">{this.state.exam.name}</span></div>
      </div>
      <div className="row">
       <TogglerComp exam={this.state.exam}/>
      </div>  
      <div className="row timmer-row">
       <div className="timer-col">       
        <TimerComponent 
         hour={0}
         minutes={this.state.exam.durationMinutes ?this.state.exam.durationMinutes:0}
         seconds={0}
        />   
       </div>
      </div> 
      <div className="row justify-content-end mr-2">
       <button className="btn btn-primary"
        onClick={this.onExamFinish}
       ><span className="text-style">Finish Exam</span></button>
      </div>    
      <div className="row test-name-row">
       {subjectsHtml}
      </div>      
      {this.state.testAttempts && this.state.testAttempts[this.state.activeTest.id]?
       <div className="row test-panel-container">
        <div className="container-fluid">
         <div className="row">
          <QuestionPanelComponent
           attemptedQuestions={this.state.attemptedQuestions[this.state.activeTest.id] || {}}
           testId={this.state.activeTest.id} 
           questions={this.state.activeTest.questions} 
           onOptionSelect={this.onOptionSelect}
           questionPanelState={this.state.questionPanelStates[this.state.activeTest.id]}
          />
         </div>
        </div>
       </div>:
       <div className={"row mt-2" + (this.state.activeTest.id?'':' d-none')}>
        <div className="mx-auto">
         <button className="btn btn-primary"
          onClick={()=>this.onTestStart(this.state.activeTest.id)}
         > Start {this.state.activeTest.name?this.state.activeTest.name.split('-')[1]:this.state.activeTest.name} Test </button>
        </div>
       </div>
      }
      
     </div>;
    }
}