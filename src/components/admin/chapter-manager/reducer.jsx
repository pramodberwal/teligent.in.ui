let initialState = {
 chapters:[{
  id:0,
  name:'Chapter-1',
  desc:'This chapter includes chapter 1 related issues.'
 }]
};

export default function ChapterReducer(state=initialState, action){
 switch(action.type){
 default:
  return state;
 }
}