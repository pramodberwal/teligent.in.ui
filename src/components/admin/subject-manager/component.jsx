import React from 'react';
import {Link} from 'react-router-dom';
import {deleteSubject, getAllSubjects} from '../../../services/ref-data/subject';
import './style.css';
import {SubjectTableHeaderRow,SubjectTableBodyRow} from './subject-table-row';

export default class SubjectComponent extends React.Component{
    state={
     message:'',
     isError:false,
     subjects:[],
    }
    componentDidMount = ()=>{
     getAllSubjects()
      .then((data)=>{
       this.setState({subjects:data.subjects});
      });
    }
    onDoubleClick = (id)=>{
     this.props.history.push(`${this.props.match.url}/edit-subject/`+id);
    }
    onDelete = (id)=>{
     deleteSubject(id).then((data)=>{
      this.setState({message:data.message});
     })
      .catch(error =>{
       this.setState({isError:true,message:error.message});
      });
    }
    render(){
     window.scrollTo(0,0);
     return <div className="container-fluid subject-manager-component">
      <div className="row heading-row">
       <div>
        <Link className="btn btn-primary" to={`${this.props.match.url}/add-subject`}>Add New</Link>
       </div>

       <div className="flex-grow-1 text-center">
        Subject Manager
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
      <div className="row subject-manager-table">
       <div className="col">
        <table className="table table-hover">
         <thead>
          <SubjectTableHeaderRow />
         </thead>
         <tbody>
          {Array.isArray(this.state.subjects)?this.state.subjects.map((subject,index)=>{
           return <SubjectTableBodyRow key={index} 
            subject={subject}
            onDelete = {this.onDelete}
            onDoubleClick={this.onDoubleClick} />;
          }):<tr><td></td></tr>}
         </tbody>         
        </table>
       </div>
      </div>
            
     </div>;
    }
}