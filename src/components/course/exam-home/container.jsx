import React from 'react';
import {Switch,Route, withRouter} from 'react-router-dom';
import ExamHomeComponent from './component';
import ExamStartHome from './exam-start-home';
import ExamResult from './exam-result-container';

class ExamHomeContainer extends React.Component{
 render() {
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render = {(props)=>{
      return <ExamHomeComponent 
       {...this.props} />;
     }}/>
    <Route path={`${this.props.match.url}/start/:examId`} 
     render = {(props)=>{
      return <ExamStartHome 
       examId={props.match.params.examId}
       {...this.props} />;
     }}/>
    <Route path={`${this.props.match.url}/finish/:examId`} 
     render = {(props)=>{
      return <ExamResult 
       examId={props.match.params.examId}
       {...this.props} />;
     }}/>
   </Switch>
  );
 }
}
let ExamHome = withRouter(ExamHomeContainer);
export default ExamHome;