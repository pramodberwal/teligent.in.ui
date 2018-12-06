import React from 'react';
import {Value} from 'slate';
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
   <th>Action</th>
  </tr>
 );
};
export class QuestionManagerTableBodyRow extends React.Component{

 render (){
  return (<tr>
   <th>{this.props.question.id}</th>
   <td data-toggle="tooltip" data-html="true" 
    title={'Type: '
                +(this.props.question.typeName?this.props.question.typeName:' ') +
                ', Subject: '+(this.props.question.subjectName?this.props.question.subjectName:' ') +
                ', Chapter: '+(this.props.question.chapterName?this.props.question.chapterName:' ')
                +', Complexity Level: '+(this.props.question.complexityLevel?this.props.question.complexityLevel:' ')}>
    <RichTextEditor 
     id={this.props.question.id} 
     readOnly={true} 
     value={Value.fromJSON(JSON.parse(this.props.question.desc))}/>
   </td>  
   <td>{this.props.question.subjectName?this.props.question.subjectName:''}</td>
   <td>
    <Link className="btn btn-primary"  
     to={`${this.props.match.url}/preview-question/`+this.props.question.id}>
     Preview
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