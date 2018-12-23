import React from 'react';
import  {withRouter,Switch, Route} from 'react-router-dom';
import MockExamManagerComponent from './component';
import MockExamEditor from '../mock-exam-editor/container';

class MockExamManagerContainer extends React.Component{
 render () {  
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render ={(props) =>{
      return <MockExamManagerComponent  {...props} />;
     }}/>
    <Route path={`${this.props.match.url}/add-mock-exam`} 
     render ={(props) =>{
      return <MockExamEditor {...props} />;
     }}/>
    <Route path={`${this.props.match.url}/edit-mock-exam/:id`} 
     render ={(props) =>{
      return <MockExamEditor 
       examId={props.match.params.id}
       {...props} />;
     }}/>
   </Switch>
  );
 }    
}

let MockExamManager = withRouter(MockExamManagerContainer);
export default MockExamManager;

