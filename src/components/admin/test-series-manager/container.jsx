import React from 'react';
import  {withRouter,Switch, Route} from 'react-router-dom';
import { connect} from 'react-redux';
import TestSeriesManagerComponent from './component';
import TestSeriesEditor from '../test-series-editor/container';

let mapStateToProps =( state )=>{ 
 return {};
};
let mapDispatchToProps = (dispatch ) =>{
 return {};
};
class TestSeriesManagerContainer extends React.Component{
 render () {  
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render ={(props) =>{
      return <TestSeriesManagerComponent 
       testSeriseList={this.props.testSeriseList} {...props} />;
     }}/>
    <Route path={`${this.props.match.url}/add-test-series`} 
     render ={(props) =>{
      return <TestSeriesEditor {...props} />;
     }}/>
    <Route path={`${this.props.match.url}/edit-test-series/:id`} 
     render ={(props) =>{
      return <TestSeriesEditor 
       seriesId={props.match.params.id}
       {...props} />;
     }}/>
   </Switch>
  );
 }    
}

let TestSeriesManager = withRouter(connect(mapStateToProps,mapDispatchToProps)(TestSeriesManagerContainer));
export default TestSeriesManager;

