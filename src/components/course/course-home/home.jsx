import React from 'react';
import * as _ from 'lodash';
import {Link} from 'react-router-dom';
import './home.css';


export default class DefaultHomeComponent extends React.Component{
 
    onChapterwiseQuizes = ()=>{
     let subject = ''; 
     let subjectId = -1;
     let course = this.props.course;
     if( course && ( Array.isArray(course.subjects) 
                 && course.subjects.length) ){
      subjectId = course.subjects[0].id;
     }
     subject = _.find(course.subjects, subject => Number(subjectId) === Number(subject.id) );
     this.setState({
      course:course,
      subject:subject,
     });
     if( subject ){      
      this.props.history.push(`${this.props.match.url}/subject/`+subject.id);
     }
    }
   
    render(){
     if(this.props.course){
      return <div className="container-fluid default-course-home-container">
       <div className="row course-heading-row">   
        <div className="heading-col">
         <span className="course-heading-text">Welcome to the world of {this.props.course.name}</span>
        </div>     
       </div> 
       <div className="row course-options-row">
        <div className=" course-options-col">
         <span className="course-options-text">What would you like to do today?</span>
        </div>
       </div> 
       <div className="row course-options-item-row">
        <div className=" course-options-item-col ">          
         <span className="course-options-text" 
          onClick={this.onChapterwiseQuizes}>      
        Subject/Chapter Quizes (Online)
         </span>
       
        </div>
        <div className=" course-options-item-col ">
         <Link to={`${this.props.match.url}/exam-home`} >
          <span className="course-options-text">{this.props.course.name} Exam (Online)</span>
         </Link>
        </div>
       </div> 
       <div className="row course-options-item-row">
        <div className="course-options-item-col">
         <Link to="/e-library/recommended-books">
          <span className="course-options-text" >Want to read e-book?</span>
         </Link>
        </div>
        <div className=" course-options-item-col">
         <span className="course-options-text">Want to watch recorded lectures?</span>
        </div>
       </div> 
       <div className="row course-options-item-row">
        <div className="course-options-item-col on-line-doubts-link">
         <span className="course-options-text" onClick={this.onEBook}>Clear your doubts on-line by subject experts.</span>
        </div>
       </div> 

      </div>;
     }else{
      return <div className="default-home-container">
       <div className="course-heading-row">
        <span className="course-heading-text">Invalid Course</span>
       </div>  
      </div>;
     }
  
    }
}