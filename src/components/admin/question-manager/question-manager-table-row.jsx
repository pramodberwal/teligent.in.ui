import React from 'react';
import {Value} from 'slate';
import {getComplexityLevel} from '../../helper/util';
import {getChoiceName} from '../../../services/questions/question-service';
import {Link} from 'react-router-dom';
import RichTextEditor from '../rich-text-editor/container';
import {PopUpModel} from '../../helper/popup';

export let QuestionManagerTableHeader =(props)=>{
 return (
  <tr>
   <th>ID</th>
   <th>Description</th>
   <th>Subject</th>
   <th></th>
   <th>Action</th>
  </tr>
 );
};
export class QuestionManagerTableBodyRow extends React.Component{

 render (){
  let {question} =this.props;
  return (<tr>
   <th>{this.props.question.id}</th>
   <td>   
    <RichTextEditor      
     id={this.props.question.id} 
     readOnly={true} 
     value={Value.fromJSON(JSON.parse(this.props.question.desc))}/>
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
   <td>{this.props.question.subjectName?this.props.question.subjectName:''}</td>
   <td>
    <Link className="btn btn-primary"  
     to={`${this.props.match.url}/edit-question/`+this.props.question.id}>
     Edit
    </Link>
   </td>
   <td>
    <button className="btn btn-danger"  
     onClick={()=>this.props.onDeleteQuestion(this.props.question.id)}
    >
     Delete
    </button>
   </td>
  </tr>
  );
 }
}