import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {deleteTopic, getAllTopics} from '../../../services/ref-data/topic';

import {TopicManagerTableHeaderRow,TopicManagerTableBodyRow} from './topic-manager-table-row';

export default class TopicManagerComponent extends React.Component{
  state={
   message:'',
   isError:false,
   topics:[],
  }
componentDidMount=()=>{
 getAllTopics()
  .then(data => {
   this.setState({topics:data.topics});
  });
}
   
  onDoubleClick = (id)=>{
   this.props.history.push(`${this.props.match.url}/edit-topic/`+id);
  }


  onDelete = (id) =>{
   deleteTopic(id).then((data)=>{    
    this.setState({message:data.message});
   })
    .catch(error =>{
     this.setState({isError:true, message:error.message});
    });
  }

  render(){
   window.scrollTo(0,0); 
   return (<div className="container-fluid topic-manager-container"> 
    <div className="row"> 
     <div >
      <Link className="btn btn-primary" to={`${this.props.match.url}/add-topic`}>Add New</Link>
     </div>
     <div className="flex-grow-1 text-center">
        Topic Manager
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
    <div className="row topic-manager-table">     
     <table className="table table-hover">
      <thead>
       <TopicManagerTableHeaderRow />
      </thead>
      <tbody>
       {Array.isArray(this.state.topics)?this.state.topics.map((topic,index)=>{
        return  <TopicManagerTableBodyRow key={index}
         onDelete={this.onDelete} 
         onDoubleClick={this.onDoubleClick}  
         topic={topic}/> ;
       }):<tr><td>Topics not found!</td></tr>}          
      </tbody>
     </table>  
    </div>
   </div>);
  };
}