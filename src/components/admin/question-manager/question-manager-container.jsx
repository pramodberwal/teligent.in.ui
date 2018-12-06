import React from 'react';
import {connect} from 'react-redux';
import { withRouter,Switch,Route, Redirect } from 'react-router-dom';
import QuestionManagerComponent from './question-manager-component';
import QuestionEditor from '../question-editor/question-editor-container';
import QuestionPreview from '../question-preview/question-preview-container';

let mapStateToProps = (state,props) =>{
 return {};
};
let mapDispatchToProps = (dispatch) =>{
 return {};
};

class ManageQuestionContainer extends React.Component{  
 render(){
  return (<Switch>    
   <Route exact path={`${this.props.match.url}`} 
    render={(props)=>{
     return <QuestionManagerComponent page="0" {...this.props} />;
    }} />
   <Route path={`${this.props.match.url}/add-question`} render={(props)=>{
    return <QuestionEditor {...props} />;
   }}/>
   <Route path={`${this.props.match.url}/edit-question/:questionId`} 
    render={(props)=>{
     return <QuestionEditor questionId={props.match.params.questionId} 
      {...props} />;
    }}/>
   <Route path={`${this.props.match.url}/preview-question/:questionId`} 
    render={(props)=>{
     return <QuestionPreview questionId={props.match.params.questionId} 
      {...this.props} />;
    }}/>
   <Route path={`${this.props.match.url}/:page`} 
    render={(props)=>{
     return <QuestionManagerComponent page={props.match.params.page} {...this.props} />;
    }} /> 
   <Route render={(props)=>{
    return "No Match found in question manager";
   }}/>
  </Switch>);
 }
}
let QuestionManager = withRouter(connect(mapStateToProps,mapDispatchToProps)(ManageQuestionContainer));

export default QuestionManager;