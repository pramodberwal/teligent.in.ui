import React from 'react';
import {Value} from 'slate';
import * as _ from 'lodash';
import {getComplexityLevel} from '../../helper/util';
import RichTextEditor from '../rich-text-editor/container';

function checkQuestionAlreadyAdded(questions, questionId){
 return _.findIndex(questions, q=> Number(q.id) === Number(questionId)) > -1;
}

let TableHeadingRow =(props)=>{
 

 return <tr>
  <th scope="col">Sr Num</th>
  <th  scope="col" className="question-desc-col">Description</th>
  <th scope="col">Action</th>
 </tr>;
};

class TableBodyRow extends React.Component{    
 render(){ 
  let props = this.props; 
  let {question} = props;  
  return <tr>
   <td >{props.srNum}</td>
   <td>
    <RichTextEditor      
     id={question.id} 
     readOnly={true} 
     value={Value.fromJSON(JSON.parse(question.desc))}/>
    <div>
     <div className="container">
      <div className="row text-style">
       <div className="mr-1">
           A:
       </div>
       <RichTextEditor 
        id={this.props.question.id} 
        readOnly={true} 
        value={Value.fromJSON(JSON.parse(this.props.question.optionA))}/>
      </div>
      <div className="row text-style">
       <div className="mr-1">
           B:
       </div>
       <RichTextEditor 
        id={this.props.question.id} 
        readOnly={true} 
        value={Value.fromJSON(JSON.parse(this.props.question.optionB))}/>
      </div>   
      <div className="row text-style">
       <div className="mr-1">
           C:
       </div>
       <RichTextEditor 
        id={this.props.question.id} 
        readOnly={true} 
        value={Value.fromJSON(JSON.parse(this.props.question.optionC))}/>
      </div>   
      <div className="row text-style">
       <div className="mr-1">
           D:
       </div>
       <RichTextEditor 
        id={this.props.question.id} 
        readOnly={true} 
        value={Value.fromJSON(JSON.parse(this.props.question.optionD))}/>
      </div>
      <div className="row text-style">
       <div className="container">
        <div className="row"> 
         <div className="mr-4 text-style "><span className="font-weight-bold">Type:</span> {question.typeName?question.typeName:' '} </div>            
         <div className="mr-4 text-style "><span className="font-weight-bold">Subject :</span>    {question.subjectName?question.subjectName:' '}</div>
         <div className="mr-4 text-style"><span className="font-weight-bold">Chapter :</span>    {question.subjectName?question.chapterName:' '}</div>       
         <div className="mr-2 text-style"><span className="font-weight-bold">Complexity Level :</span> {question.complexityLevel?getComplexityLevel(question.complexityLevel):' '}</div>
        </div>
        <div className="row justify-content-end">
         <div className="font-italic">{this.props.question.note?'('+this.props.question.note+')':''}</div> 
        </div>
       </div>
      </div>            
     </div>
    </div>       
       
   </td>
   <td>
    {props.activeTest && checkQuestionAlreadyAdded(props.activeTest.questions,props.question.id)?'':
     <button 
      onClick= {props.actionText ==='Add'?()=>props.onAddQuestion(props.question):()=>props.onRemoveQuestion(props.question.id)}
      className={"btn "+(props.actionText ==='Add'?'btn-primary':'btn-danger')}>{props.actionText}</button>}
   </td>
  </tr>;
 }
}

export default class QuestionListTable extends React.Component{
    state={
     isError:false,
     message:''
    }
    
    render(){
     return <div className="table-responsive">
      <table className="table table-hover">
       <thead><TableHeadingRow /></thead>
       <tbody>
        {Array.isArray(this.props.questions) && this.props.questions.length > 0?
         this.props.questions.map((question,index)=>{
          return <TableBodyRow key={index} srNum={index + 1} question={question} {...this.props}/>;
         })         
         :<tr><td colSpan={2}>Empty list.</td></tr>}           
       </tbody>
      </table>
     </div>;
    }
}