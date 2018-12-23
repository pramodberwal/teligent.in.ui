import React from 'react';
import * as _ from 'lodash';
import {CustomLink} from '../custom-links';
import './style.css';
import {getAllPublicCourses} from '../../../services/ref-data/course';
import AppBody from '../app-body/container';

export default class UserHomeComponent extends React.Component{
state={
 isError:false,
 message:'',
 courses:[],
}
    componentWillMount = ()=>{
     getAllPublicCourses()
      .then(data =>{
       this.setState({courses:data.courses});
      })
      .catch(data =>{
       this.setState({message:data.message});
      });
    }
    render() {
     return (
      <div className=" user-home-container flex-grow-1">
       <div className=" body-content ">
        <AppBody />
       </div>
       <div className="course-home-links-row ">        
        {Array.isArray(this.state.courses) 
         ? this.state.courses.map((course,index)=>{
          return <div key={index} className="course-link" >           
           <CustomLink to={`/course/${course.id}`} 
            name={course.name} />             
          </div>;
         }):'Courses Not found'}
       </div>
      </div>
     );
    }
}