import React from 'react';
import * as _ from 'lodash';
import { Prompt } from 'react-router';
import {Value} from 'slate';
import RichTextEditor from '../rich-text-editor/container';
import {saveTestSerise,removeQuestionFromTestSeries} from '../../../services/test-series';
import {Link} from 'react-router-dom';
import './style.css';
import QuestionListComponent from './test-series-question-table';
import { loadData, loadChapters, loadAllSubjects } from './helper';
import { getAllSubjects } from '../../../services/ref-data/subject';
 
export default class TestSeriesEditorComponent extends React.Component{
    state = {
     message:'Please wait while loading...',
     isError:false,
     inProgress:false,
     testSeries:{
      name:'',
      desc:'',
      courseId:'',
      courseName:'',
      subjectId:'',
      subjectName:'',
      chapterId:'',
      chapterName:'',
      instructions:'',
      eachQuestionMark:0,
      questions:[]       
     },
     courses:[],
     subjects:[],
     chapters:[],
    };
componentWillMount = ()=>{
 loadData(this.props,this);
}
onChange = (fieldName,fieldValue)=>{     
 this.setState(
  {
   inProgress:true,
   testSeries:{...this.state.testSeries,[fieldName]:fieldValue}});
};
    
onSubjectChange = (fieldName,fieldValue)=>{
 if(Number.isNaN(Number(fieldValue))){
  this.setState({inProgress:true,testSeries:{...this.state.testSeries,subjectId:'',chapterId:''}});
  return;
 }
 loadChapters(fieldName,fieldValue,this);
 
}
onChapterChange = (fieldName,fieldValue)=>{
 if(Number.isNaN(Number(fieldValue))){
  this.setState({inProgress:true,testSeries:{...this.state.testSeries,chapterId:''}});
  return;
 }
 this.setState({inProgress:true,testSeries:{...this.state.testSeries,chapterId:fieldValue}});
}
onCourseChange = (fieldName,fieldValue)=>{
 if(Number.isNaN(Number(fieldValue))){ 
  getAllSubjects()
   .then(data =>{
    this.setState({inProgress:true,subjects:data.subjects,
     testSeries:{...this.state.testSeries,courseId:'',subjectId:'',chapterId:''}});
   }).catch(error =>{
    this.setState({isError:true,message:error.message});
   });
  return;
 }       
 loadAllSubjects(fieldName,fieldValue,this);
};
onQuestionRemove = (seriesId,questionId) =>{ 
 removeQuestionFromTestSeries(seriesId,questionId)
  .then(data =>{
   this.setState(
    {inProgress:false,
     testSeries:data.testSeries});
  })
  .catch(error =>{
   this.setState(
    {inProgress:true,
     isError:true,
     message:error.message});
  });
 
}
    
onSave = ()=>{
 let testSeries = this.state.testSeries;
 let instructions ='';
 if(Value.isValue(testSeries.instructions)){
  instructions = testSeries.instructions.toJSON();
  testSeries.instructions = JSON.stringify(instructions);   
 }   
 window.scroll(0,0);      
 saveTestSerise(this.state.testSeries).then(({testseries,message})=>{      
  this.setState({
   inProgress:false,
   message:message,
   testSeries:testseries
  });
 })
  .catch(error =>{
   this.setState({isError:true,message:error.message});
  });
}

handleBack = ()=>{   
 this.props.history.goBack();
}
handleInstructionChange =(change)=>{
 let testSeries = this.state.testSeries;
 testSeries.instructions=change.value;
 this.setState({testSeries:testSeries});  
}

    
render(){   
  
 return (      
  <div className="container-fluid test-series-container">
   <div className="row test-series-heading-row">
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
    <div className="test-series-heading">
     <h2>Test Series Editor</h2>
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
     <div className="form-row series-detail-row">
      <div className="seq-order-col">
       <label htmlFor="seqOrderId">Seq Order: </label>
       <div className="form-group">        
        <input type="text"
         id="seqOrderId"
         className="form-control"
         name="seqOrder"
         value={this.state.testSeries.seqOrder?this.state.testSeries.seqOrder:''}
         onChange={(e)=>this.onChange('seqOrder', e.target.value)}
        ></input>
       </div>
      </div>
      <div className="duration-col pl-2 pr-2">
       <div className="form-group">    
        <label htmlFor="durationHourId">Duration:</label> 
        <div className="d-flex">  
         <input type="text"
          id="durationHourId"
          className="form-control"
          name="durationHour"
          value={this.state.testSeries.durationHour?this.state.testSeries.durationHour:''}
          onChange={(e)=>this.onChange('durationHour', e.target.value)}
         /> <span htmlFor="durationMinutesId" className=" ml-1">Hours</span> 
         <input type="text"
          id="durationMinutesId"
          className="form-control ml-2"
          name="durationMinutes"
          value={this.state.testSeries.durationMinutes?this.state.testSeries.durationMinutes:''}
          onChange={(e)=>this.onChange('durationMinutes', e.target.value)}
         /> <span className=" ml-1">Minutes</span>          
        </div> 
       </div>  
      </div>
      <div>
       <label htmlFor="correctAnsMarksId">Marks/Correct Answer:</label>      
       <div className="form-group">              
        <input type="text"
         id="correctAnsMarksId"
         className="form-control"
         name="correctAnsMarks"
         value={this.state.testSeries.correctAnsMarks?this.state.testSeries.correctAnsMarks:''}
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
         value={this.state.testSeries.wrongAnsMarks?this.state.testSeries.wrongAnsMarks:''}
         onChange={(e)=>this.onChange('wrongAnsMarks', e.target.value)}
        ></input>
       </div>
      </div>
     </div> 
     <div className="form-row series-detail-row">
      <div className="form-group">
       <label htmlFor="testSeriesName" 
        className="font-weight-bold">Name
       </label>
       <input type="text" className="form-control" 
        id="testSeriesNane"
        name="name"
        value={this.state.testSeries.name?this.state.testSeries.name:''}
        onChange={(e)=>this.onChange('name',e.target.value)} 
        placeholder="Test Series Name" />
      </div>
      <div className="form-group flex-grow-1">
       <label htmlFor="testSeriesDesc" className="font-weight-bold">Description</label>
       <input type="text" className="form-control" 
        id="testSeriesDesc" 
        name="desc"
        value={this.state.testSeries.desc?this.state.testSeries.desc:''}
        onChange={(e)=>this.onChange('desc',e.target.value)} 
        placeholder="Description" />
      </div>
     </div>
     <div className="form-row series-detail-row">
      <div className="form-group">
       <label htmlFor="testSeriesCourse" className="font-weight-bold">Course</label>
       <select id="testSeriesCourse" 
        name='courseId'
        value={this.state.testSeries.courseId?this.state.testSeries.courseId:''} 
        onChange={(e)=>this.onCourseChange('courseId',e.target.value)} 
        className="custom-select">
        <option>Please Select</option>
        {this.state.courses.map((course,index)=>{
         return <option key={index} value={course.id}>{course.name}</option>;
        })}

       </select>
      </div>
      <div className="form-group">
       <label htmlFor="testSeriesSubject" className="font-weight-bold">Subject</label>
       <select id="testSeriesSubject"
        name='subjectId'
        value={this.state.testSeries.subjectId ? this.state.testSeries.subjectId:''} 
        onChange={(e)=>this.onSubjectChange('subjectId',e.target.value)} 
        className="custom-select">
        <option>Please Select</option>             
        {Array.isArray(this.state.subjects)?this.state.subjects.map((subjects,index)=>{
         return <option key={index} value={subjects.id}>{subjects.name}</option>;
        }):''}
       </select>
      </div>
      <div className="form-group">
       <label htmlFor="testSeriesChapter" 
        className="font-weight-bold">Chapter</label>
       <select id="testSeriesChapter"
        name="chapterId"
        value={this.state.testSeries.chapterId?this.state.testSeries.chapterId:''}
        onChange={(e)=>this.onChapterChange('chapterId',e.target.value)} 
        className="custom-select" disabled={this.state.testSeries.subjectId?false:true} >
        <option>Please Select</option>
        {Array.isArray(this.state.chapters)?this.state.chapters.map((chapter,index)=>{
         return <option key={index} value={chapter.id}>{chapter.name}</option>;
        }):''}
       </select>
      </div>
     </div>
     <div className="form-row series-detail-row">           
      <div className="form-group flex-grow-1">
       <label htmlFor="instructionsId">Instructions</label>
       <RichTextEditor placeholder="Instructions..." className="form-control" id="instructionsId" readOnly={false}
        value={this.state.testSeries.instructions} tabIndex={0} autoFocus={false}
        onChange={this.handleInstructionChange}   />
      </div>
     </div>   
     
    </form>
   </div>
   <div className="row">
    <div className="flex-grow-1 text-center">     
     <button type="button" 
      onClick={this.onSave}
      className="btn btn-primary">Save Test Series</button>    
    </div>   
    <div className="mr-4">
     {this.state.testSeries && this.state.testSeries.id?
      <div>Questions Added:
       {this.state.testSeries.questions? this.state.testSeries.questions.length:0}
      </div>
      :''}    
     <Link   
      to={`${this.props.match.url}/add-question/`+this.state.testSeries.id}
      className={(this.state.testSeries.id && !this.state.inProgress)?"btn btn-primary":'btn btn-primary disabled'}
     >
     Add Question
     </Link>
    </div>
   </div>
   <div className="row">
    <div className="col">
     {
      this.state.testSeries.questions && this.state.testSeries.questions.length
       ?<QuestionListComponent
        seriesId={this.state.testSeries.id}
        questions = {this.state.testSeries.questions}
        onQuestionRemove={this.onQuestionRemove}/>
       :this.state.message
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