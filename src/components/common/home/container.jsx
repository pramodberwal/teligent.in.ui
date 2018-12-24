import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,withRouter,Redirect} from 'react-router-dom';
import HomeComponent from './component';
import AdminHome from '../../admin/admin-home/admin-home-wrapper';
import CourseHome from '../../course/course-home/container';
import LoginHome from '../login/container';
import ContactUs from '../contactus/container';
import Blog from '../../blog/container';
import  Strategy from '../../strategy/container';
import StudyMatrial from '../../course/study-matrial/container';
import Logout from '../../common/logout/container';
import UserHomeHome from '../../user-home/home/container';
import SecureComponent from '../../common/secure/component';

class HomeContainer extends React.Component{
 render(){
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`}      
     render ={()=>{
      return <HomeComponent {...this.props}/>; }}    
    />   
    <SecureComponent path="/admin" component={AdminHome} />
    <Route path="/strategy" render={(props)=>{
     return <Strategy {...this.props}/>;
    }} />
    <Route path="/blog" render={(props)=>{
     return <Blog {...this.props}/>;
    }} />
    <Route path="/contact-us" render={(props)=>{
     return <ContactUs {...this.props}/>;
    }} />
    <Route path="/e-library" 
     render={()=>{
      return <StudyMatrial {...this.props}/>;
     }}/>
    <Route path="/login" render={(props)=>{
     return <LoginHome {...this.props}/>;
    }} />   
    <Route path="/logout" render={(props)=>{
     return <Logout {...this.props}/>;
    }} />
    <Route path={`/course/:courseId`}  render={(props)=>{
     return <SecureComponent component={(props)=>
     {   return (<CourseHome 
      courseId={props.match.params.courseId}        
      {...this.props} />);       
     }
     } />;
    }} />
    <Route path={`/my-profile`}  render={(props)=>{
     return <SecureComponent component={(props)=>
     {   return (<UserHomeHome      
      {...this.props} />);       
     }
     } />;
    }} />
    <Route render={(props)=>{
     return "Coming soon!!!";
    }} />

    }} />
   </Switch>
  );
 }
}

let Home = withRouter(HomeContainer);
export default Home;