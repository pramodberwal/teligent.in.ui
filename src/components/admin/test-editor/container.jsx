import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,withRouter} from 'react-router-dom';
import TestEditorComponent from './component';
import AddQuestionComponent from './add-question-container';

class TestEditorContainer extends React.Component{  
 render(){   
  return(
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render={()=>{
      return <TestEditorComponent         
       {...this.props}/>;
     }}/> 
    <Route exact path={`${this.props.match.url}/add-question/:id`} 
     render={(props)=>{
      return <AddQuestionComponent
       testId={props.match.params.id}
      />;
     }}/> 
   </Switch>
  );
 }
}

let TestEditor = withRouter(TestEditorContainer);
export default TestEditor;