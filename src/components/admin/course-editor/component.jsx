import React, { Fragment } from 'react';
import * as _ from 'lodash';
import {saveCourse, getCourseById} from '../../../services/ref-data/course';
import {getAllSubjects} from '../../../services/ref-data/subject';

import './style.css';

export default class CourseEditorComponent extends React.Component{
  state={
   message:'',
   isError:false,
   course:{
    name:'',
    subjects:[], 
   },   
   subjectList:[],
   currentSelectedSubject:''
  }

  componentDidMount = ()=>{ 
   let subjectList ;
   getAllSubjects().then(resp =>{
    subjectList = resp.subjects;
    if(this.props.courseId){
     getCourseById(this.props.courseId)
      .then(data =>{
       this.setState({course:data.course,subjectList:subjectList});
      });
    }else{
     this.setState({subjectList:subjectList});
    }    
   })
    .catch(error =>{
     console.log('Error while loading subjects..!');
    });
  }  
  onChange=(fieldName, fieldValue)=>{
   this.setState({course:{...this.state.course,[fieldName]:fieldValue}});
  }

  onSubjectChange=(fieldName, fieldValue)=>{
   this.setState({[fieldName]:fieldValue});
  }
  handleBack = ()=>{   
   this.props.history.goBack();
  }

  onRemoveSubject = (subjectId)=>{
   let subjects = this.state.course.subjects;
   _.remove(subjects, s => Number(s.id) === Number(subjectId));
   this.setState({course:this.state.course});
  }

  onAddSubject = ()=>{   
   let course = this.state.course;
   let subjects = Array.isArray(course.subjects)?course.subjects:[];
   let selectedSubject =_.find(this.state.subjectList,s =>{
    return Number(s.id) === Number(this.state.currentSelectedSubject);
   });
   subjects.push(selectedSubject);
   course.subjects = subjects;
   this.setState({course:course});
  }

  onSave = ()=>{
   saveCourse(this.state.course).then((data)=>{
    this.props.history.goBack();
   })
    .catch(error=>{
     this.setState({isError:true,message:error.message});
    });
  }
 
  render(){
   let {course} = this.state.course;
   let subjectOptionsHtml = this.state.subjectList 
   && Array.isArray(this.state.subjectList)?this.state.subjectList.map((subject,index)=>{
     return <option key={index} value={subject.id}>{subject.name}</option>;
    }):"";

   return (<div className="container-fluid course-editor-container">
    <div className="row editor-heading-row "> 
     <div className="back-btn">
      <button className="btn btn-primary" onClick={this.handleBack}>
      Back
      </button>
     </div>   
     <span className="editor-heading-text">Course Editor</span>
    </div>
    <hr className="divider"/>
    <div className="row justify-content-center">
     <div className="text-center">      
      {this.state.message?
       <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
        {this.state.message}       
       </div>:''}
     </div>
    </div>
    <div className="row justify-content-center editor-detail-row">     
     <form>
      <div className="form-row">
       <label htmlFor="seqOrderId">Seq Order: </label>
       <div className="form-group col-6 col-sm-4">        
        <input type="text"
         id="seqOrderId"
         className="form-control"
         name="seqOrder"
         value={this.state.course.seqOrder?this.state.course.seqOrder:''}
         onChange={(e)=>this.onChange('seqOrder', e.target.value)}
        ></input>
       </div>
      </div>
      <div className="form-group">
       <label htmlFor="courseNameId" >Name :</label>       
       <input id="courseNameId" className="form-control"
        name="name"
        value={this.state.course.name}
        onChange={(e)=>this.onChange('name',e.target.value)}
       />
      </div>     
      <div className="form-group">
       <label htmlFor="subjectsAddedId"> Subjects:     
       </label> 
       <div id="subjectsAddedId">
        {
         this.state.course.subjects && Array.isArray(this.state.course.subjects)?
          this.state.course.subjects.map((subject,index)=>{
           if(index === 0  ){
            return <span key={index}>{subject.name}<a onClick={()=>this.onRemoveSubject(subject.id)}><sup>X</sup></a></span> ;
           }else{
            return <span key={index}>{" "+subject.name}<a onClick={()=>this.onRemoveSubject(subject.id)}><sup >X</sup></a></span> ;
           }         
          })
          :''
        }
       </div>
      </div>
      <div className="form-row">
       <div className="form-group">        
        <select id="currentSelectedSubjectId" name="currentSelectedSubject"
         value={this.state.currentSelectedSubject} 
         onChange={(e)=>this.onSubjectChange('currentSelectedSubject',e.target.value)}
         className="form-control">
         <option>Please Select</option>
         {subjectOptionsHtml}
        </select> 
       </div>
       <div className="col">
        <button type="button" className="btn btn-primary" onClick={()=>this.onAddSubject()}>Add Subject</button>
       </div>
      </div>
      
      <div className="form-group row">
       <div className="text-right">
        <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
       </div>        
      </div>
     </form>
    </div>
   </div>);
  }
} 