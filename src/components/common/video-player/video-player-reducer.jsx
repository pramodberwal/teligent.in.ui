import ACTIONS from './video-player-actions';
let initialState ={
 videoId:5800814485001
};

export default function VideoPlayerReducer (state=initialState, action ){
 switch(action.type){ 
 case ACTIONS.PLAY_VIDEO:        
  return {...state};
 default:
  return state;
 }

}