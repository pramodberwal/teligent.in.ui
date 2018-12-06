import React from 'react';
import {NavLink} from 'react-router-dom';
import * as $ from 'jquery';
import { getSubjectByCourse } from "../../../services/ref-data/subject";
import './style.css';

export default class SubjectIndexComponent extends React.Component{  
    state={
     message:'Loading subjects...',
     subjects:[],
    }
   
    componentDidMount = ()=>{      
     if(this.props.course){
      this.setState({message:'',subjects:this.props.course.subjects});
      return;
     }
     if(this.props.courseId){
      getSubjectByCourse(this.props.courseId)
       .then(data =>{  
        this.setState({message:'',subjects:data.subjects});
       })
       .catch(error =>{
        this.setState({message:error.message});
        console.log('Error while loading subjects ...', error);
       });
     }else{
      this.setState({message:''});
     }    
    }
    
    render() {
     if( !Array.isArray(this.state.subjects) || this.state.subjects.length === 0 ){
      return <div className="container">
       <div className="row justify-content-center">
        <div className="text-center">      
         {this.state.message?
          <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
           {this.state.message}       
          </div>:''}
        </div>
       </div> 
      </div>;
     }
     let subjectListHtml = this.state.subjects.map((subject,index) =>{
      return <div key={index} className="subject">       
       <NavLink to={`${this.props.match.url}/subject/`+subject.id}>
        <span className="subject-text">{subject.name}</span>
       </NavLink>
      </div>;
     });
     return (
      <div className="container-fluid">
       <div className="row subject-index-container">
        {subjectListHtml}
       </div>
      </div> 
     );
    };
}

