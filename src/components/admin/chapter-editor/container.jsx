import React from 'react';
import {withRouter,Switch,Route} from 'react-router-dom';
import ChapterEditorComponent from './component';

class ChapterEditorContainer extends React.Component{
 render(){
  return (
   <Switch>
    <Route exact to={`${this.props.match.url}`} render={()=>{
     return <ChapterEditorComponent {...this.props}/>;
    }}/>
    <Route to={`${this.props.match.url}/:chapterId`} render={(props)=>{
     return <ChapterEditorComponent chapterId={props.match.params.chapterId} {...this.props}/>;
    }}/>

   </Switch>
   
  );
 }
}

let ChapterEditor = withRouter(ChapterEditorContainer);
export default ChapterEditor;