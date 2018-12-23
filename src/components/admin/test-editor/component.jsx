import React from 'react';
import * as _ from 'lodash';
import { DateTime } from 'react-datetime-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
import '../../../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker-standalone.css';
import moment from 'moment';
import { Prompt } from 'react-router';
import {Value} from 'slate';
import RichTextEditor from '../rich-text-editor/container';
import {saveTest,removeQuestionFromTest} from '../../../services/exam-test';
import {Link} from 'react-router-dom';
import './style.css';
import QuestionListComponent from './test-question-table';
import { getAllCourses, getCourseById } from '../../../services/ref-data/course';
import { loadData, loadChapters, loadAllSubjects } from './helper';
import { getAllSubjects } from '../../../services/ref-data/subject';
import { getTestById } from '../../../services/exam-test';
import { getChaptersBySubject } from '../../../services/ref-data/chapter';
import {  getSubjectByCourse } from '../../../services/ref-data/subject';
 
export default class TestEditorComponent extends React.Component{

    state = {
     message:'Please wait while loading...',
     isError:false,
     inProgress:false,
     test:{
      name:'',
      desc:'',
      courseId:'',
      courseName:'',
      subjectId:'',
      subjectName:'',
      chapterId:'',
      chapterName:'',
      instructions:'',
      active:false,
      mockPaper:false,
      startDateTime:new Date(),
      eachQuestionMark:0,
      questions:[]       
     },
     examDuration:'',
     courses:[],
     subjects:[],
     chapters:[],
    };
    
componentDidMount = ()=>{
 window.scroll(0,0);

 getAllCourses().then((data)=>{ 
  this.setState({courses:data.courses});
 }).catch(error =>{
  this.setState({isError:true,message:error.message});
 });

 getAllSubjects()
  .then(data =>{
   this.setState({subjects:data.subjects});
  }).catch(error =>{
   this.setState({isError:true,message:error.message});
  });

 if(this.props.testId){     
  getTestById(this.props.testId)
   .then(testData =>{  
    if(testData.test.instructions){
     testData.test.instructions = Value.fromJSON(JSON.parse(testData.test.instructions));       
    }  
    this.setState({isError:false,message:'',   test:testData.test}); 
   });
 }
}

onStartDateChange = (date, e)=>{
 this.setState({test:{...this.state.test,startDateTime: new Date(e.date) }});
}

componentWillUnmount = ()=>{
}

onDurationChange = (durationMins)=>{
 let endTime = moment.duration(durationMins,'minutes'); 
 this.setState({examDuration:durationMins,test:{...this.state.test,durationHour:endTime.hours, durationMinutes:durationMins }});
}
onChange = (fieldName,fieldValue)=>{     
 this.setState(
  {
   inProgress:true,
   test:{...this.state.test,[fieldName]:fieldValue}});
};
    
onSubjectChange = (fieldName,fieldValue)=>{
 if(Number.isNaN(Number(fieldValue))){
  this.setState({inProgress:true,test:{...this.state.test,subjectId:'',chapterId:''}});
  return;
 }
 loadChapters(fieldName,fieldValue,this);
 
}
onChapterChange = (fieldName,fieldValue)=>{
 if(Number.isNaN(Number(fieldValue))){
  this.setState({inProgress:true,test:{...this.state.test,chapterId:''}});
  return;
 }
 this.setState({inProgress:true,test:{...this.state.test,chapterId:fieldValue}});
}
onCourseChange = (fieldName,fieldValue)=>{
 if(Number.isNaN(Number(fieldValue))){ 
  getAllSubjects()
   .then(data =>{
    this.setState({inProgress:true,subjects:data.subjects,
     test:{...this.state.test,courseId:'',subjectId:'',chapterId:''}});
   }).catch(error =>{
    this.setState({isError:true,message:error.message});
   });
  return;
 }       
 loadAllSubjects(fieldName,fieldValue,this);
};
onQuestionRemove = (testId,questionId) =>{ 
 removeQuestionFromTest(testId,questionId)
  .then(data =>{
   this.setState(
    {inProgress:false,
     test:data.test});
  })
  .catch(error =>{
   this.setState(
    {inProgress:true,
     isError:true,
     message:error.message});
  });
 
}
    
onSave = ()=>{
 let test = this.state.test;
 let instructions ='';
 if(Value.isValue(test.instructions)){
  instructions = test.instructions.toJSON();
  test.instructions = JSON.stringify(instructions);   
 }   
 window.scroll(0,0); 
 
 saveTest(this.state.test).then(({test,message})=>{      
  this.setState({
   inProgress:false,
   isError:false,
   message:message,
   test:test
  });
 })
  .catch(error =>{
   this.setState({isError:true,message:error.message});
  });
}

handleBack = ()=>{ 

 if(this.props.location && this.props.location.state && this.props.location.state.from){
  let from = this.props.location.state.from;
 
  this.props.history.push({pathname:from, state:this.props.location.state});
 }else{
  this.props.history.goBack();
 }
 
}
handleInstructionChange =(change)=>{
 let test = this.state.test;
 test.instructions=change.value;
 this.setState({test:test});  
}

    
render(){  
 return (      
  <div className="container-fluid test-container">
   <div className="row test-heading-row">
    <div className="back-button">
     <button className="btn btn-primary" onClick={this.handleBack}>
              Back
      <Prompt
       when={this.state.inProgress}
       message={()=>{            
        return "Are you sure to leave this page without saving the data? you may loose unsaved data.";
       }}           
      />
     </button>
    </div>
    <div className="test-heading">
     <h2 ><span className="text-style">Test Editor</span></h2>
    </div>
   </div>
   <hr className="divider"/>
   <div className="row justify-content-center">
    <div className="text-center">      
     {this.state.message?
      <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
       {this.state.message}       
      </div>:''}
    </div>
   </div>
   <div className="row test-editor-form-row">        
    <form className="test-editor-form"> 
     <div className="form-row">
      <div className="form-check">  
       <input className="form-check-input" type="checkbox" 
        value={this.state.test.active?this.state.test.active:false} 
        checked={this.state.test.active?this.state.test.active:false} 
        id="testIsActive" 
        onChange={(e)=>this.onChange('active',e.target.checked)}
       /> 
       <label className="form-check-label" htmlFor="testIsActive">
           Is Active?
       </label>
      </div>  
      <div className="ml-4 form-check">  
       <input className="form-check-input" type="checkbox" 
        value={this.state.test.mockPaper?this.state.test.mockPaper:false} 
        checked={this.state.test.mockPaper?this.state.test.mockPaper:false} 
        id="testIsMockPaper" 
        onChange={(e)=>this.onChange('mockPaper',e.target.checked)}
       /> 
       <label className="form-check-label" htmlFor="testIsMockPaper">
           Is Full Paper?
       </label>
      </div> 
      <div className="ml-4 form-row state-time-level">
       <div > <label htmlFor="durationHourId">Start Date:</label>  </div>
       <div className="form-group flex-grow-1">         
        <DateTime 
         value={this.state.test.startDateTime?moment(this.state.test.startDateTime):moment("2019-01-13 09:00:00+05:30")}
         pickerOptions={{ sideBySide: true,format:"DD/MM/YYYY hh:mm A"}}
         placeholder="Start time"
         onChange={this.onStartDateChange} />
       </div>
      </div>

      <div className="ml-4 form-row state-time-level">
       <div > <label htmlFor="durationHourId">Duration:</label>  </div>
       <div className="col-3 form-group flex-grow-1">         
        <input name="testDuration"
         className="form-control"
         value={this.state.test.durationMinutes?this.state.test.durationMinutes:''}
         onChange= {(e)=>this.onDurationChange(e.target.value)}
        /> 
       </div><div>  Minutes</div>
      </div> 

      <div className=" form-row state-time-level">
       <div > <label htmlFor="maxQuestions">Max Questions:</label>  </div>
       <div className="col-3 form-group flex-grow-1">         
        <input name="maxQuestions" id="maxQuestions"
         className="form-control"
         value={this.state.test.maxQuestions?this.state.test.maxQuestions:''}
         onChange= {(e)=>this.onChange('maxQuestions',e.target.value)}
        /> 
       </div>
      </div>         
     </div>
     <div className="form-row test-detail-row">       
      <div className="col-md-1 col-xs-2 seq-order-col">
       <label htmlFor="seqOrderId">Seq Order: </label>
       <div className="form-group">        
        <input type="text"
         id="seqOrderId"
         className="form-control"
         name="seqOrder"
         value={this.state.test.seqOrder?this.state.test.seqOrder:''}
         onChange={(e)=>this.onChange('seqOrder', e.target.value)}
        ></input>
       </div>
      </div>
      <div>
       <label htmlFor="correctAnsMarksId">Marks/Correct Answer:</label>      
       <div className="form-group">              
        <input type="text"
         id="correctAnsMarksId"
         className="form-control"
         name="correctAnsMarks"
         value={this.state.test.correctAnsMarks?this.state.test.correctAnsMarks:''}
         onChange={(e)=>this.onChange('correctAnsMarks', e.target.value)}
        ></input>
       </div>
      </div>
      <div>
       <label htmlFor="wrongAnsMarksId">Negative Marks/Wrong Answer:</label>      
       <div className="form-group">              
        <input type="text"
         id="wrongAnsMarksId"
         className="form-control"
         name="hour"
         value={this.state.test.wrongAnsMarks?this.state.test.wrongAnsMarks:''}
         onChange={(e)=>this.onChange('wrongAnsMarks', e.target.value)}
        ></input> 
       </div>
      </div>
     </div> 
     <div className="form-row test-detail-row">
      <div className="form-group">
       <label htmlFor="testName" 
        className="font-weight-bold">Name
       </label>
       <input type="text" className="form-control" 
        id="testNane"
        name="name"
        value={this.state.test.name?this.state.test.name:''}
        onChange={(e)=>this.onChange('name',e.target.value)} 
        placeholder="Test Name" />
      </div>
      <div className="form-group flex-grow-1">
       <label htmlFor="testDesc" className="font-weight-bold">Description</label>
       <input type="text" className="form-control" 
        id="testDesc" 
        name="desc"
        value={this.state.test.desc?this.state.test.desc:''}
        onChange={(e)=>this.onChange('desc',e.target.value)} 
        placeholder="Description" />
      </div>
     </div>
     <div className="form-row test-detail-row">
      <div className="col-xs-4 col-md-2 form-group">
       <label htmlFor="testCourse" className="font-weight-bold">Course</label>
       <select id="testCourse" 
        name='courseId'
        value={this.state.test.courseId?this.state.test.courseId:''} 
        onChange={(e)=>this.onCourseChange('courseId',e.target.value)} 
        className="custom-select">
        <option>Please Select</option>
        {Array.isArray(this.state.courses)?this.state.courses.map((course,index)=>{
         return <option key={index} value={course.id}>{course.name}</option>;
        }):''}

       </select>
      </div>
      <div className="form-group">
       <label htmlFor="testSubject" className="font-weight-bold">Subject</label>
       <select id="testSubject"
        name='subjectId'
        value={this.state.test.subjectId ? this.state.test.subjectId:''} 
        onChange={(e)=>this.onSubjectChange('subjectId',e.target.value)} 
        className="custom-select">
        <option>Please Select</option>             
        {Array.isArray(this.state.subjects)?this.state.subjects.map((subjects,index)=>{
         return <option key={index} value={subjects.id}>{subjects.name}</option>;
        }):''}
       </select>
      </div>
      <div className="form-group">
       <label htmlFor="testChapter" 
        className="font-weight-bold">Chapter</label>
       <select id="testChapter"
        name="chapterId"
        value={this.state.test.chapterId?this.state.test.chapterId:''}
        onChange={(e)=>this.onChapterChange('chapterId',e.target.value)} 
        className="custom-select" disabled={this.state.test.subjectId?false:true} >
        <option>Please Select</option>
        {Array.isArray(this.state.chapters)?this.state.chapters.map((chapter,index)=>{
         return <option key={index} value={chapter.id}>{chapter.name}</option>;
        }):''}
       </select>
      </div>
     </div>
     <div className="form-row test-detail-row">           
      <div className="form-group flex-grow-1">
       <label htmlFor="instructionsId">Instructions</label>
       <RichTextEditor placeholder="Instructions..." className="form-control" id="instructionsId" readOnly={false}
        value={this.state.test.instructions} tabIndex={0} autoFocus={false}
        onChange={this.handleInstructionChange}   />
      </div>
     </div>   
     
    </form>
   </div>
   <div className="row">
    <div className="flex-grow-1 text-center">     
     <button type="button" 
      onClick={this.onSave}
      className="btn btn-primary">Save Test</button>    
    </div>   
    <div className="mr-4">
     {this.state.test && this.state.test.id?
      <div>Questions Added:
       {this.state.test.questions? this.state.test.questions.length:0}
      </div>
      :''}    
     <Link   
      to={`${this.props.match.url}/add-question/`+this.state.test.id}
      className={(this.state.test.id && !this.state.inProgress)?"btn btn-primary":'btn btn-primary disabled'}
     >
     Add Question
     </Link>
    </div>
   </div>
   <div className="row">
    <div className="col">
     {
      this.state.test.questions && this.state.test.questions.length
       ?<QuestionListComponent
        testId={this.state.test.id}
        questions = {this.state.test.questions}
        onQuestionRemove={this.onQuestionRemove}/>
       :''
     }
    </div>
   </div>
   <div className="row">
    <div className="col-1">
     <button className="btn btn-primary" onClick={this.handleBack}>
      Back
     </button>
    </div>        
   </div>
  </div>
 );
}
    
}