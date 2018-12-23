import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import ChapterHomeComponent from './component';
import TestPanel from '../test-panel/container';

class ChapterContainer extends React.Component{
 render(){
  return(<Switch>
   <Route exact path={`${this.props.match.url}`} 
    render={(props)=>{
     return <ChapterHomeComponent 
      {...this.props}      
     />;
    }}/>
   <Route path={`${this.props.match.url}/examtestpaper/:testId`} 
    render={(props)=>{
     return <TestPanel 
      testId={props.match.params.testId}
      {...this.props} />;    
    }}/>   
  </Switch>);
  
 }
}
let ChapterHome = withRouter(ChapterContainer);
export default  ChapterHome;