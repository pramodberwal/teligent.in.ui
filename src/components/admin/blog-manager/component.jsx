import React from 'react';
import {Link} from 'react-router-dom';
import { Value } from 'slate';
import RichTextEditor from '../../admin/rich-text-editor/container';
import {getAllBlogs} from '../../../services/blog';
import {deleteBlog} from '../../../services/blog';
import './style.css';

export default class BlogManagerComponent extends React.Component{
    state={
     isError:false,
     message:'Loading blogs....',
     blogs:[],
    }
    componentDidMount=()=>{
     window.scroll(0,0);
     getAllBlogs()
      .then(resp => {
       this.setState({isError:false,message:'',blogs:resp.blogs});
      })
      .catch(error=>{
       this.setState({isError:true,message:error.message});
      });
    }

    deleteBlog = (id)=>{
     deleteBlog(id)
      .then(data =>{
       this.componentDidMount();
      })
      .catch(error =>{
       this.setState({isError:true,message:error.message});
      });
    }
 

    render(){

     if( !Array.isArray(this.state.blogs) || this.state.blogs.length === 0){
      return <div className="container-fluid blog-manager-container">
       <div className="row heading-row">     
        <div>
         <Link className="btn btn-primary" to={`${this.props.match.url}/add-blog`}>Add New</Link>
        </div>    
        <div className="flex-grow-1 text-center">
        Blog Manager
        </div>
       </div>
       <div className="row justify-content-center">
        {this.state.message?
         <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
          {this.state.message}       
         </div>:''}   
       </div>
      </div>;
     }

     let blogListHtml = this.state.blogs.map((blog,index)=>{
      return <div key={index} className="row blog-row"> 
       <div className="flex-grow-1">
        <div className="blog-summary-row">
         <div className="container-fluid">
          <div className="row">
           <div className="flex-grow-1">
            {blog.summary}
           </div>
           <div className="blog-edit-btn">
            <Link className="btn btn-primary" to={`${this.props.match.url}/edit-blog/`+blog.id}>Edit</Link>
           </div> 
           <div className="blog-delete-btn">
            <button type="button" className="btn btn-primary" onClick={()=>this.deleteBlog(blog.id)}>Delete</button>
           </div> 
          </div>

         </div>
        </div>
        <div className="blog-Description">
         <RichTextEditor readOnly={true}
          value={Value.fromJSON(JSON.parse(blog.description))}/>
        </div>
       </div>     
      </div>;
     });

     return <div className="container-fluid blog-manager-container">
      <div className="row heading-row ">     
       <div>
        <Link className="btn btn-primary" to={`${this.props.match.url}/add-blog`}>Add New</Link>
       </div>    
       <div className="flex-grow-1 text-center">
        Blog Manager
       </div>
      </div>

      {blogListHtml}

     </div>;
    }
}