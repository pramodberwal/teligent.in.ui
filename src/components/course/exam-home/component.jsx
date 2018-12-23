import React from 'react';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';
import moment from 'moment';
import './style.css';
import {getAllCourseFutureExames} from '../../../services/mock-exam';

export default class ExamHomeComponent extends React.Component{
 state={
  isError:false,
  message:'Please wait while we are loading current exam list...',
  todayExamList:[],
  upcomingExamList:[],
 }
 componentDidMount = ()=>{
  window.scroll(0,0);
  getAllCourseFutureExames(this.props.courseId)
   .then(data =>{
    let examList = data.examList;
    if(!examList || !examList.length){
     this.setState({isError:false, message:'Currently we have not scheduled any exam. Our experts are working to prepare the exam for you.'});
     return;
    }
    let todayExamList=[];
    let upcomingExamList=[];
    let dayStart = moment().startOf('day');
    let dayEnd = moment().endOf('day');
    _.forEach(examList, exam =>{
     if(moment(exam.startDateTime).isBetween(dayStart,dayEnd)){       
      todayExamList.push(exam);
     }else if(moment(exam.startDateTime).isAfter(dayEnd)){
      upcomingExamList.push(exam);
     }
     examList = null;
    });
    this.setState({isError:false, message:'',
     upcomingExamList:upcomingExamList,
     todayExamList:todayExamList,
    });
   })
   .catch(error =>{
    this.setState({isError:true, message:'Error while loading exams.'});
   });
  this.setState({isError:false,message:'Please wait while loading exams...'});
 }
 render (){  
  let {todayExamList} = this.state; 
  let {upcomingExamList} = this.state; 
  if((Array.isArray(todayExamList) && todayExamList.length ) 
  || (Array.isArray(upcomingExamList) && upcomingExamList.length) ){
   return <div className="container-fluid exam-home-container">
    <div className="row">
     <div> <button className="btn btn-primary" onClick={this.props.history.goBack}><span className="text-style">Back</span></button></div>
    </div>
    { (Array.isArray(todayExamList) && todayExamList.length )?
     <div className="container-fluid today-exam-container ">
      <div className="row ">       
       <div className="flex-grow-1 text-center"><span className="text-style">Today's Exam</span>
       </div> 
      </div>
      <hr className="divider"/>
      {
       todayExamList.map((exam,index)=>{
        return <div key={index} className="row ">
         <div className="flex-grow-1">
          <div className="container">
           <div><span className="text-style">
            {exam.name}
           </span></div>
          </div>
         </div>
         <div className="flex-grow-1"><span className="text-style">Start Time:{moment(exam.startDateTime).format('DD/MM/YYYY hh:mm A')}</span></div>
         {moment().isAfter(moment(exam.startDateTime))?
          <Link 
           to={
            {
             pathname:`${this.props.match.url}/start/`+exam.id,
             state:{exam:exam}
            }}
          >
           <span className="text-style" >Start</span>
          </Link>:''}
         
        </div>;
       })
      }   
     </div> :''}
    { (Array.isArray(upcomingExamList) && upcomingExamList.length )?
     <div className="container-fluid upcoming-exam-container ">
      <div className="row justify-content-center">
       <div><span className="text-style">Up-Coming Exams</span></div>    
      </div>
      <hr className="divider"/>
      {
       upcomingExamList.map((exam,index)=>{
        return <div key={index} className="row ">
         <div className="flex-grow-1">
          <div className="container">
           <div><span className="text-style">
            {exam.name}
           </span></div>
          </div>
         </div>
         <div className="flex-grow-1"><span className="text-style">Start Time:{moment(exam.startDateTime).format('DD/MM/YYYY hh:mm A')}</span></div>
         
        </div>;
       })
      }   
     </div> :''} 
   </div> ;
  }else{
   return <div className="container-fluid exam-home-container">
    <div className="row">
     <div> <button className="btn btn-primary" onClick={this.props.history.goBack}><span className="text-style">Back</span></button></div>
     <div className="flex-grow-1 text-center">{this.state.message} </div>
    </div>
   </div>;
  }
 }
};