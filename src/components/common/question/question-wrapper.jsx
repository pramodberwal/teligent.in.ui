import React from 'react';
import {connect} from 'react-redux';
import ACTIONS from './question-actions';
import QUESTION_TYPE from '../../../constants/system-constant';
 
import QuestionComp from './question-component';

let mapStateToProps = (state) =>{
 return {question:state.QuestionReducer};
};

let mapDispatchToProps = (dispatch) =>{
 return ({
  handleSelectedOption:(optionElement, type )=>{
   if(type === QUESTION_TYPE.SINGLE_SELECT){
    dispatch({type:ACTIONS.OPTION_CLEARED, payload:''});
    dispatch({type:ACTIONS.OPTION_CHECKED, payload:optionElement.value});
   } else if(type === QUESTION_TYPE.MULTI_SELECT){
    if(optionElement.checked){
     dispatch({type:ACTIONS.OPTION_CHECKED, payload:optionElement.value});
    }else{
     dispatch({type:ACTIONS.OPTION_UNCHECKED, payload:optionElement.value});
    }
   }

  
       
  }

 });
};

let Question = connect(mapStateToProps,mapDispatchToProps)(QuestionComp);

export default Question;