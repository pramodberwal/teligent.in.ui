import React from 'react';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import { withRouter,Switch,Route } from 'react-router-dom';
import QuestionEditorComponent from './question-editor-component';

let mapStateToProps = (state,props) =>{
 return {};
};

let mapDispatchToProps = (dispatch) =>{
 return {};
};
class QuestionEditorContainer extends React.Component{
 render(){
  return (<Switch>
   <Route path={`${this.props.match.url}`} 
    render = {()=>{
     return <QuestionEditorComponent {...this.props}/>;
    }}/>    
  </Switch>);
 }
}

let QuestionEditor = withRouter(connect(mapStateToProps,mapDispatchToProps)(QuestionEditorContainer));
export default QuestionEditor;