import React from 'react';
import * as _ from 'lodash';
import {Value} from 'slate';
import RichTextEditor from '../rich-text-editor/container';
import './style.css';
import { Prompt } from 'react-router';
import ErrorBoundary from '../../error-handler/global-error';
import {getAllSubjects} from '../../../services/ref-data/subject';
import {getChaptersBySubject} from '../../../services/ref-data/chapter';
import {getTopicsByChapter} from '../../../services/ref-data/topic';
import {defaultValues} from './initial-value';
import { saveQuestion, getQuestionById , getAllChoices, getAnswer } from '../../../services/questions/question-service';

let defaultValue={
 document: {
  nodes: [
   {
    object: 'block',
    type: 'paragraph',
    nodes: [
     {
      object: 'text',
      leaves: [
       {
        text: '',
       },
      ],
     },
    ],
   },
  ],
 },
};
let convertQuestionToSave = (question)=>{
 let questionDetailToSave = _.cloneDeep(question);
 questionDetailToSave.desc = JSON.stringify(questionDetailToSave.desc.toJSON());
 questionDetailToSave.optionA = JSON.stringify(questionDetailToSave.optionA.toJSON());
 questionDetailToSave.optionB = JSON.stringify(questionDetailToSave.optionB.toJSON());
 questionDetailToSave.optionC = JSON.stringify(questionDetailToSave.optionC.toJSON());
 questionDetailToSave.optionD = JSON.stringify(questionDetailToSave.optionD.toJSON()); 
 questionDetailToSave.explanation = JSON.stringify(questionDetailToSave.explanation.toJSON()); 
 return questionDetailToSave;
};

let convertQuestionToEditor = (question)=>{
 let questionDetailToEditor =  _.cloneDeep(question);
 questionDetailToEditor.desc = Value.fromJSON(JSON.parse(question.desc)) ;//JSON.stringify(questionDetailToEditor.desc.toJSON());
 questionDetailToEditor.optionA = Value.fromJSON(JSON.parse(questionDetailToEditor.optionA));
 questionDetailToEditor.optionB = Value.fromJSON(JSON.parse(questionDetailToEditor.optionB));
 questionDetailToEditor.optionC = Value.fromJSON(JSON.parse(questionDetailToEditor.optionC));
 questionDetailToEditor.optionD = Value.fromJSON(JSON.parse(questionDetailToEditor.optionD)); 
 questionDetailToEditor.explanation = questionDetailToEditor.explanation?Value.fromJSON(JSON.parse(questionDetailToEditor.explanation)):
  Value.fromJSON(defaultValue); 
 return questionDetailToEditor;
};

 
export default class QuestionEditorComponent extends React.Component{
state={
 isError:false,
 message:'',
 editInProgress:false,
 savingInProgress:false,
 question:defaultValues,
 subjects:[],
 chapters:[],
 topics:[],
 questionChoices:[],
}
componentDidMount = ()=>{
 if(this.props.questionId){
  getQuestionById(this.props.questionId)
   .then(data =>{
    getAnswer(this.props.questionId)
     .then(answerData =>{
      let questionForEditor = convertQuestionToEditor(data.question);
      questionForEditor.answer = answerData.answerKey.answer;
      questionForEditor.explanation = answerData.answerKey.explanation?Value.fromJSON(JSON.parse(answerData.answerKey.explanation)):
       Value.fromJSON(defaultValue);  
      this.setState({question:questionForEditor});
     });     
    if(data.question.subjectId){
     getChaptersBySubject(data.question.subjectId)
      .then(chapterData =>{
       if(data.question.chapterId){
        getTopicsByChapter(data.question.chapterId)
         .then(topicsData =>{
          this.setState({chapters:chapterData.chapters, topics:topicsData.topics});
         })
         .catch();
       }else{
        this.setState({chapters:chapterData.chapters});
       }
      })
      .catch();
    }
   });
 }
 getAllChoices().then(resp =>{
  this.setState({isError:false,questionChoices:resp.choices});
 }).catch(error =>{
  this.setState({isError:true,message:error.message});
 });
 getAllSubjects()
  .then( data =>{
   this.setState({isError:false,subjects:data.subjects});
  })
  .catch(error =>{
   this.setState({isError:true,message:error.message});
  });
}
handleOnSubjectChange = (subjectId)=>{ 
 if(Number.isNaN(Number(subjectId)))
 {
  this.setState({question:{...this.state.question,
   subjectId:'',
   chapterId:'',
   topicId:''},
  chapters:[],
  topics:[]});
  return ;
 }

 getChaptersBySubject(subjectId)
  .then(data =>{    
   this.setState({question:{...this.state.question,
    subjectId:subjectId,
    chapterId:'',
    topicId:''},
   chapters:data.chapters,
   topics:[]});
  });
 
}
onTopicChange = (field,value)=>{
 if(Number.isNaN(Number(value))){
  this.setState({editInProgress:true,question:{...this.state.question,topicId:''}});
  return;
 } 
 this.setState({editInProgress:true,question:{...this.state.question,[field]:value}});
}
handleOnChapterChange = (chapterId)=>{  
 if(Number.isNaN(Number(chapterId)))
 {
  this.setState({question:{...this.state.question,
   chapterId:'',
   topic:''},   
  topics:[]});
  return ;
 }
  
 if(chapterId){
  getTopicsByChapter(chapterId).then(data =>{
   this.setState({question:{...this.state.question,
    chapterId:chapterId,
    topicId:''},
   topics:data.topics});
  });
 }    
}  

 

 onQuestionDescChange=({value})=>{ 
  let editInProgress =this.state.editInProgress || (value.document.text !== this.state.question.desc.document.text); 
  this.setState({editInProgress:editInProgress,question:{...this.state.question,desc:value}});  
 };
 onOptionADescChange=({value})=>{
  let editInProgress =this.state.editInProgress || (value.document.text !== this.state.question.optionA.document.text);   
  this.setState({editInProgress:editInProgress,question:{...this.state.question,optionA:value}}); 
 };
 onOptionBDescChange=({value})=>{
   
  let editInProgress = this.state.editInProgress || (value.document.text !== this.state.question.optionB.document.text);
  this.setState({editInProgress:editInProgress,question:{...this.state.question,optionB:value}}); 
 };
 onOptionCDescChange=({value})=>{
   
  let editInProgress =this.state.editInProgress || (value.document.text !== this.state.question.optionC.document.text);
  this.setState({editInProgress:editInProgress,question:{...this.state.question,optionC:value}});
 };
 onOptionDDescChange=({value})=>{
   
  let editInProgress =this.state.editInProgress || (value.document.text !== this.state.question.optionD.document.text);
  this.setState({editInProgress:editInProgress,question:{...this.state.question,optionD:value}});
 };
 onExplanationChange=({value})=>{   
  let editInProgress =this.state.editInProgress || (value.document.text !== this.state.question.explanation.document.text);
  this.setState({editInProgress:editInProgress,question:{...this.state.question,explanation:value}});
 };

 handleOnChange=(field,value)=>{
  this.setState({editInProgress:true,question:{...this.state.question,[field]:value}});
 };
 handleAddTag = ()=>{
  let updatedTags  = _.cloneDeep(this.state.question.tags);
  if(updatedTags && Array.isArray(updatedTags)){
   updatedTags.push({name:'',value:''});
  }else{
   updatedTags=[{name:'',value:''}] ;
  }
  
  this.setState({editInProgress:true,question:{...this.state.question,tags:updatedTags}});
 };
 handleTagChange = (name,value,index)=>{  
  let updatedTags  = _.cloneDeep(this.state.question.tags);
  updatedTags[index] = {...updatedTags[index],[name]:value};
  this.setState({editInProgress:true,question:{...this.state.question,tags:updatedTags}});

 };
 handleTagDelete = (index)=>{
  let updatedTags  = _.cloneDeep(this.state.question.tags);
  updatedTags.splice(index,1);
  this.setState({editInProgress:true,question:{...this.state.question,tags:updatedTags}});
 }
 handleBack = ()=>{   
  this.props.history.goBack();
 }
handleSave = ()=>{  
 let questionToSave = convertQuestionToSave(this.state.question);
 saveQuestion(questionToSave)
  .then(data=>{

   this.props.history.goBack();
   
   
  })
  .catch(data =>{
   this.setState({savingInProgress:false,isError:true,message:data.message});
  });
 window.scroll(0,0);
 this.setState({savingInProgress:true});
}

render(){
 let {question} = this.state; 

 let subjectOptionHtml = Array.isArray(this.state.subjects)?this.state.subjects.map((subject,index)=>{
  return (<option key={index} value={subject.id}>{subject.name}</option>);
 }):'';

 let chapterOptionHtml = Array.isArray(this.state.chapters)?this.state.chapters.map((chapter,index)=>{
  return (<option key={index} value={chapter.id}>{chapter.name}</option>);
 }):'';

 let topicOptionHtml = Array.isArray(this.state.topics)?this.state.topics.map((topic,index)=>{
  return (<option key={index} value={topic.id}>{topic.name}</option>);
 }):'';

 let typeOptionHtml = '';
 if(Array.isArray(this.state.questionChoices)){
  typeOptionHtml = this.state.questionChoices.map((type)=>{
   return (<option key={type.id} value={type.id}>{type.name}</option>);
  });
 }
 
 
 let questionsTags = Array.isArray(question.tags)?question.tags.map((tag, index)=>{
  return(
   <div key={index} className="row align-items-center"> 
    <div className="col col-md-4">
     <div className="form-group">
      <label htmlFor={"tagNameId_"+tag.name}>Tag Name</label>
      <input  id={"tagNameId_"+tag.name} className="form-control"
       name={tag.name}
       value={tag.name}
       onChange={(e2)=>this.handleTagChange('name',e2.target.value,index)}
      />    
     </div>
    </div>
    <div className="col-12 col-xs-12 col-md-4">
     <div className="form-group">
      <label htmlFor={"tagValueId_"+tag.value}>Tag Value</label>
      <input  id={"tagValueId_"+tag.value} className="form-control"
       name={tag.value}
       value={tag.value}
       onChange={(e1)=>this.handleTagChange('value',e1.target.value,index)}
      />    
     </div>
    </div>    
    <div  key={index +'_'+ tag.name} className="col-12 col-md-4">
     <button type="button" className="btn btn-danger"
      onClick={()=>this.handleTagDelete(index)}>Delete Tag</button>
    </div>
   </div>);
 }):"";
 return (
  <div className="container-fluid question-editor-container">
   <div className="row question-editor-heading-row"> 
    <button className="btn btn-primary" onClick={this.handleBack}>
      Back
    </button>   
    <div className="question-editor-heading">Question Editor</div>
   </div>
   <hr className="divider mt-0"></hr>
   {this.state.savingInProgress?
    <div className="row">
     <div className=" text-center ">Saving question....</div>
    </div>
    :
    <div className="row justify-content-center">
     <div className="text-center">      
      {this.state.message?
       <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
        {this.state.message}       
       </div>:''}
     </div>
    </div>
   } 
   <form>
    {/* Row 1 Start */}
    <div className="form-row">
     {/* Row 1 Subject col */}     
     <div className="form-group">
      <label htmlFor="subjectId">Subject *</label>
      <select  id="subjectId" className="custom-select" 
       tabIndex={0} autoFocus={true}
       name="subjectId"
       value={question.subjectId?question.subjectId:''}
       onChange={(e)=>this.handleOnSubjectChange(e.target.value)}        >
       <option >Please select</option>
       {subjectOptionHtml}    
      </select>               
     </div> 
     <div className="form-group">
      <label htmlFor="chapterId">Chapter</label>
      <select  id="chapterId" className="custom-select" 
       tabIndex={0}
       name="chapterId"
       value={question.chapterId?question.chapterId:''}
       onChange={(e)=>this.handleOnChapterChange(e.target.value)}        >
       <option>Please select</option>
       {chapterOptionHtml}    
      </select>               
     </div> 
     <div className="form-group">
      <label htmlFor="topicId">Topic</label>
      <select  id="topicId" className="custom-select" 
       tabIndex={0}
       name="topicId"
       value={question.topicId?question.topicId:''}
       onChange={(e)=>this.onTopicChange('topicId',e.target.value)}        >
       <option>Please select</option>
       {topicOptionHtml}    
      </select>               
     </div>

     <div className="form-group">
      <label htmlFor="complexityLavel">Complexity Level</label>
      <select  id="complexityLavel" className="custom-select" 
       tabIndex={0}
       name="complexityLevel"
       value={question.complexityLevel?question.complexityLevel:''}
       onChange={(e)=>this.handleOnChange('complexityLevel',e.target.value)}        >
       <option>Please select</option>
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>
       <option value="6">6</option>
         
      </select>               
     </div>

    </div>
    {/* Row 1 End */}
    {/* Row 2 Start */}
    <div className="form-row">           
     <div className="form-group flex-grow-1">
      <label htmlFor="descId">Question Description *</label>
      <ErrorBoundary>
       <RichTextEditor className="form-control" id="questionDesc" readOnly={false}
        value={question.desc} tabIndex={0} autoFocus={false}
        onChange={this.onQuestionDescChange}   />
      </ErrorBoundary>
     </div>
    </div>   
    {/* Row 2 End */}
    {/* Row 3 Start */}
    <div className="form-row">
     <div className="form-group">
      <label htmlFor="typeId">Question type *</label>
      <select  id="typeId" className="custom-select" tabIndex={0} autoFocus={false}
       name="typeId"
       value={question.typeId?question.typeId:''}
       onChange={(e)=>this.handleOnChange('typeId',e.target.value)}
      >
       <option >Please select</option>
       {typeOptionHtml}    
      </select>        
     </div>
    </div>
    {/* Row 3 End */}

    {/* Question Options Start */}
    <div className="form-row">
     <div className="form-group  flex-grow-1">
      <label className="mb-0" htmlFor="optionA">A *:</label>
      <ErrorBoundary>
       <RichTextEditor id="optionA" readOnly={false}
        tabIndex={0} autoFocus={false}
        value={question.optionA} 
        onChange={this.onOptionADescChange}/>
      </ErrorBoundary>
     </div>
    </div>

    <div className="form-row">
     <div className="form-group  flex-grow-1">
      <label className="mb-0" htmlFor="optionB">B *:</label>
      <ErrorBoundary>
       <RichTextEditor id="optionB" readOnly={false}  
        tabIndex={0} autoFocus={false}
        value={question.optionB} onChange={this.onOptionBDescChange}/> 
      </ErrorBoundary> 
     </div>
    </div>

    <div className="form-row">
     <div className="form-group  flex-grow-1">
      <label className="mb-0 " htmlFor="optionC">C *:</label>
      <ErrorBoundary>
       <RichTextEditor id="optionC" readOnly={false} 
        tabIndex={0} autoFocus={false}
        value={question.optionC} 
        onChange={this.onOptionCDescChange}/> 
      </ErrorBoundary>
     </div>
    </div>

    <div className="form-row">
     <div className="form-group  flex-grow-1">
      <label className="mb-0" htmlFor="optionD">D *:</label>
      <ErrorBoundary>
       <RichTextEditor id="optionD" readOnly={false} 
        tabIndex={0} autoFocus={false}
        value={question.optionD} 
        onChange={this.onOptionDDescChange}/> 
      </ErrorBoundary>
     </div>
    </div>

    <div className="form-row">
     <div className="form-group">
      <label className="mb-0" htmlFor="answerId">Correct Answer:</label>
      <select id="answerId" className="custom-select"
       value={this.state.question.answer?this.state.question.answer:''}
       onChange={(e)=>this.handleOnChange('answer',e.target.value)}
      >
       <option >Please select</option>
       <option value="A">A</option>
       <option value="B">B</option>
       <option value="C">C</option>
       <option value="D">D</option>
      </select>
     </div>
    </div>

    <div className="form-row">
     <div className="form-group  flex-grow-1">
      <label className="mb-0" htmlFor="explanationId">Answer Explanation:</label>
      <ErrorBoundary>
       <RichTextEditor id="explanationId" readOnly={false} 
        tabIndex={0} autoFocus={false}
        value={question.explanation} 
        onChange={this.onExplanationChange}/> 
      </ErrorBoundary>
     </div>
    </div>

    {/* Question Options End */}
    {questionsTags}

    <div className="form-row">
     <div className="col-3"> 
      <button type="button" className="btn btn-secondary"
       onClick={this.handleAddTag}
      >Add New Tag</button>
     </div>
    </div>

    <div className="form-row  mt-1">
     <div className="col-1">
      <button type="button" className="btn btn-primary" onClick={this.handleBack}>
      Back
      </button>
     </div>
     <div className="col text-center"> 
      <button type="button" className="btn btn-primary"
       data-toggle="modal" data-target="#progressBarMessageModal"        
       onClick={this.handleSave}       
      >Save</button>
     </div>          
    </div>
   </form>
  </div>
 );}
};
