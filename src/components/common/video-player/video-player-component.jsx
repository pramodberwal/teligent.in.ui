import React from 'react';
import {Grid, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import defaultStyle from './video-player-style.js';
import './video-player-style.css';

let VideoPlayer = (props)=>{
 let {classes} = props;
 let videoId = props.videoId;
 return (
  <div className="video-player-container">
   <Grid container className={classes.root}>
    <Grid item>
     <img className={classes.thumbnailClass} alt="" src="https://httpsak-a.akamaihd.net/3623811476001/3623811476001_5802187768001_5800814485001-vs.jpg?pubId=3623811476001&amp;videoId=5800814485001" />
    </Grid> 
    <Grid item>     
     <Button className={classes.iconPlay} variant="raised" onClick={()=>props.addPlayer(videoId)}> Play</Button>
    </Grid>
    <Grid item>
     <div id="video-player"> </div>
    </Grid> 
   </Grid>
  </div>
 );
};

let VideoPlayerComp = withStyles(defaultStyle,{name:'video-player'})(VideoPlayer);

export default VideoPlayerComp;
