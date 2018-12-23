import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import MockExamEditorComponent from './component';
import TestEditor from '../test-editor/container';

class MockExamEditorContainer extends React.Component{  
 render(){   
  return(
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render={()=>{
      return <MockExamEditorComponent         
       {...this.props}/>;
     }}/>
    <Route path={`${this.props.match.url}/add-test`} 
     render ={(props) =>{
      return <TestEditor {...props} />;
     }}/>
    <Route path={`${this.props.match.url}/edit-test/:id`} 
     render ={(props) =>{
      return <TestEditor 
       testId={props.match.params.id}
       {...props} />;
     }}/>  
   </Switch>
  );
 }
}

let MockExamEditor = withRouter(MockExamEditorContainer);
export default MockExamEditor;