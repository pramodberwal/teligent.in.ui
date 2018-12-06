import React from 'react';
import videojs from 'video.js';
var myPlayer, playerHTML;
export default class VideoPlayerComponent extends React.Component{
    state = {
     playerData:{
      accountId:'3623811476001',       
      playerId: 'a9399756-7a60-4d2a-9152-707ccbbf6385',
      videoId: '5793743331001'
     }    
    };

    addPlayerHandler = (videoId) => {
     // Dynamically build the player video element
     playerHTML = '<video id=\"myPlayerID\" data-video-id=\"' 
        + videoId + '\"  data-account=\"' + this.state.playerData.accountId + 
        '\" data-player=\"' + this.state.playerData.playerId 
        + '\" data-embed=\"default\" class=\"video-js\" controls></video>';
        
        
     // Inject the player code into the DOM
     document.getElementById('video-player').innerHTML = playerHTML;
        
     // Add execute the player script tag
     var s = document.createElement('script'); 
     s.src = "https://players.brightcove.net/" + this.state.playerData.accountId + "/" + playerData.playerId + "_default/index.min.js";
     // Add the script tag to the document
        
     document.body.appendChild(s);
     // Call a function to play the video once player's JavaScropt loaded
     s.onload = this.callback;
    }

    callback = () =>{
     myPlayer = videojs('myPlayerID');
     myPlayer.play();
    }

    render(){
     return <div className="container video-player-container">           
      <div className="player-heading">
                Player heading
      </div>
      <div>
       <img className="img-thumbnail" alt="" src="https://httpsak-a.akamaihd.net/3623811476001/3623811476001_5802187768001_5800814485001-vs.jpg?pubId=3623811476001&amp;videoId=5800814485001" />
      </div>
      <div id="video-player"> </div>
     </div>;
    }

}