import React from 'react';
import  {withRouter,Switch, Route} from 'react-router-dom';
import TestManagerComponent from './component';
import TestEditor from '../test-editor/container';

class TestManagerContainer extends React.Component{
 render () {  
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render ={(props) =>{
      return <TestManagerComponent 
       testList={this.props.testList} {...props} />;
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

let TestManager = withRouter(TestManagerContainer);
export default TestManager;

