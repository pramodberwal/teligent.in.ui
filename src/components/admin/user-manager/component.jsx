import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import { UserTableHeader, UserTableRow } from './user-table-row';
import {getUserStore,getAllUser,deleteUser} from '../../../services/user-service';
import {doLogout} from '../../../services/login';

export default class UserManagerComponent extends React.Component{    
state ={
 isError:false,
 message:'',
 inProgress:false,
 users:[]
}
onDoubleClick = (userId) =>{ 
 this.props.history.push(`${this.props.match.url}/edit-user/`+userId);
};

onDeleteUser = (id) =>{
 deleteUser(id)
  .then((data) =>{
   window.scroll(0,0);
   this.setState({message:data.message});
  })
  .catch((data)=>{
   this.setState({isError:true,message:data.message});
  });
}
componentDidMount =()=>{
 window.scroll(0,0);
 getAllUser()
  .then((data)=>{
   if(data.login){
    doLogout();
    this.props.history.push('/login');
    return;
   }    
   this.setState({users:data.users});
  })
  .catch((data)=>{
   this.setState({users:data.users});
  });
}

render(){
 if(Array.isArray(this.state.users) ) {
  return (<div className="container-fluid user-manager-container">
   <div className="row  justify-content-center">
    <div className="text-center">      
     {this.state.message?
      <div className={"alert mt-2 mb-0 "+ (this.state.isError?' alert-danger':'alert-success') }>
       {this.state.message}       
      </div>:''}
    </div>
   </div>
   <div className="row heading-row">
    <div>
     <Link className=" btn btn-primary" to={`${this.props.match.url}/add-user`}>Add New</Link>
    </div>
    <div className="flex-grow-1 text-center">
        User Manager
    </div>  
   </div>
   <div className="row">
    <table className="table table-hover user-manager-table">
     <thead>
      <UserTableHeader />
     </thead>
     <tbody>
      {this.state.users.map((user, index)=>{
       return <UserTableRow key={index} 
        user={user} 
        onDoubleClick={this.onDoubleClick}
        onDeleteUser={this.onDeleteUser}/> ;
      })}          
     </tbody>
    </table>   
   </div>
  </div>);
 }else{
  return (
   <div className="container-fluid user-manager-container">
    Looks like the user service is down...
   </div>
  );
 }
 
};
}
