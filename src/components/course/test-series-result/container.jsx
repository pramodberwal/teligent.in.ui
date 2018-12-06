import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Switch, Route} from 'react-router-dom';
import TestSeriesResultComponent from './component';


let mapStateToProps = (state,props) =>{
 return {};
};

let mapDispatchToProps = (dispatch) =>{
 return {};
};

class TestSeriesResultContainer extends React.Component{

 render(){
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`}
     render = {(props)=>{
      return <TestSeriesResultComponent {...this.props}/>;
     }}/>
   </Switch>
  );
 }
}

let TestSeriesResult = withRouter(connect()(TestSeriesResultContainer));
export default TestSeriesResult;