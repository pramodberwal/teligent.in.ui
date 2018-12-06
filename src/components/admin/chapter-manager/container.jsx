import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import ChapterComponent from './component';
import ChapterEditor from '../chapter-editor/container';

class ChapterManagerContainer extends React.Component{
 
 render(){
  return (
   <Switch>
    <Route exact 
     path={`${this.props.match.url}`} 
     render={()=><ChapterComponent {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/add-chapter`} 
     render={()=><ChapterEditor {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/edit-chapter/:id`} 
     render={(props)=><ChapterEditor chapterId={props.match.params.id} {...this.props}/>} />
   </Switch>
  );   
 }
}


let ChapterManager = withRouter(ChapterManagerContainer);

export default ChapterManager;