import React from 'react';
import * as _ from 'lodash';
import {Value} from 'slate';
import './style.css';
import RichTextEditor from '../rich-text-editor/container';
import {getBlogById, saveBlog} from '../../../services/blog';
import {initialSummary} from './initial-value';

export default class BlogEditorComponent extends React.Component{

    state={
     message:'',
     isError:false,
     blog:{
      summary:'',
      description:initialSummary,
     }      
    }

    componentDidMount =()=>{
      window.scroll(0,0);
     if(this.props.blogId){   
      getBlogById(this.props.blogId)
       .then(resp =>{
        if(resp.blog.description){
         resp.blog.description = Value.fromJSON(JSON.parse(resp.blog.description));       
        }else{
         resp.blog.description = initialSummary;
        }
        this.setState({blog:resp.blog});
       });
     }else if(document.cookie){
      let cookiearray = document.cookie.split(';');
      let name, value;
      for(var i=0; i<cookiearray.length; i++){
       name = cookiearray[i].split('=')[0];
       value = cookiearray[i].split('=')[1];
       if('blog' === name){
        let blog = JSON.parse(value);
        if(!Value.isValue(blog.description)){
         blog.description = Value.fromJSON(blog.description);
        }
        this.setState({blog:blog});
       }
       
      }
     }

     

    }

    onSave = ()=>{
     let blog =  this.state.blog;
     window.scroll(0,0);
     let editorString ='';
     if(Value.isValue(blog.description)){
      editorString = blog.description.toJSON();
      blog.description = JSON.stringify(editorString);   
     }
     saveBlog(blog)
      .then(resp =>{
       blog = resp.blog;
       if( !Value.isValue(blog.description)){
        blog.description = Value.fromJSON(JSON.parse(blog.description));
       }
       this.setState({isError:false, message:'',blog:blog});
       this.props.history.goBack();
      })
      .catch(error =>{
       this.setState({isError:true, message:error.message});
      });
    }
    onChange = (filedName, fieldValue)=>{
     this.setState({blog:{...this.state.blog,[filedName]:fieldValue}});
     document.cookie="blog="+JSON.stringify(this.state.blog);
    }

    onBlogDescriptionChange  = ( change ) =>{
     let {value} = change;
     this.setState({blog:{...this.state.blog,description:value}});
     document.cookie="blog="+JSON.stringify(this.state.blog);
    }

    render(){
     return <div className="container-fluid blog-editor-container">
      <div className="row editor-heading-row "> 
       <div className="back-btn">
        <button className="btn btn-primary" onClick={this.props.history.goBack}>
      Back
        </button>
       </div>   
       <span className="editor-heading-text">Blog Editor</span>
      </div>
      <hr className="divider m-1"/>
      <div className="row justify-content-center">
       <div className="text-center">      
        {this.state.message?
         <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
          {this.state.message}       
         </div>:''}
       </div>
      </div>
      <form>
       <div className="form-row">
        <label htmlFor="seqOrderId">Seq Order: </label>
        <div className="form-group col-6 col-md-1">        
         <input type="text"
          id="seqOrderId"
          className="form-control"
          name="seqOrder"
          value={this.state.blog.seqOrder?this.state.blog.seqOrder:''}
          onChange={(e)=>this.onChange('seqOrder', e.target.value)}
         ></input>
        </div>
       </div>
       <div className="form-group">
        <label htmlFor="blogSummaryId">Blog Summary:</label>
        <input type="text"
         id="blogSummaryId"
         className="form-control"
         name="summary"
         value={this.state.blog.summary}
         onChange={(e)=>this.onChange('summary', e.target.value)}
        ></input>
       </div>
       <div className="form-group">
        <label htmlFor="blogDescriptionId">Blog Description:</label>
        <RichTextEditor id="blogDescriptionId" readOnly={false}
         value={this.state.blog.description}
         placeholder="Enter blog description"
         tabIndex={0} autoFocus={false}        
         onChange={this.onBlogDescriptionChange}   />
       </div>
       <div className="form-group row">
        <div className="col-4 text-right">
         <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
        </div>        
       </div>

      </form>            
     </div>;
    }

}
