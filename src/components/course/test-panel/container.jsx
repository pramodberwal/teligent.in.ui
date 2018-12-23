import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route, withRouter} from 'react-router-dom';
import TestPanelComponent from './component';
import TestResultContainer from '../test-result/container';
class TestPanelContainer extends React.Component{
 render() {
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render = {(props)=>{
      return <TestPanelComponent 
       {...this.props} />;
     }}/>
    <Route path={`${this.props.match.url}/result`}
     render = {()=>{
      return <TestResultContainer {...this.props}/>;
     }} />
    <Route path={`${this.props.match.url}/start`} 
     render = {(props)=>{       
      return <TestPanelComponent start={true} 
       {...this.props} />;
     }}/>
   </Switch>
  );
 }
}
let TestPanel = withRouter(TestPanelContainer);
export default TestPanel;