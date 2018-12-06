import React from 'react';
import {withRouter,Switch,Route} from 'react-router-dom';
import BlogEditorComponent from './component';

class BlogEditorContainer extends React.Component{
 render(){
  return (
   <Switch>
    <Route exact path={this.props.match.url} render={()=>{
     return <BlogEditorComponent {...this.props}/>;
    }}/>              
   </Switch>   
  );
 }
}

let BlogEditor = withRouter(BlogEditorContainer);
export default BlogEditor;