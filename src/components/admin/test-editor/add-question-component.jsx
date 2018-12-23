import React from 'react';
import * as _ from 'lodash';
import { getTestById } from '../../../services/exam-test';
import { getAll, getAllFiltred } from '../../../services/questions/question-service';
import { getSubjectByCourse, getAllSubjects } from '../../../services/ref-data/subject';
import { getChaptersBySubject, getAllChapters } from '../../../services/ref-data/chapter';
import {TestQuestionTableHeader,TestQuestionTableBodyRow} from './add-questions-table-row';
import { getTagsForResource } from '../../../services/tag-service';
import './style.css';

let QuestionListComponent = (props )=>{
 let {questions,filterForm} = props;
 return (
  <div className="container-fluid">
   <div className="row">
    <div className="col">
     <table className="table table-hover">
      <thead>
       <TestQuestionTableHeader />
      </thead>
      <tbody>
       {questions.map((question,index)=>{ 
        let added = _.findIndex(props.testQuestion, q => Number(q.id) === Number(question.id)) > -1 ? true:false;
        return (
         <TestQuestionTableBodyRow key={index} 
          question={question} 
          questionCounter={props.questionCounter}
          onUpdateCounter={props.onUpdateCounter}
          testId={props.testId}
          added={added}
         />); 
       })
       }
      </tbody>
     </table>
    </div>
   </div> 
  </div>
 ); 
};

   
export default class AddQuestionComponent extends React.Component{
state = {
 isError:false,
 message:'Please wait while loading...',
 isSaved:false,
 filter:{
  subjectId:'',
  chapterId:'',
  topicId:'',
  complexityLevelFrom:'',
  complexityLevelTo:'',
  tagIds:[], 
 },
 test:'',
 testId:this.props.testId,
 testName:'',
 questionCounter:0,
 questions:[],
 subjects:[],
 chapters:[],
 topics:[],
 tags:[],
}
componentDidMount=()=>{
 
}
handleBack = ()=>{   
 this.props.history.goBack();
}

onUpdateCounter = (questionCounter)=>{
 this.setState({questionCounter:questionCounter});
}
onQuestionAdd = (id) =>{ 
 this.props.editorProps.onQuestionAdd(id);
};
 onQuestionRemove = (id) =>{
  this.props.editorProps.onQuestionRemove(id);
 };

 getTagValueOptions = (tagName) =>{
  let matchedTags = Array.isArray(this.state.tags)?this.state.tags.filter(tag =>{
   return tagName ===  tag.name;
  }):[];
  return matchedTags ;
 }

 onFilterChange = (fieldName, fieldValue) =>{
  this.setState({filterForm:{...this.state.filterForm, [fieldName]:fieldValue}});
 }

 render(){
  
  return (
   this.state.questions?<div className="container-fluid test-add-question-container">
    <div className="row "> 
     <div className="col-1">
      <button type="button" 
       onClick={this.handleBack}
       className="btn btn-primary">Back</button>
     </div>   
     <div className="col text-center">
      <h2>{this.state.test.name}</h2>     
     </div>
    </div>
    <hr className="divider" />
   
    <div className="row justify-content-center">
     <div className="text-center">      
      {this.state.message?
       <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
        {this.state.message}       
       </div>:''}
     </div>
    </div>
    <div className="row add-question-filter-row">
     <div className="filter-col">
      <span className="filter-label">Subject:</span>
      <span className="filter-value">
       <select className="custom-select"
        name="subjectId"
        value={this.state.filter.subjectId}
        onChange={(e)=>this.onSubjectFilterChange(e.target.value)}
       ><option>Please select</option>
        {Array.isArray(this.state.subjects)?this.state.subjects.map((subject,index)=>{
         return <option key={index} value={subject.id}>{subject.name}</option>;
        }):''}
       </select>
      </span>
     </div>
     <div className=" filter-col">
      <span className="filter-label">Chapter:</span>
      <span className="filter-value">
       <select className="custom-select"
        name="chapterId"
        value={this.state.filter.chapterId}
        onChange={(e)=>this.onChapterFilterChange(e.target.value)}
       >
        <option>Please select</option>
        {Array.isArray(this.state.chapters)?this.state.chapters.map((chapter,index)=>{
         return <option key={index} value={chapter.id}>{chapter.name}</option>;
        }):''}
       </select>
      </span>
     </div>

     <div className=" filter-col">
      <span className="filter-label">Topic:</span>
      <span className="filter-value">
       <select className="custom-select"
        name="topicId"
        value={this.state.filter.topicId}
        onChange={(e) =>this.onFilterChange('topicId',e.target.value)}
       >
        <option>Please select</option>
        {Array.isArray(this.state.topics)?this.state.topics.map((topic,index)=>{
         return <option key={index} value={topic.id}>{topic.name}</option>;
        }):''}
       </select>
      </span>
     </div>

     <div className="filter-col">
      <span className="filter-label">Complexity From:</span>
      <span className="filter-value">
       <select className="custom-select">
        <option>Please select</option>
        <option value="1">2</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>       
       </select>
      </span>
     </div>

     <div className="filter-col">
      <span className="filter-label">Complexity To:</span>
      <span className="filter-value">
       <select className="custom-select">
        <option>Please select</option>
        <option value="1">2</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>       
       </select>
      </span>
     </div>

    </div>
    <div className="row justify-content-end mr-4">
     <div>
             Questions Added :{this.state.questionCounter}
     </div>
    </div>
    <div className="row">
     <div className="col">
      <QuestionListComponent 
       questions = {this.state.questions}
       testQuestion={this.state.test?this.state.test.questions:''}
       testId = {this.props.testId}
       questionCounter={this.state.questionCounter}
       onUpdateCounter={this.onUpdateCounter}
       filterForm = {this.state.filterForm}
      />
     </div>    
    </div>   
    <div className="row">
     <div className="col">
      <button type="button" 
       onClick={this.handleBack}
       className="btn btn-primary">Back</button>   
     </div>
    </div>
   </div>:'Loading question...'
  );      
 }

}