import React from 'react';
import {Switch,Route,withRouter,Redirect} from 'react-router-dom';
import ContactUsComponent from './component';

class ContactUsContainer extends React.Component{
 render(){
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`}      
     render ={()=>{
      return <ContactUsComponent {...this.props}/>; }}    
    />  
   </Switch>
  );
 }

}

let ContactUs = withRouter(ContactUsContainer);
export default ContactUs;