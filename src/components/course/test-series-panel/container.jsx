import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route, withRouter} from 'react-router-dom';
import TestSeriesPanelComponent from './component';
import TestSeriesResultContainer from '../test-series-result/container';
class TestSeriesPanelContainer extends React.Component{
 render() {
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render = {(props)=>{
      return <TestSeriesPanelComponent 
       {...this.props} />;
     }}/>
    <Route path={`${this.props.match.url}/result`}
     render = {()=>{
      return <TestSeriesResultContainer {...this.props}/>;
     }} />
    <Route path={`${this.props.match.url}/start`} 
     render = {(props)=>{       
      return <TestSeriesPanelComponent start={true} 
       {...this.props} />;
     }}/>
   </Switch>
  );
 }
}
let TestSeriesPanel = withRouter(TestSeriesPanelContainer);
export default TestSeriesPanel;