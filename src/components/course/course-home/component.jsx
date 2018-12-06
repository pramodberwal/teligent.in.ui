import React from 'react';
import * as _ from 'lodash';
import './style.css';
import {getCourseById} from '../../../services/ref-data/course';
import SubjectIndexComponent from '../subject-index/component';
import ChapterHome from '../chapter-home/container';
import SubjectHome from '../subject-home/container';
import DefaultHomeComponent from './home';

export default class CourseHomeComponent extends React.Component{
  state={
   message:'Please wait while we are loading course data...',
   resource:'default',
   subject:'',
   chapter:'',
   course:'',
   testSeriesList:[],
  }
componentWillReceiveProps = (props)=>{
 let subject = ''; 
 let subjectId = props.subjectId;
 if(!subjectId 
              && Array.isArray(this.state.course.subjects) 
              && this.state.course.subjects.length ){
  subjectId = this.state.course.subjects[0].id;
 } 
 subject = _.find(this.state.course.subjects, subject => Number(subjectId) === Number(subject.id) );
 
 this.setState({
  subject:subject,
  resource:props.resource});

}

  componentDidMount = ()=>{
   if(!this.props.courseId){
    return ;
   }
   let props = this.props;
   let course ='';
   getCourseById(props.courseId)
    .then(courseData =>{ 
     course =  courseData.course;
     let subject = ''; 
     let subjectId = props.subjectId;
     if(!subjectId 
              && ( Array.isArray(course.subjects) 
              && course.subjects.length) ){
      subjectId = course.subjects[0].id;
     }
     subject = _.find(course.subjects, subject => Number(subjectId) === Number(subject.id) );
     this.setState({
      course:course,
      subject:subject,
      resource:props.resource});
     /* if(subject && !props.subjectId){      
      this.props.history.push(`${this.props.match.url}/subject/`+subject.id);
     }   */   
    })
    .catch(error =>{
     console.log('Error while loading course....',error);
     this.setState({isError:true,message:'Unauthrized'});
    });
  }
  render(){
   window.scrollTo(0,0); 
   if(!this.state.course){
    return <div>
     {this.state.message}
    </div>;
   }
   return <div className="container-fluid course-home-container">
    <div className="row justify-content-center">     
     <SubjectIndexComponent       
      course={this.state.course}
      {...this.props}/>
    </div>
    <div className="row detail-container">
     <div className="flex-grow-1">
      {this.state.resource === 'chapter'?<ChapterHome
       course={this.state.course}
       subject={this.state.subject}
       chapter={this.state.chapter} />:     
       this.state.resource === 'subject'?<SubjectHome
        course={this.state.course}
        subject={this.state.subject} />:
        <DefaultHomeComponent  course={this.state.course} {...this.props}/>}
     </div>
    </div>
   </div>;
  }
};