import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Switch,Route} from 'react-router-dom';
import {getSubjectById} from '../../../services/ref-data/subject';
import SubjectEditorComponent from './component';

let mapStateToProps = (state,props)=>{
 return {subjectId:props.id};
};

let mapDispatchToProps = (dispatch)=>{
 return {};
};

class SubjectEditorContainer extends React.Component{
 render(){
  return (
   <SubjectEditorComponent 
    subject={this.props.subjectId} {...this.props}/>
  );
 }
}

let SubjectEditor = withRouter(connect(mapStateToProps,mapDispatchToProps)(SubjectEditorContainer));
export default SubjectEditor;