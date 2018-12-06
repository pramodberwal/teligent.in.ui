import {union,without} from 'underscore';
import ACTIONS from './question-actions';
import {QUESTION_TYPE} from '../../../constants/system-constant';

let initialState = {
 id:1,
 subject:1,
 type:'SINGLE_SELECT',// multiselect, singleSelect single choice
 summary:'Sample question heading?',
 images:[{"path":"imagePath1"},{"path":"imagePath2"}],
 options:[
  { "value":"A" ,"text":"Option -A"},
  { "value":"B" ,"text":"Option -B"},
  { "value":"C" ,"text":"Option -C"},
  { "value":"D" ,"text":"Option -D"},
  { "value":"E" ,"text":"Option -E"},
 ],
 note:"Question Note comes here",
 selectedChoice:[]
};

export default function QuestionReducer(state=initialState, action){
 switch(action.type){
 case ACTIONS.OPTION_CLEARED:
  return {...state,selectedChoice:[]};
 case ACTIONS.OPTION_CHECKED:
  return {...state,selectedChoice:union(state.selectedChoice,[action.payload])};
 case ACTIONS.OPTION_UNCHECKED:
  return {...state,selectedChoice:without(state.selectedChoice,action.payload)};
 default:
  return state;
 }
}