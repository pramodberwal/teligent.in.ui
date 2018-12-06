import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import BlogManagerComponent from './component';
import {getAllBlogs} from '../../../services/blog' ;
import BlogEditor from '../blog-editor/container';

class BlogManagerContainer extends React.Component{
 
 render(){
  return (
   <Switch>
    <Route exact 
     path={`${this.props.match.url}`} 
     render={()=><BlogManagerComponent {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/add-blog`} 
     render={()=><BlogEditor {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/edit-blog/:id`} 
     render={(props)=><BlogEditor blogId={props.match.params.id} {...this.props}/>} />
   </Switch>
  );   
 }
}
let BlogManager = withRouter(BlogManagerContainer);

export default BlogManager;   
