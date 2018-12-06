import React from 'react';
import {Link} from 'react-router-dom';
import {deleteCourse} from '../../../services/ref-data/course';
import {getAllCourses} from '../../../services/ref-data/course' ;
import './style.css';

import {CourseManagerTableHeaderRow,CourseManagerTableBodyRow} from './course-manager-table-row';

export default class CourseComponent extends React.Component{
  state={
   message:'Please wait while we are loading data...',
   isError:false,
   courses:[],
  }
componentWillMount = ()=>{
 getAllCourses()
  .then(data =>{
   this.setState({message:'',courses:data.courses});
  })
  .catch(data =>{
   this.setState({isError:true,message:data.message});
  });
};
  onDoubleClick = (id)=>{
   this.props.history.push(`${this.props.match.url}/edit-course/`+id);
  }

  onDelete = (id) =>{
   deleteCourse(id).then((data)=>{
    this.setState({message:data.message});
   }).catch(error=>{
    this.setState({isError:true,message:error.message});
   });
  }
  render(){     
   return (<div className="container-fluid course-manager-container"> 
    <div className="row heading-row"> 
     <div>
      <Link className=" btn btn-primary" to={`${this.props.match.url}/add-course`}>Add New</Link> 
     </div>    
     <div className="flex-grow-1 text-center">
        Course Manager
     </div>   
    </div>
    <div className="row justify-content-center">
     <div className="text-center">      
      {this.state.message?
       <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
        {this.state.message}       
       </div>:''}
     </div>
    </div> 
    <div className="row">
   
     <table className="table table-hover">
      <thead>
       <CourseManagerTableHeaderRow />
      </thead>
      <tbody>
       {Array.isArray(this.state.courses)?this.state.courses.map((course,index)=>{
        return  <CourseManagerTableBodyRow key={index}
         onDelete={this.onDelete} 
         onDoubleClick={this.onDoubleClick}  
         course={course}/> ;
       }):<tr><td>Empty list</td></tr>}          
      </tbody>
     </table>  
    </div>  
   </div>);
  };
}