import React from 'react';
import moment from 'moment';
import './timer.css';

export default class TimerComponent extends React.Component{

    state={
     startTime : moment(this.props.startTime?this.props.startTime: new Date()),
     durationLeft:moment.duration(moment(this.props.startTime).add(this.props.minutes,'m').diff(moment())),
     timer:'',
    }
    componentDidMount =()=>{
     let durationLeft = this.state.durationLeft; 
 

     var timer = setInterval(()=>{
      durationLeft = this.state.durationLeft; 
      if(durationLeft.hours() <= 0 &&
            durationLeft.minutes() <= 0 &&
            durationLeft.seconds() <= 0){
       this.props.onExamTimeout();
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