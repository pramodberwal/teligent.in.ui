import React from 'react';
import classNames from 'classnames';
import * as _ from 'underscore';
import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import defaultStyle from './question-style';
import QUESTION_TYPE from '../../../constants/system-constant';

let Question = (props) =>{
 let {classes, question} = props;
 // 
 if(!question){
  return (<div>Please select question</div>);
 }
 let images = question.images.map((image,index)=>{      
  return (<div className="col-3" key={index}>{image.path}</div>);
 });

 let options = "No options are available";
 if(question.type === QUESTION_TYPE.MULTI_SELECT){
  options = question.options.map((option)=>{      
   return (
    <div key={"options-"+option.value} className="form-check col-12">
     <input key={"option-checkbox-"+option.value}
      id={"id"+option.value} 
      name={"name"+question.id}
      className="form-check-input" 
      type="checkbox" 
      value={option.value} 
      checked={(_.contains(question.selectedChoice , option.value))? true:false}
      onChange={(event) => props.handleSelectedOption(event.target,question.type)}
     />

     <label key={"options-text-"+option.value} 
      className="form-check-label" 
      htmlFor={"id"+option.value}> {option.text};  </label>
    </div>
   );
  });
 }else if(question.type === QUESTION_TYPE.SINGLE_SELECT){
  options = question.options.map((option,index)=>{
   let checked="checked"  ;    
   return (       
    <div key={"options-"+option.value} className="form-check col-12">
     <input key={"option-checkbox-"+option.value} 
      className="form-check-input" 
      type="radio" 
      name={"name_"+question.id} 
      id={"id_"+option.value}
      value={option.value} 
      checked={(_.contains(question.selectedChoice , option.value))? true:false} 
      onChange={(event) => props.handleSelectedOption(event.target,question.type)}
     />
     <label key={"options-text-"+option.value}
      className="form-check-label" 
      htmlFor={"id_"+option.value}>
      {option.text}
     </label>
    </div>

   );
  });
 }

 return ( <div className={classNames(classes.root,"container")}>
  {/* Summary Row */}
  <div className={classNames("row",classes.summary)}>
   <div className={classNames("col-11")}>
   Question Id-{question.id}: {question.summary}
   </div>              
  </div>
  {/* Summary ends */}
  {/* Image Row */}
  <div className={classNames("row",classes.image)}>
   <div className={classNames('container')}>
    <div className="row">
     {images}
    </div>
   </div>              
  </div>
  {/* Image ends */}

  {/* Options Row */}
  <div className={classNames("row",classes.image)}>
   <div className={classNames('container')}>
    <div className="row">
     {options}
    </div>
   </div>              
  </div>
  {/* Options ends */}

  {/* Options Note */}
  <div className={classNames("row",classes.image)}>
   <div className={classNames('container')}>
    <div className="row">
     {question.note}
    </div>
   </div>              
  </div>
  {/* Options Note */}
 </div>);
};

Question.propTypes = {
 question:propTypes.object
};
let QuestionComp = withStyles(defaultStyle,{"name":"question"})(Question);

export default QuestionComp;