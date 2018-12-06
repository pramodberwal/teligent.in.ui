import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Switch,Route} from 'react-router-dom';
import {getCourseById}  from '../../../services/ref-data/course';
import CourseEditorComponent from './component';

let mapStateToProps = (state,props)=>{
 return {courseId:props.id};
};

let mapDispatchToProps = (dispatch)=>{
 return {};
};

class CourseEditorContainer extends React.Component{
 render(){
  return (
   <CourseEditorComponent {...this.props}/>
  );
 }
}

let CourseEditor = withRouter(connect(mapStateToProps,mapDispatchToProps)(CourseEditorContainer));
export default CourseEditor;