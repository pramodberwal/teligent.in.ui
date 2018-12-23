import React from 'react';
import {Link} from 'react-router-dom';
import {getAllExams,deleteExamById} from '../../../services/mock-exam';
import './style.css';

import {MockExamTableBodyRow,MockExamTableHeaderRow} from './mock-exam-table-row';

export default class MockExamManagerComponent extends React.Component{
state = {
 isError:false,
 message:'Please wait while loading data...',
 examList:this.props.mockExamList
}
componentDidMount =()=>{
 window.scroll(0,0);
 getAllExams()
  .then( data =>{
   this.setState({isError:false, message:'', examList:data.examList});
  })
  .catch(error =>{
   this.setState({isError:true, message:'Error while loading exam list!'});
  });
}

onDeleteClick = (id)=>{
 deleteExamById(id)
  .then(data =>{
   this.componentDidMount();
  })
  .catch(error =>{
   this.setState({isError:true, message:'Error while deleting the exam!'});
  });
}

  onDoubleClick = (id)=>{
   this.props.history.push(`${this.props.match.url}/edit-mock-exam/`+id);
  }
   
  render(){
   return <div className="container-fluid mock-exam-manager-container">
    <div className="row heading-row">       
     <div>
      <Link className="btn btn-primary "  
       to={`${this.props.match.url}/add-mock-exam`}>
      Add New Exam
      </Link>  
     </div>
     <div className="flex-grow-1 text-center">
        Exam Manager
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
    {Array.isArray(this.state.examList)?
     <div className="row test-manager-table">
      <table className="table table-hover">
       <thead>
        <MockExamTableHeaderRow />
       </thead>
       <tbody>
        {
         Array.isArray(this.state.examList) && this.state.examList.length?
          this.state.examList.map((Exam,index)=>{
           return <MockExamTableBodyRow key={index}
            seq={index + 1 } 
            onDoubleClick = {this.onDoubleClick}
            onDeleteClick = {this.onDeleteClick}
            mockExam={Exam}/>;
          }):<tr><td>{this.state.message}</td></tr>}       
       </tbody>         
      </table>
     </div> 
     :<div className="row">
      <div>{this.state.message}</div>
     </div>}
               
   </div>;
  }
}