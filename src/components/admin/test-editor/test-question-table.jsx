import React from 'react';
import {Value} from 'slate';
import {loadQuestion} from './helper';
import { PopUpModel } from '../../helper/popup';
import RichTextEditor from '../rich-text-editor/container';
import { OptionsComponent } from '../question-option/component';

export default class QuestionListComponent extends React.Component{
 render (){
  let {questions} = this.props;
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
         return (
          <TestQuestionTableBodyRow key={index} 
           question={question} {...this.props}
          />); 
        })
        }
       </tbody>
      </table>
     </div>
    </div> 
   </div>
  ); 
 }
};
   
class TestQuestionTableBodyRow extends React.Component{
    state = {
     question:'',
     choiceName:''
    } 
    componentWillMount =()=>{
     
    }
    render (){
     let { question } = this.props;
     return (question?<tr>
      <th><span className="options-toggler"
      >{question.id}</span></th>
      <td  className="text-style">
       <RichTextEditor 
        id={this.props.question.id} 
        readOnly={true} 
        value={Value.fromJSON(JSON.parse(this.props.question.desc))}/>
       <div className="container text-style">
        <div className="row ">
         <div className="mr-1 ">
           A:
         </div>
         <RichTextEditor 
          id={this.props.question.id} 
          readOnly={true} 
          value={Value.fromJSON(JSON.parse(this.props.question.optionA))}/>
        </div>
        <div className="row">
         <div className="mr-1">
           B:
         </div>
         <RichTextEditor 
          id={this.props.question.id} 
          readOnly={true} 
          value={Value.fromJSON(JSON.parse(this.props.question.optionB))}/>
        </div>   
        <div className="row">
         <div className="mr-1">
           C:
         </div>
         <RichTextEditor 
          id={this.props.question.id} 
          readOnly={true} 
          value={Value.fromJSON(JSON.parse(this.props.question.optionC))}/>
        </div>   
        <div className="row">
         <div className="mr-1">
           D:
         </div>
         <RichTextEditor 
          id={this.props.question.id} 
          readOnly={true} 
          value={Value.fromJSON(JSON.parse(this.props.question.optionD))}/>
        </div> 
        <div className="row">
         <div className="container">
          <div className="row"> 
           <div className="mr-4">Type : {question.typeName?question.typeName:' '} </div>            
           <div className="mr-4">Subject :    {question.subjectName?question.subjectName:' '}</div>
           <div className="mr-4">Chapter :    {question.subjectName?question.chapterName:' '}</div>       
           <div className="mr-2">Complexity Level : {question.complexityLevel?question.complexityLevel:' '}</div>
          </div>
         </div>
        </div>
       </div>
      </td>
      
      <td>
       <button className="btn btn-danger"      
        onClick={()=>this.props.onQuestionRemove(this.props.testId,question.id)}
       >Remove</button></td>
     </tr>:<tr><td>Loading question...</td></tr>
     );
    }
};

let TestQuestionTableHeader =()=>{
 return (
  <tr>
   <th>ID</th>   
   <th>Description</th>   
   <th>Action</th>
  </tr>
 );
}; 