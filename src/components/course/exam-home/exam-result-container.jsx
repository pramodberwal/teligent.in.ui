import React from 'react';
import {Switch,Route, withRouter} from 'react-router-dom';
import ExamResultComponent from './exam-result';

class ExamResultContainer extends React.Component{
 render() {
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render = {(props)=>{
      return <ExamResultComponent 
       {...this.props} />;
     }}/>   
   </Switch>
  );
 }
}
let ExamResult = withRouter(ExamResultContainer);
export default ExamResult;