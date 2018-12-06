import React from 'react';
import moment from 'moment';
import './timer.css';

export default class TimerComponent extends React.Component{

    state={
     durationLeft:moment.duration(
      {'hour':this.props.hour,
       'minutes':this.props.minutes,
       'seconds':this.props.seconds}),
     timer:'',
    }
    componentDidMount =()=>{
     var timer = setInterval(()=>{
      let durationLeft = this.state.durationLeft;    
      if(durationLeft.hours() === 0 &&
            durationLeft.minutes() === 0 &&
            durationLeft.seconds() === 0){
       clearInterval(timer);
      }else{
       durationLeft.subtract(1,'seconds');
      }
      this.setState({timer:timer,durationLeft:durationLeft});
     },1000);
    }

    componentWillUnmount =()=>{
     clearInterval(this.state.timer);
    }
   

    render(){
     return <div className="d-flex">
      <div > Time Left:</div>        
      <div className="time-left-container">
       {this.state.durationLeft.hours()}:{this.state.durationLeft.minutes()}
        :{this.state.durationLeft.seconds()}
      </div>
     </div>;
    }
}