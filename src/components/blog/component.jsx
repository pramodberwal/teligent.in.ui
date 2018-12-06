import React from 'react';
import * as _ from 'lodash';
import {NavLink} from 'react-router-dom';
import RichTextEditor from '../admin/rich-text-editor/container';
import { Value } from 'slate';
import {getAllBlogs,getBlogById} from '../../services/blog';
import './style.css';

export default class BlogComponent extends React.Component{
    state={
     isError:true,
     message:'Please wait while loading the blog...',
     blogs:[],
     blog:'',  
    }
    componentDidMount=()=>{
     getAllBlogs()
      .then( data =>{
       this.setState({isError:false,message:'',blogs:data.blogs,blog:data.blogs[0]});
      })
      .catch(error =>{
       this.setState({isError:true,message:error.message});
      });
    }
    componentWillReceiveProps =(props)=>{
     if(props.blogId){
      let blog = _.find(this.state.blogs, blog =>Number(blog.id) === Number(props.blogId));
      this.setState({blog:blog});
     }
    }

    render(){
     window.scrollTo(0,0);
     if(!Array.isArray(this.state.blogs) || this.state.blogs.length === 0){
      return <div>
       {this.state.message}
      </div>;
     }
     let blogListHtml = this.state.blogs.map((blog,index)=>{
      return <li key={index}>
       <NavLink to={`${this.props.match.url}/`+blog.id}>{blog.summary}</NavLink>
      </li>;
     });

     return <div className="container-fluid blog-container">  
      <div className="row">
       <div className="blog-navigation-container">
        <ol>
         {blogListHtml}
        </ol>
       </div>
       <div className="flex-grow-1 blog-detail-container">
        <div className="blog-summary-header">{this.state.blog.summary}</div>
        <div className="blog-Description">
         {this.state.blog?<RichTextEditor readOnly={true}
          value={Value.fromJSON(JSON.parse(this.state.blog.description))}/>
          :''}   
        </div>
            
       </div>
      </div>
     </div>;
    }

}