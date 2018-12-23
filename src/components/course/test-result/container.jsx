import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Switch, Route} from 'react-router-dom';
import TestResultComponent from './component';

class TestResultContainer extends React.Component{

 render(){
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`}
     render = {(props)=>{
      return <TestResultComponent {...this.props}/>;
     }}/>
   </Switch>
  );
 }
}

let TestResult = withRouter(connect()(TestResultContainer));
export default TestResult;