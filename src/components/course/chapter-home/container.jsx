import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import ChapterHomeComponent from './component';
import TestSeriesPanel from '../test-series-panel/container';

class ChapterContainer extends React.Component{
 render(){
  return(<Switch>
   <Route exact path={`${this.props.match.url}`} 
    render={(props)=>{
     return <ChapterHomeComponent 
      {...this.props}      
     />;
    }}/>
   <Route path={`${this.props.match.url}/testSeries/:seriesId`} 
    render={(props)=>{
     return <TestSeriesPanel 
      testSeriesId={props.match.params.seriesId}
      {...this.props} />;    
    }}/>   
  </Switch>);
  
 }
}
let ChapterHome = withRouter(ChapterContainer);
export default  ChapterHome;