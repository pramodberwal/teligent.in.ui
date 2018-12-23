import React from 'react';
import {withRouter,Switch,Route,Redirect} from 'react-router-dom';
import CourseHomeComponent from './component';
import {isUserAuthenticated} from '../../../utils/autherization';
import ExamHome from '../exam-home/container';

class CourseHomeContainer extends React.Component{
 render(){
  if(!isUserAuthenticated()){
   return (
    <Switch>
     <Route path={`${this.props.match.url}`}      
      render ={()=>{
       return <Redirect to="/login"/>;}
      }
     />;
    </Switch>
   );
  }
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render = {()=><CourseHomeComponent {...this.props}/> }
    />  
    <Route path={`${this.props.match.url}/subject/:subjectId`} 
     render = {(props)=>
      <CourseHomeComponent 
       subjectId={props.match.params.subjectId}
       resource='subject'
       {...this.props}/> }
    />
    <Route path={`${this.props.match.url}/exam-home`} 
     render = {(props)=>
      <ExamHome
       {...this.props}/> }
    />     
   </Switch>
  );
 }
}
let CourseHome = withRouter(CourseHomeContainer);
export default CourseHome;