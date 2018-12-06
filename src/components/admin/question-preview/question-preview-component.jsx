import React from 'react';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';
import {Value} from 'slate';
import './style.css';
import RichTextEditor from '../rich-text-editor/container';
import {getAnswer, getQuestionById } from '../../../services/questions/question-service';


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

export default class QuestionPreviewComponent extends React.Component{
state={
 isError:false,
 message:'Loading question detail',
 question:''
}

componentWillReceiveProps = (props ) =>{
 window.scroll(0,0);
 if(props.questionId){
  getQuestionById(props.questionId)
   .then(data =>{
    getAnswer(props.questionId)
     .then(answerData =>{
      let questionForEditor = convertQuestionToEditor(data.question);
      questionForEditor.answer = answerData.answerKey.answer;
      questionForEditor.explanation = answerData.answerKey.explanation?Value.fromJSON(JSON.parse(answerData.answerKey.explanation)):
       Value.fromJSON(defaultValue);     
      this.setState({question:questionForEditor});
     })
     .catch(error =>{
      this.setState({isError:true,message:error.message});
     });   
   }
   )
   .catch(error =>{
    this.setState({isError:true,message:error.message});
   }); ;
 }
}
componentDidMount = ()=>{

 this.componentWillReceiveProps(this.props);
}

handleBack = ()=>{   
 this.props.history.goBack();
}

render(){
 window.scroll(0,0);
 let {question} = this.state;
 if( !question )  {
  return  <div className="row justify-content-center">
   <div className="text-center">      
    {this.state.message?
     <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
      {this.state.message}       
     </div>:''}
   </div>
  </div>;
 }
 let questionsTags = Array.isArray(question.tags)?question.tags.map((tag, index)=>{
  return(
   <div key={index} className="question-preview-detail-row"> 
    <div className="col question-preview-detail-col">
     <span className="question-preview-detail-label">{tag.name}</span> :     
     <span className="question-preview-detail-value">{tag.value}</span> 
    </div> 
   </div>);
 }):"";
 return (
  <div className="container-fluid question-preview-container">
   <div className="row question-preview-heading-row">
    <div className="col-1">
     <button className="btn btn-primary" onClick={this.handleBack}>
      Back
     </button>   
    </div>     
    <div className="question-preview-heading">Question Preview</div>
    <div className="col-1">
     <Link  className="btn btn-primary" to={`${this.props.match.url}/edit-question`}>
      Edit
     </Link>
    </div>
   </div>
   <hr className="divider mt-0"></hr>   
   <form>
    {/* Row 1 Start */}
    
    <div className="form-row question-preview-detail-row">
     {/* Row 1 Subject col */} 
     <div className="form-group question-preview-detail-col">
      <span className='question-preview-detail-label'>Question Id:</span>
      <span className='question-preview-detail-value'>{question?question.id:'N/A'} </span>
     </div> 
     <span className="col-divider"></span>  
     <div className="form-group question-preview-detail-col">
      <span className='question-preview-detail-label'>Subject:</span>
      <span className='question-preview-detail-value'>{question.subjectName?question.subjectName:'N/A'} </span>
     </div> 
     <span className="col-divider"></span>
     <div className="form-group question-preview-detail-col">      
      <span className='question-preview-detail-label'>Chapter:</span>
      <span className='question-preview-detail-value'>{question.chapterName?question.chapterName:'N/A'} </span>          
     </div> 
     <span className="col-divider"></span>
     <div className="form-group question-preview-detail-col">
      <span className='question-preview-detail-label'>Topic:</span>
      <span className='question-preview-detail-value'>{question.topicName?question.topicName:'N/A'} </span>          
     </div>
     <span className="col-divider"></span>
     <div className="form-group question-preview-detail-col">
      <span className='question-preview-detail-label'>Complexity Level:</span>
      <span className='question-preview-detail-value'>{question.complexityLevel?question.complexityLevel:'N/A'} </span>          
     </div>
     <span className="col-divider"></span>
     <div className="form-group question-preview-detail-col">
      <span className='question-preview-detail-label'>Question Type:</span>
      <span className='question-preview-detail-value'>{question.typeName?question.typeName:'N/A'} </span>          
             
     </div>

    </div>
    {/* Row 1 End */}
    {/* Row 2 Start */}
    <div className="form-row question-preview-detail-row">           
     <div className="form-group row question-preview-detail-col">      
      <span className='question-preview-detail-label'>Question Description:</span>
      <span className='question-preview-detail-value'>
       <RichTextEditor id="questionDesc" readOnly={true}
        value={question.desc}  /></span>
     
     </div>
    </div>
    {/* Row 2 End */}
    
    {/* Question Options Start */}
    <div className="form-row question-preview-detail-row">
     <div className={" row question-preview-detail-col "+ (question.answer === 'A'?' correct-answer ':'')}>      
      <span className='question-preview-detail-label'>A:</span>
      <span className='question-preview-detail-value '>
       <RichTextEditor id="optionA" readOnly={true}       
        value={question.optionA} />
      </span>
     
     </div>
    </div>

    <div className="form-row question-preview-detail-row">
     <div className={" row question-preview-detail-col "+ (question.answer === 'B'?' correct-answer ':'')}>
      <span className='question-preview-detail-label'>B:</span>
      <span className='question-preview-detail-value'>
       <RichTextEditor id="optionB" readOnly={true}       
        value={question.optionB} />
      </span>
         
     </div>
    </div>

    <div className="form-row question-preview-detail-row">
     <div className={" row question-preview-detail-col "+ (question.answer === 'C'?' correct-answer ':'')}>
      <span className='question-preview-detail-label'>C:</span>
      <span className='question-preview-detail-value'>
       <RichTextEditor id="optionC" readOnly={true}       
        value={question.optionC} />
      </span>
         
     </div>
    </div>

    <div className="form-row question-preview-detail-row">
     <div className={"row question-preview-detail-col "+ (question.answer === 'D'?' correct-answer ':'')}>
      <span className='question-preview-detail-label'>D:</span>
      <span className='question-preview-detail-value'>
       <RichTextEditor id="optionD" readOnly={true}       
        value={question.optionD} />
      </span>
        
     </div>
    </div>

    <div className="form-row question-preview-detail-row">
     <div className={"row question-preview-detail-col "}>
      <span className='question-preview-detail-label'>Explanation:</span>
      <span className='question-preview-detail-value'>
       <RichTextEditor id="explanation" readOnly={true}       
        value={question.explanation} />
      </span>
        
     </div>
    </div>


    <div className="form-row question-preview-detail-row">
     <div className="form-group question-preview-detail-col">
      <span className='question-preview-detail-label'>Tags:</span>
      <span className='question-preview-detail-value'>
       {questionsTags}</span>
     </div>
    </div>

   
    <div className="form-row  mt-1">
     <div className="col-1">
      <button type="button" className="btn btn-primary" onClick={this.handleBack}>
      Back
      </button>
     </div>
     <div className="col text-center">
      <Link  className="btn btn-primary" to={`${this.props.match.url}/edit-question`}>
      Edit
      </Link>
     </div>               
    </div>
   </form>
  </div>
 );}
};
