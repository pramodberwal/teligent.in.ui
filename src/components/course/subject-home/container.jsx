import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import SubjectHomeComponent from './component';
import TestPanel from '../test-panel/container';
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

   <Route path={`${this.props.match.url}/examtestpaper/:testId`} 
    render={(props)=>{
     return <TestPanel 
      testId={props.match.params.testId}
      {...this.props} />;       
    }}/> 

  </Switch>);  
 }
}

let SubjectHome = withRouter(SubjectContainer);
export default  SubjectHome;