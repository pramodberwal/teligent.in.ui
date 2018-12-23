import React from 'react';
import {withRouter,Switch, Route} from 'react-router-dom';
import QuestionPanelComponent from './component';


class QuestionPanelContainer extends React.Component{
 render(){
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`}
     render={()=>{
      return <QuestionPanelComponent
       currentQuestionIndex={0}
       testId={this.props.testId}
       {...this.props}
      />;
     }} /> 
   </Switch>   
  );
 }
}

let QuestionPanel = withRouter(QuestionPanelContainer);
export default QuestionPanel;