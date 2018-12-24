import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import UserHomeComponent from './component';

class UserHomeContainer extends React.Component{
 render(){
  return(<Switch>
   <Route exact path={`${this.props.match.url}`} 
    render={(props)=>{
     return <UserHomeComponent 
      {...this.props}      
     />;
    }}/>         
  </Switch>);
  
 }
}
let UserHome = withRouter(UserHomeContainer);
export default  UserHome;