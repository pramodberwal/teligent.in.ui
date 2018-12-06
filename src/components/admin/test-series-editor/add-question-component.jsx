import React from 'react';
import * as _ from 'lodash';
import { getTestSeriseById } from '../../../services/test-series';
import { getAll, getAllFiltred } from '../../../services/questions/question-service';
import { getSubjectByCourse, getAllSubjects } from '../../../services/ref-data/subject';
import { getChaptersBySubject, getAllChapters } from '../../../services/ref-data/chapter';
import {TestSeriesQuestionTableHeader,TestSeriesQuestionTableBodyRow} from './add-questions-table-row';
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
       <TestSeriesQuestionTableHeader />
      </thead>
      <tbody>
       {questions.map((question,index)=>{ 
        let added = _.findIndex(props.seriesQuestion, q => Number(q.id) === Number(question.id)) > -1 ? true:false;
        return (
         <TestSeriesQuestionTableBodyRow key={index} 
          question={question} 
          questionCounter={props.questionCounter}
          onUpdateCounter={props.onUpdateCounter}
          seriesId={props.seriesId}
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

let mapStateToProps = (state)=>{
 return state;
};

let mapDispatchToProps = (dispatch)=>{
 return {
  
 };
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
 testSeries:'',
 testSeriesId:this.props.seriesId,
 testSeriesName:'',
 questionCounter:0,
 questions:[],
 subjects:[],
 chapters:[],
 topics:[],
 tags:[],
}
componentDidMount=()=>{
 getTestSeriseById(this.props.seriesId)
  .then(testSeriesData =>{
   let testSeries = testSeriesData.testSeries;
   let filter = {...this.state.filter,subjectId:testSeries.subjectId};
   if(!testSeries.courseId || Number.isNaN(testSeries.courseId)){
    getAllSubjects()
     .then(data =>{
      this.setState({subjects:data.subjects});
     })
     .catch(error =>{
      this.setState({isError:true, message:error.message});
     });
   }else{
    getSubjectByCourse(testSeries.courseId)
     .then(data =>{
      this.setState({subjects:data.subjects});
     })
     .catch(error =>{
      this.setState({isError:true, message:error.message});
     });
   }
   
   if( testSeries.subjectId != null && !Number.isNaN(testSeries.subjectId)){    
    getChaptersBySubject(testSeries.subjectId)
     .then(data =>{
      this.setState({chapters:data.chapters});
     })
     .catch(error =>{
      this.setState({isError:true, message:error.message});
     });
   }
   
   getAllFiltred(filter,0).then(data =>{  
    getTagsForResource('question')
     .then(resp =>{
      this.setState({isError:false, message:'',
       testSeries:testSeries,
       tags:resp.tags,
       questionCounter:testSeries && Array.isArray(testSeries.questions)?testSeries.questions.length:0,
       questions:data.questions
      });  
     })
     .catch(error =>{
      this.setState({isError:true,message:error.message,questions:data.questions});  
     });
   });
  })
  .catch(error =>{
   this.setState({isError:true,message:error.message});  
  });
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
   this.state.questions?<div className="container-fluid test-series-add-question-container">
    <div className="row "> 
     <div className="col-1">
      <button type="button" 
       onClick={this.handleBack}
       className="btn btn-primary">Back</button>
     </div>   
     <div className="col text-center">
      <h2>{this.state.testSeries.name}</h2>     
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
       seriesQuestion={this.state.testSeries?this.state.testSeries.questions:''}
       seriesId = {this.props.seriesId}
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