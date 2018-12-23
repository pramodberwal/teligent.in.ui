import React from 'react';
import {Link} from 'react-router-dom';
import {deleteTestId} from '../../../services/exam-test';
import {getAllTests} from '../../../services/exam-test';
import './style.css';

import {TestTableHeaderRow,TestTableBodyRow} from './test-table-row';

export default class TestManagerComponent extends React.Component{
state = {
 isError:false,
 message:'Please wait while loading data...',
 testList:this.props.testList
}
componentDidMount =()=>{
 window.scroll(0,0);
 getAllTests().then(data =>{
  this.setState({isError:false,message:'',testList:data.testList});
 }).catch(error =>{
  this.setState({isError:true, message:error.message});
 });
}

onDeleteClick = (id)=>{
 deleteTestId(id)
  .then(data =>{
   this.setState({isError:false, message:'Test deleted!'});
   this.componentDidMount();
  })
  .catch(error =>{
   this.setState({isError:true, message:'Error while deleting Test!'});
  });

}
  onDoubleClick = (id)=>{
   this.props.history.push(`${this.props.match.url}/edit-test/`+id);
  }
    onDelete = (id)=>{
     deleteTestId(id).then((data)=>{      
      this.setState({isError:false,message:data.message});
     }).catch(error =>{
      this.setState({isError:true,message:error.message});
     });     
    }
    render(){
     return <div className="container-fluid test-manager-container">
      <div className="row heading-row">       
       <div>
        <Link className="btn btn-primary "  
         to={`${this.props.match.url}/add-test`}>
         <span className="text-style">Add New Test</span> 
        </Link>  
       </div>
       <div className="flex-grow-1 text-center">
        <span className="text-style">Test Manager</span>
       </div>
      </div>
      <div className="row test-manager-table">
       <table className="table table-hover">
        <thead>
         <TestTableHeaderRow />
        </thead>
        <tbody>
         {
          Array.isArray(this.state.testList) && this.state.testList.length?
           this.state.testList.map((test,index)=>{
            return <TestTableBodyRow key={index} 
             onDoubleClick = {this.onDoubleClick}
             onDeleteClick = {this.onDeleteClick}
             test={test}/>;
           }):<tr><td><span className="text-style">{this.state.message}</span></td></tr>}       
        </tbody>         
       </table>
      </div>            
     </div>;
    }
}