import {SubjectModel} from '../../model/subject';
let initialState={
 subjects:{
  'iit':[{
   [SubjectModel.id]:0,
   [SubjectModel.code]:'physics',
   [SubjectModel.name]:'Physics',
  }]
 },
 
};

export default function SubjectReducer(state=initialState,action){
 switch(action.type){
 default:
  return state;
 }

};