import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import CourseComponent from './component';
import {getAllCourses} from '../../../services/ref-data/course' ;
import CourseEditor from '../course-editor/container';

let mapStateToProps = (state) =>{
 return {};
};

let mapDispatchToProps = (dispatch) =>{
   return {};
};

class CourseContainer extends React.Component{ 
 render(){
  return (
   <Switch>
    <Route exact 
     path={`${this.props.match.url}`} 
     render={()=><CourseComponent {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/add-course`} 
     render={()=><CourseEditor {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/edit-course/:id`} 
     render={(props)=><CourseEditor id={props.match.params.id} {...this.props}/>} />
   </Switch>
  );   
 }
}


let CourseManager = connect(mapStateToProps,mapDispatchToProps)(CourseContainer);

export default CourseManager;