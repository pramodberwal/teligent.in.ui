
import React from 'react';
import videojs from 'video.js';
import {connect} from 'react-redux';
import VideoPlayerComp from './video-player-component';
import ACTIONS from './video-player-actions';


var myPlayer, playerHTML,
 // +++ Set the data for the player +++
 /*  playerData = {
  'accountId': '1752604059001',
  'playerId': 'rJtrO8EKW',
  'videoId': '5550679964001'
 }; */

 playerData = {
  'accountId': '3623811476001',
  'playerId': 'a9399756-7a60-4d2a-9152-707ccbbf6385',
  'videoId': '5793743331001'
 };

// +++ Build the player and place in HTML DOM +++
function addPlayerHandler(videoId) {
 // Dynamically build the player video element
 playerHTML = '<video id=\"myPlayerID\" data-video-id=\"' 
 + videoId + '\"  data-account=\"' + playerData.accountId + 
 '\" data-player=\"' + playerData.playerId 
 + '\" data-embed=\"default\" class=\"video-js\" controls></video>';
 
 
 // Inject the player code into the DOM
 document.getElementById('video-player').innerHTML = playerHTML;
 
 // Add execute the player script tag
 var s = document.createElement('script'); 
 s.src = "https://players.brightcove.net/" + playerData.accountId + "/" + playerData.playerId + "_default/index.min.js";
 // Add the script tag to the document
 
 document.body.appendChild(s);
 // Call a function to play the video once player's JavaScropt loaded
 s.onload = callback;
}

// +++ Initialize the player and start the video +++
function callback() {
 myPlayer = videojs('myPlayerID');
 myPlayer.play();
}

function mapStateToProps(state){
 return {videoId:state.VideoPlayerReducer.videoId};
}

function mapDispatchToProps(dispatch){ 
 return {
  addPlayer: (videoId) =>{
   addPlayerHandler(videoId);
  }

 };
}

let VideoPlayerWrapper = connect(mapStateToProps,mapDispatchToProps)(VideoPlayerComp);
export default VideoPlayerWrapper;

