import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import SubjectHomeComponent from './component';
import TestSeriesPanel from '../test-series-panel/container';
import ChapterHome from '../chapter-home/container';

class SubjectContainer extends React.Component{
 render(){ 
  return(<Switch>
   <Route exact path={`${this.props.match.url}`} 
    render={()=>{
     return <SubjectHomeComponent 
      {...this.props}/>;      
    }}/>
    
   <Route path={`${this.props.match.url}/chapter/:chapterId`} 
    render = {(props)=>{      
     return <ChapterHome 
      resource='chapter' 
      chapterId={props.match.params.chapterId}
      {...this.props}/> ;
    }
    }
   />

   <Route path={`${this.props.match.url}/testSeries/:seriesId`} 
    render={(props)=>{
     return <TestSeriesPanel 
      testSeriesId={props.match.params.seriesId}
      {...this.props} />;       
    }}/> 

  </Switch>);  
 }
}

let SubjectHome = withRouter(SubjectContainer);
export default  SubjectHome;