import React from 'react';
import {withRouter,Switch,Route} from 'react-router-dom';
import BlogComponent from './component';

class BlogContainer extends React.Component{
 render(){
  return <Switch>
   <Route exact path={this.props.match.url} render={()=>{
    return <BlogComponent {...this.props}/>;
   }} />
   <Route  path={`${this.props.match.url}/:blogId`} render={(props)=>{
    return <BlogComponent blogId={props.match.params.blogId}  {...this.props}/>;
   }} />
  </Switch>;
 }
}

let Blog = withRouter(BlogContainer);
export default Blog;