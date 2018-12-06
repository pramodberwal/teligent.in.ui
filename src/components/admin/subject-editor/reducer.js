import {SubjectModel} from '../../model/subject';
import {SUBJECT_EDITOR_FIELD_CHANGED,SUBJECT_EDITOR_RESET} from './action-constant';
import {SUBJECT_EDITOR_SAVE_SUCCESS,SUBJECT_EDITOR_SAVE_ERROR} from './action-constant';
let initialState={
 message:'',
 isError:false,
 subject:{
  [SubjectModel.id]:0,
  [SubjectModel.code]:'',
  [SubjectModel.course]:'',
  [SubjectModel.name]:'',
  [SubjectModel.desc]:'',
 } 
};

export default function SubjectEditorReducer(state=initialState,action){
 switch(action.type){
 case SUBJECT_EDITOR_FIELD_CHANGED:
  return {subject:{...state.subject,isError:false,
   message:'',[action.payload.name]:action.payload.value}};
 case SUBJECT_EDITOR_RESET:
  return initialState;
 case SUBJECT_EDITOR_SAVE_SUCCESS:
  return {...initialState,isError:false,message:action.payload};
 case SUBJECT_EDITOR_SAVE_ERROR:
  return {...state,isError:true,message:action.payload};
 default:
  return state;
 }

};