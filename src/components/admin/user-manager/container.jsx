import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Switch,Route} from 'react-router-dom';
import UserManagerComponent from './component';
import {UserEditor} from '../user-editor/container';
let mapStateToProps = (state) =>{
 return {};
};

let mapDispatchToProps = (dispatch) =>{
 return {};
};

class UserContainer extends React.Component{ 
 render(){
  return (
   <Switch>
    <Route exact 
     path={`${this.props.match.url}`} 
     render={(props)=><UserManagerComponent {...props}/>} />
    <Route 
     path={`${this.props.match.url}/add-user`} 
     render={(props)=><UserEditor {...props}/>} />
    <Route 
     path={`${this.props.match.url}/edit-user/:userId`} 
     render={(props)=><UserEditor userId={props.match.params.userId} {...props}/>} />
   </Switch>
  );   
 }
}


let UserManager = withRouter(connect(mapStateToProps,mapDispatchToProps)(UserContainer));

export default UserManager;