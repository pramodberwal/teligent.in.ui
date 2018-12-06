import React from 'react';
import {Switch,Route,withRouter,Redirect} from 'react-router-dom';
import LoginComponent from './component';

class LoginContainer extends React.Component{
 render(){
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`}      
     render ={()=>{
      return <LoginComponent {...this.props}/>; }}    
    />  
   </Switch>
  );
 }

}

let Login = withRouter(LoginContainer);
export default Login;

