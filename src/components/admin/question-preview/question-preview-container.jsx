import React from 'react';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import { withRouter,Switch,Route } from 'react-router-dom';
import QuestionEditor from '../question-editor/question-editor-container';
import QuestionPreviewComponent from './question-preview-component';

class QuestionPreviewContainer extends React.Component{
 render(){
  return (<Switch>
   <Route exact path={`${this.props.match.url}`} 
    render = {()=>{
     return <QuestionPreviewComponent {...this.props}/>;
    }}/> 
   <Route path={`${this.props.match.url}/edit-question`} 
    render={(props)=>{     
     return <QuestionEditor questionId={this.props.questionId} 
      {...props} />;
    }}/>   
  </Switch>);
 }
}

let QuestionPreview = withRouter(QuestionPreviewContainer);
export default QuestionPreview;