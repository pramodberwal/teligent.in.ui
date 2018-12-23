import React from 'react';
import * as _ from 'lodash';
import {Prompt} from 'react-router-dom';
import { DateTime } from 'react-datetime-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
import '../../../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker-standalone.css';
import moment from 'moment';
import './style.css';
import RichTextEditor from '../rich-text-editor/container';
import {Value} from 'slate';
import {saveMockExam, getMockExamById,getAllMockTestsBySubject,getAllMockTestsByCourse} from '../../../services/mock-exam';
import {getAllCourses} from '../../../services/ref-data/course';
import QuestionFilter from './question-filter';
import QuestionListTable from './question-list-table';
import {calculateTestDuration} from './util';
 
export default class MockExamEditorComponent extends React.Component{
    state = {
     message:'Please wait while loading...',
     isError:false,
     mockExam:{
      name:'',
      courseId:'',
      instructions:'',
      active:false,
      startDateTime:new Date(),
      durationMinutes:'',
      tests:[]
     },         
     activeTest:{},     
     course:'',
     activeSubject:'',
     subjectsSelected:{},
     courses:[],
     editInProgress:false
    };

componentDidMount = ()=>{
 let examId = this.props.examId ; 
 if(examId){
  getMockExamById(examId)
   .then(data =>{
    let mockExam = data.mockExam;
    let subjectsSelected={};
    if(mockExam.instructions){
     mockExam.instructions = Value.fromJSON(JSON.parse(mockExam.instructions));
    }
    _.forEach(mockExam.tests, t=>{
     subjectsSelected[t.subjectId]=true;
    });


    let course = _.find(this.state.courses, c => Number(c.id) === Number(mockExam.courseId));
    let activeTest ='';
    let subject = '';
    if(course && Array.isArray(course.subjects) && course.subjects.length){
     subject = course.subjects[0];
     activeTest = _.find(this.state.mockExam.tests, test => Number(test.subjectId) === Number(subject.id));
    }
   
 
    this.setState({mockExam:data.mockExam,subjectsSelected:subjectsSelected,activeSubject:subject,
     isError:false
     ,course:course
     ,activeTest:activeTest
     , message:''});
   
    //  this.setState({activeSubject:subject,activeTest:activeTest});
    //this.setState({course:course,mockExam:mockExam,editInProgress:true});
    //  this.onCourseChange(mockExam.courseId);
   })
   .catch(error =>{
    this.setState({isError:true, message:'Error while loading mock Exam!'});
   });
 }
 
 getAllCourses()
  .then(data =>{ 
   this.setState({courses:data.courses, isError:false, message:''});
  })
  .catch(error =>{
   this.setState({isError:true, message:'Error while loading courses!'});
  }); 
}

onStartDateTimeChange = (date, e)=>{
 let mockExam = this.state.mockExam;
 mockExam.startDateTime = new Date(e.date);
 this.setState({mockExam:mockExam,editInProgress:true});
}

onChange = (fieldName , value)=>{
 let mockExam = this.state.mockExam;
 mockExam[fieldName] = value;
 this.setState({mockExam:mockExam,editInProgress:true});
}

onCourseChange=(id) =>{
 let mockExam = this.state.mockExam; 
 if(Number.isNaN(Number.parseInt(id))){
  mockExam['courseId'] = '';
  this.setState({course:'',mockExam:mockExam,editInProgress:true});
  return;
 }
 let course = _.find(this.state.courses, c => Number(c.id) === Number(id));
 mockExam['courseId'] = id;
 this.setState({course:course,mockExam:mockExam,editInProgress:true});
 if(course && Array.isArray(course.subjects) && course.subjects.length){
  this.onSubjectChange(course.subjects[0]);
 }
}

onSubjectChange = ( subject ) =>{  
 let activeTest = _.find(this.state.mockExam.tests, test => Number(test.subjectId) === Number(subject.id));
 if(!activeTest){
  return;
 }
 this.setState({activeSubject:subject,activeTest:activeTest});
}

onSubjectsSelected = (subject,selected)=>{
 let subjectsSelected = this.state.subjectsSelected || {};
 let activeSubject = this.state.activeSubject || {};
 let mockExam = this.state.mockExam;
 let tests = mockExam.tests||[];
 subjectsSelected[subject.id] = selected;

 if(selected){
  let test = {};
  test['subjectId'] = subject.id;
  test['courseId'] = mockExam.courseId;
  test['name'] = (this.state.mockExam.name?this.state.mockExam.name+'-':'')+(subject?subject.name:'');
  tests.push(test);
  let duration = calculateTestDuration(this.state.mockExam.durationMinutes,tests.length);
  _.forEach(tests , t=>{
   t['durationMinutes'] = duration;
  });  
  mockExam['tests'] = tests;  
  this.setState({subjectsSelected:subjectsSelected,
   mockExam:mockExam,
   activeSubject:subject
   ,activeTest:test
  });
 }else{
  _.remove(tests, t => Number(t.subjectId) === Number(subject.id));  
  let duration = calculateTestDuration(this.state.mockExam.durationMinutes,tests.length);
  _.forEach(tests , t=>{
   t['durationMinutes'] = duration;
  });  
  if(Number(activeSubject.id) === Number(subject.id)){
   activeSubject = {};
  }
  this.setState({subjectsSelected:subjectsSelected,
   mockExam:mockExam,
   activeSubject:activeSubject
  });
 }
 

}

onTestDetailChange = (fieldName, fieldValue)=>{
 if(this.state.activeTest){
  let activeTest = this.state.activeTest;
  activeTest[fieldName] = fieldValue;
  this.setState({activeTest:activeTest});
 }else{
  let activeTest={};
  activeTest[fieldName] = fieldValue;
  this.setState({activeTest:activeTest});
 }
}


handleInstructionChange =(change)=>{
 let mockExam = this.state.mockExam;
 mockExam.instructions=change.value;
 this.setState({mockExam:mockExam,editInProgress:true});  
}

onAddQuestion = (question)=>{ 
 let activeTest = this.state.activeTest;
 if( activeTest && Array.isArray(activeTest.questions)){
  let index = _.findIndex(activeTest.questions, q => Number(q.id) === Number(question.id));
  if(index < 0){
   activeTest.questions.push(question);
  }else{
   alert('Question already added!');
  }
 }else{
  let questions = [question];
  if(activeTest){
   activeTest['questions'] = questions;
  }else{
   activeTest={};
   activeTest['questions'] = questions;
  } 
 }
 this.setState({activeTest:activeTest}); 
}

onRemoveQuestion = (questionId)=>{ 
 let activeTest = this.state.activeTest;
 if(Array.isArray(activeTest.questions)){
  _.remove(activeTest.questions, q => Number(q.id) === Number(questionId));
 }
 this.setState({activeTest:activeTest,isChildRefresh:!this.state.isChildRefresh});
}

onSave = ()=>{
 let mockExam = this.state.mockExam;

 let instructions ='';
 
 if(!mockExam.name || !mockExam.startDateTime || !mockExam.courseId){
  alert('Please enter exam name, start date and select course.');
  return;
 }

 if(Value.isValue(mockExam.instructions)){
  instructions = mockExam.instructions.toJSON();
  mockExam.instructions = JSON.stringify(instructions);   
 }
 
 saveMockExam(mockExam)
  .then(data =>{
   mockExam = data.mockExam;
   if( mockExam.instructions ){
    mockExam.instructions = Value.fromJSON(JSON.parse(mockExam.instructions));
   }
   window.scroll(0,0);
   this.setState({isError:false,editInProgress:false, message:'Exam saved Successfully!', mockExam:data.mockExam});
  })
  .catch(error =>{  
   if(mockExam.instructions){
    mockExam.instructions = Value.fromJSON(JSON.parse(mockExam.instructions));
   }
   this.setState({isError:true, message:'Error while saving Exam!', mockExam:this.state.mockExam});
  });
}

render(){  
 let {mockExam}  = this.state; 
 return (  
  <div className="container-fluid mock-exam-container">
   <Prompt when={this.state.editInProgress} message=
    {()=>"Are you sure to leave this page without saving the Exam?"} />
   <div className="row mock-exam-heading-row">
    <div className="back-button">
     <button className="btn btn-primary" onClick={this.props.history.goBack}>
      <span className="text-style">Back</span> 
     </button>
    </div>
    <div className="mock-exam-heading">
     <h2>
      <span className="text-style font-weight-bold">Exam Editor</span>         
     </h2>
    </div>
   </div>
   <hr className="divider"/>
   <div className="row justify-content-center">
    <div className="text-center">      
     {this.state.message?
      <div className={"text-style alert "+ (this.state.isError?' alert-danger':'alert-success') }>
       {this.state.message}       
      </div>:''}
    </div>
   </div>
   <div className="row mock-editor-form-row">        
    <form className="form mock-editor-form"> 
     <div className="form-row">
      <div className="form-check form-check-inline pb-4">
       <input className="form-check-input" type="checkbox" 
        id="activeCheckboxId" 
        value={mockExam.active?mockExam.active:''}
        checked={mockExam.active?mockExam.active:false} 
        onChange={(e)=> this.onChange('active', e.target.checked)}
       />
       <label className="form-check-label text-style font-weight-bold" 
        htmlFor="activeCheckboxId">Active</label>
      </div>

      <div className="form-group w-75">
       <div className="d-flex justify-content-center">    
        <span className="text-style font-weight-bold">
                Name:
        </span>
        <div className="w-75">
         <input  name="name" className="form-control"
          value={this.state.mockExam.name?this.state.mockExam.name:''}
          onChange={(e)=> this.onChange('name', e.target.value)}
         />
        </div>
       </div>
      </div>          
     </div>
     <div className="form-row">
      <div className="form-group w-auto">
       <div className="d-flex align-items-center">    
        <span className="text-style font-weight-bold">
                Course:
        </span>
        <div className="">
         <select id="courseId" className="form-control  "
          name="courseId"
          value={this.state.mockExam.courseId?this.state.mockExam.courseId:''}
          onChange={(e)=>this.onCourseChange(e.target.value)}
         >
          <option>Please Select</option>
          {Array.isArray(this.state.courses)?this.state.courses.map((course,index)=>{
           return <option key={index} value={course.id}>{course.name}</option>; 
          }):''}
         </select>
        </div>
       </div>
      </div>  
      <div className="form-group ml-4">
       <div className="d-flex align-items-center">    
        <span  className="text-style font-weight-bold">
                Start Time:
        </span>      
        <DateTime 
         id="startDateTimeId"
         value={this.state.mockExam.startDateTime?moment(this.state.mockExam.startDateTime):moment("2019-01-15 09:00:00+05:30")}
         pickerOptions={{ sideBySide: true,format:"DD/MM/YYYY hh:mm A"}}
         placeholder="Start time"
         onChange={this.onStartDateTimeChange} />
       </div>       
      </div>

      <div className="form-group ml-4">
       <div className="d-flex align-items-center">    
        <span  className="text-style font-weight-bold">
                Exam Duration:
        </span>
        <input className="form-control number-box-20 " 
         id="durationMinutesId"
         value={this.state.mockExam.durationMinutes?this.state.mockExam.durationMinutes:''}         
         onChange={(e)=>this.onChange('durationMinutes',e.target.value)} />
        <span className="ml-1 font-italic">Munites</span>
       </div>
      </div>      
     </div>
     <div className="form-row container">
      <div> <label htmlFor="descriptionId" className="text-style font-weight-bold ">Description:</label></div>
      <div className="container flex-grow-1">
       <div className="row">
        <textarea name="description"
         className="form-control text-style"
         value={mockExam.desc?mockExam.desc:''}
         onChange={(e)=>this.onChange('desc',e.target.value)}
        />
       </div>
      </div>
     </div>

     <div className="form-row container mt-4">
      <div className="form-group flex-grow-1">
       <label htmlFor="instructionsId"
        className="text-style font-weight-bold"
       >Instructions</label>
       <RichTextEditor placeholder="Instructions..." className="form-control" id="instructionsId" readOnly={false}
        value={mockExam.instructions} tabIndex={0} autoFocus={false}
        onChange={this.handleInstructionChange}   />
      </div>
     </div>

     <div className="form-row justify-content-center">
      <div className=" text-center">
       <button type="button" className="btn btn-primary"
        onClick = {this.onSave}
       >
        <span className="text-style">Save Exam</span>
       </button>
      </div>      
     </div>
    </form>
   </div>   
   {this.state.course && this.state.course.id ?
    <div className="row mock-editor-form-row">
     <div className="container-fluid content-justify-center">
      <div className="row ">
       <div className="flex-grow-1 text-center course-subject-row">
        {
         (this.state.course && Array.isArray(this.state.course.subjects))?
          this.state.course.subjects.map((subject,index)=>{
           return <span key={index} 
            className={"subject-name "+ (Number(this.state.activeSubject.id) === Number(subject.id)?' active ':'') }
           >   
            <div className="form-check form-check-inline pb-4">
             <input className="form-check-input" type="checkbox" 
              id={"examSubjectCheck"+subject.id} 
              value={ subject.id}
              checked={this.state.subjectsSelected && this.state.subjectsSelected[subject.id] ?this.state.subjectsSelected[subject.id]:false} 
              onChange={(e)=> this.onSubjectsSelected(subject, e.target.checked)}
             />
             <label htmlFor="activeCheckboxId" 
              className="form-check-label text-style font-weight-bold"              
             >
              <button type="button" className="subject-name-btn" onClick={()=>this.onSubjectChange(subject)}>
              
               <span className="text-style">{subject.name}</span></button>
             </label>    
            </div>
           </span>;
          })
          :''
        }
       </div>    
      </div>
      <div className={"row question-detail-container  "+((this.state.activeSubject.id && this.state.activeTest)?'':' d-none ') }>
       <div className="total-questions-count sticky-top"> 
        <div >Total Questions Added: {this.state.activeTest && Array.isArray(this.state.activeTest.questions)?this.state.activeTest.questions.length:0}</div></div>
       <div className="container-fluid flex-grow-1">      
        <div className="row ">
         <form className="form-inline" autoComplete ="off">
          <div className="input-group test-form-field test-code">
           <label htmlFor={"testCode_"+this.state.activeSubject.id} >Test Code:</label>
           <input type="text" readOnly 
            className="form-control " 
            id={"testCode_"+this.state.activeSubject.id} 
            value={this.state.activeTest && this.state.activeTest.testCode?this.state.activeTest.testCode:'CODE001'} 
           />   
          </div>
          <div className="input-group">
           <label htmlFor="testName">Test Name:</label>
           <input className="form-control" readOnly
            value={(this.state.mockExam.name?this.state.mockExam.name+'-':'')+(this.state.activeSubject?this.state.activeSubject.name:'')}
           />
          </div>
          <div className="input-group">
           <label htmlFor="testSeq">Test Order:</label>
           <input className="form-control test-form-field"
            value={this.state.activeTest && this.state.activeTest.seqOrder?this.state.activeTest.seqOrder:''}
            onChange={(e) => this.onTestDetailChange('seqOrder',e.target.value)}
           />
          </div>
          <div className="input-group">
           <label htmlFor="testPositiveMarks">Duration:</label>
           <input className="form-control test-form-field duration"
            value={this.state.activeTest && this.state.activeTest.durationMinutes?this.state.activeTest.durationMinutes:''}
            onChange={(e) => this.onTestDetailChange('durationMinutes',e.target.value)}
           />
          </div>
          <div className="input-group">
           <label htmlFor="testPositiveMarks">Positive Marks:</label>
           <input className="form-control test-form-field"
            value={this.state.activeTest && this.state.activeTest.correctAnsMarks?this.state.activeTest.correctAnsMarks:''}
            onChange={(e) => this.onTestDetailChange('correctAnsMarks',e.target.value)}
           />
          </div>
          <div className="input-group">
           <label htmlFor="negativeMarks">Negative Marks:</label>
           <input className="form-control test-form-field"
            value={this.state.activeTest && this.state.activeTest.wrongAnsMarks?this.state.activeTest.wrongAnsMarks:''}
            onChange={(e) => this.onTestDetailChange('wrongAnsMarks',e.target.value)}
           />
          </div>

          <div className="input-group">
           <label htmlFor="maxQuestions">Max Questions:</label>
           <input className="form-control test-form-field"
            value={this.state.activeTest && this.state.activeTest.maxQuestions?this.state.activeTest.maxQuestions:''}
            onChange={(e) => this.onTestDetailChange('maxQuestions',e.target.value)}
           />
          </div>
          
         </form>
        </div>
        <div className="row ">
         <div className="question-table-row flex-grow-1">
          <QuestionListTable actionText="Remove" 
           questions={this.state.activeTest && this.state.activeTest.questions?this.state.activeTest.questions:[]}
           onRemoveQuestion={this.onRemoveQuestion}
          />
         </div>
        </div>        
        <div className={"row "}>       
         {this.state.activeSubject?<QuestionFilter subjectId={this.state.activeSubject.id}           
          onAddQuestion={this.onAddQuestion}
          /* isChildRefresh={this.state.isChildRefresh} */
          activeTest={this.state.activeTest} 
         />:''}
        
        </div>
       </div>
      </div>
     </div>   
    </div>
    :''}
   
  </div>
 );
}
    
}