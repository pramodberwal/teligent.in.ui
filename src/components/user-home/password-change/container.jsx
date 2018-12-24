import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import PasswordChangeComponent from './component';

class PasswordChangeContainer extends React.Component{
 render(){
  return(<Switch>
   <Route exact path={`${this.props.match.url}`} 
    render={(props)=>{
     return <PasswordChangeComponent 
      {...this.props}      
     />;
    }}/>         
  </Switch>);
  
 }
}
let PasswordChangeHome = withRouter(PasswordChangeContainer);
export default  PasswordChangeHome;