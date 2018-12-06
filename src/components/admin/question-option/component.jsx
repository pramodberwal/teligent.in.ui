import React from 'react';
import {Value} from 'slate';
import RichTextEditor from '../rich-text-editor/container';
export class OptionsComponent extends React.Component{  render(){ 
 let {question} = this.props; 
 return (<div className="container"> 
  <div className="row">
   <div className="col">
          A:
    <RichTextEditor 
     id={question.optionA.value} 
     readOnly={true} 
     value={Value.fromJSON(JSON.parse(question.optionA))}/>
   </div>
  </div>
  <div className="row">
   <div className="col">
          B:
    <RichTextEditor 
     id={question.optionA.value} 
     readOnly={true} 
     value={Value.fromJSON(JSON.parse(question.optionB))}/>
   </div>
  </div>
  <div className="row">
   <div className="col">
          C:
    <RichTextEditor 
     id={question.optionA.value} 
     readOnly={true} 
     value={Value.fromJSON(JSON.parse(question.optionC))}/>
   </div>
  </div>
  <div className="row">
   <div className="col">
          D:
    <RichTextEditor 
     id={question.optionA.value} 
     readOnly={true} 
     value={Value.fromJSON(JSON.parse(question.optionD))}/>
   </div>
  </div>
 </div>);
}
};