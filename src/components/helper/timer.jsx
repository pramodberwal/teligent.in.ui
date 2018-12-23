import React from 'react';
import moment from 'moment';
import './timer.css';

export default class TimerComponent extends React.Component{

    state={
     startTime : moment(this.props.startTime?this.props.startTime: new Date()),
     currentTime : moment(),
     durationLeft:moment.duration(moment(this.props.startTime).add(this.props.minutes,'m').diff(moment())),
     timer:'',
    }
    componentDidMount =()=>{
     console.log('Start Time: ', this.state.startTime.format('DD/MM/YYYY hh:mm'));
     let endTime = moment(this.props.startTime).add(this.props.minutes,'m');
     console.log('End Time: ', endTime.format('DD/MM/YYYY hh:mm'));
     let duration =moment.duration(moment(this.props.startTime).add(this.props.minutes,'m').diff(moment()));
     console.log('duration sss>',duration.asMinutes());
     console.log('Current Time: ', this.state.currentTime.format('DD/MM/YYYY hh:mm'));

     console.log(this.state.currentTime.isAfter(endTime));

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