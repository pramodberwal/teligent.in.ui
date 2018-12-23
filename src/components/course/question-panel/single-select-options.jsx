import React from 'react';
import RichTextEditor from '../../admin/rich-text-editor/container';
import {Value} from 'slate';

export default class SingleSelectOptions  extends React.Component{

 render(){

  return <div className="container single-select-options-container">
   <div className="question-option-row row">
    <div className="option-name">A:</div>
    <div className="option-value">
     <input type="radio" 
      name={this.props.activeQuestion.id} 
      value="A" 
      checked={this.props.attemptedQuestions && this.props.attemptedQuestions[this.props.activeQuestion.id] === 'A'}
      onChange={(e) =>this.props.onOptionSelect(e.target.value)}/>
    </div>
    <div className="option-description">
     <RichTextEditor 
      id="A" 
      readOnly={true} 
      value={Value.fromJSON(JSON.parse(this.props.activeQuestion.optionA))} />
    </div>
   </div>

   <div className="question-option-row row">
    <div className="option-name">B:</div>
    <div className="option-value">
     <input type="radio" 
      name={this.props.activeQuestion.id} 
      value="B" 
      checked={this.props.attemptedQuestions && this.props.attemptedQuestions[this.props.activeQuestion.id] === 'B'}
      onChange={(e) =>this.props.onOptionSelect(e.target.value)}/>
    </div>
    <div className="option-description">
     <RichTextEditor 
      id="B" 
      readOnly={true} 
      value={this.props.attemptedQuestions?Value.fromJSON(JSON.parse(this.props.activeQuestion.optionB)):''} />
    </div>
   </div>

   <div className="question-option-row row">
    <div className="option-name">C:</div>
    <div className="option-value">
     <input type="radio" 
      name={this.props.activeQuestion.id} 
      value="C" 
      checked={this.props.attemptedQuestions && this.props.attemptedQuestions[this.props.activeQuestion.id] === 'C'}
      onChange={(e) =>this.props.onOptionSelect(e.target.value)}/>
    </div>
    <div className="option-description">
     <RichTextEditor 
      id="C" 
      readOnly={true} 
      value={Value.fromJSON(JSON.parse(this.props.activeQuestion.optionC))} />
    </div>
   </div>
   <div className="question-option-row row">
    <div className="option-name">D:</div>
    <div className="option-value">
     <input type="radio" 
      name={this.props.activeQuestion.id} 
      value="D" 
      checked={this.props.attemptedQuestions && this.props.attemptedQuestions[this.props.activeQuestion.id] === 'D'}
      onChange={(e) =>this.props.onOptionSelect(e.target.value)}/>
    </div>
    <div className="option-description">
     <RichTextEditor 
      id="D" 
      readOnly={true} 
      value={Value.fromJSON(JSON.parse(this.props.activeQuestion.optionD))} />
    </div>
   </div>
  </div>;
 }
}