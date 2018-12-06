import React, { Fragment } from 'react';
import * as _ from 'lodash';
import {Value} from 'slate';
import RichTextEditor from '../rich-text-editor/container';
import {initialSummary} from './initial-value';
import {saveTopic, getTopicById} from '../../../services/ref-data/topic';
import {saveResources,deleteResource,getResources} from '../../../services/ref-data/resource';
import {getAllChapters} from '../../../services/ref-data/chapter';
import './style.css';

export default class TopicEditorComponent extends React.Component{
  state={
   message:'',
   isError:false,
   topic:{
    id:'',
    chapterId:'',
    name:'',
    summary:initialSummary,
   } ,
   resources:[],
   resource:{},
   chapters:[]
  }

  loadAllResources = (resourceId)=>{    
   getResources('TOPIC',resourceId)
    .then(resourceData =>{
     let resources = [];
     if(resourceData.resources && Array.isArray(resourceData.resources)){
      resources = resourceData.resources;
      this.setState({resources:resources,resource:{}});
     }     
    })
    .catch(error =>{
     this.setState({isError:true,message:'Error while reterving resources'});
    });
  }
componentDidMount =()=>{  
 if(this.props.topicId){
  getTopicById(this.props.topicId)
   .then(data =>{
    if(data.topic.summary){
     data.topic.summary = Value.fromJSON(JSON.parse(data.topic.summary));       
    }else{
     data.topic.summary = initialSummary;
    }
    this.setState({topic:data.topic});
    this.loadAllResources(this.props.topicId);
   })
   .catch(error =>{
    this.setState({isError:true, message:error.message});
   });
 }
  
 getAllChapters().then(data =>{
  this.setState({chapters:data.chapters});
 })
  .catch(error =>{
   this.setState({isError:true, message:error.message});
  });
}

onResourceChange = ( fieldName, target ) =>{
 let resource = this.state.resource;
 if('file' === target.type ){
  resource[fieldName]= target.files[0] ;  
  resource.fileElementValue = target.value;
 }else{
  resource[fieldName]= target.value ;
 }  
 this.setState({resource:resource}); 
}


onRemoveResource = (resourceId) =>{
 deleteResource(resourceId)
  .then(data =>{
   if(this.state.topic && this.state.topic.id){
    this.loadAllResources(this.state.topic.id);
   }     
  })
  .catch(error=>{
   this.setState({isError:true, message:'Error while deleting resouces'});
  });
}

onAddResource = () =>{
 if(this.state.topic.id && this.state.resource.title
  && this.state.resource.file ){
  saveResources('TOPIC',this.state.topic.id,this.state.resource)
   .then(data =>{
    if(this.state.topic && this.state.topic.id){
     this.loadAllResources(this.state.topic.id);
    }  
   })
   .catch(error=>{
    this.setState({isError:true, message:'Error while adding resouces'});
   });
 }
}

  onChange=(fieldName, fieldValue)=>{
   this.setState({topic:{...this.state.topic,[fieldName]:fieldValue}});
  }

  onTopicSummaryChange = ( change ) =>{
   let {value} = change;
   this.setState({topic:{...this.state.topic,summary:value}});
  }

  handleBack = ()=>{   
   this.props.history.goBack();
  }
  onSave = ()=>{
   let topic =  this.state.topic;
   window.scroll(0,0);
   let editorString ='';
   if(Value.isValue(topic.summary)){
    editorString = topic.summary.toJSON();
    topic.summary = JSON.stringify(editorString);   
   } 
   saveTopic(this.state.topic).then((resp)=>{
    topic = resp.topic;
    if(!Value.isValue(topic.summary)){     
     topic.summary = Value.fromJSON(JSON.parse(topic.summary));       
    } 
    this.setState({isError:false,topic:topic, message:'Topic saved!'});
    this.onAddResource();  
   }).catch(error =>{
    this.setState({isError:true,message:error.message});
   });
  }
 
  render(){
   let {topic} = this.props;

   let resourcesHtml = '';
   if(Array.isArray(this.state.resources)){
    resourcesHtml = this.state.resources.map((resource, index)=>{     
     return (
      <tr key={index} className="resource-row">
       <td className=" resource-col text-right">
        {resource.title}
       </td>
       <td className="resource-col">
        <a target="_blank" href="th.html">{resource.fileName?resource.fileName:''}</a>
        <span className="resource-remove-btn" onClick={()=>this.onRemoveResource(resource.id)}>
         <sup>X</sup>
        </span>
       </td>
      </tr>
     );
    });
   }

   return (<div className="container-fluid topic-editor-container">
    <div className="row editor-heading-row "> 
     <div className="back-btn">
      <button className="btn btn-primary" onClick={this.handleBack}>
      Back
      </button>
     </div>   
     <span className="editor-heading-text">Topic Editor</span>
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
    <div className="row justify-content-center editor-detail-row">     
     <form> 
      <div className="form-row">
       <label htmlFor="seqOrderId">Seq Order: </label>
       <div className="form-group col-6 col-sm-2">        
        <input type="text"
         id="seqOrderId"
         className="form-control"
         name="seqOrder"
         value={this.state.topic.seqOrder?this.state.topic.seqOrder:''}
         onChange={(e)=>this.onChange('seqOrder', e.target.value)}
        ></input>
       </div>
      </div>     
      <div className="form-group">
       <label htmlFor="topicChapterId">Chapter :</label>        
       <select id="topicChapterId" className="form-control"
        name="chapterId"
        value={this.state.topic.chapterId}
        onChange={(e)=>this.onChange('chapterId',e.target.value)}
       >
        <option>Please Select</option>
        {Array.isArray(this.state.chapters)?this.state.chapters.map((chapter,index)=>{
         return <option key={index} value={chapter.id}>{chapter.name}</option>; 
        }):''}
       </select>
      </div>      
      <div className="form-group">
       <label htmlFor="topicNameId">Name :</label>        
       <input id="topicNameId" className="form-control"
        name="name"
        value={this.state.topic.name}
        onChange={(e)=>this.onChange('name',e.target.value)}
       />
      </div> 

      <div className="form-row form-group justify-content-center topic-resource-container">
       <div className="flex-grow-1">
        <label htmlFor="topicResourceId">Topic Resources:</label>       
        <div id="topicResourceId" className="container">
         <div className="row align-items-center">
          <table className="table table-striped">
           <tbody>
            {resourcesHtml}
           </tbody>
          </table>
         </div>
         <div className="row align-items-center">
          <div className="form-group mr-2">
           <label htmlFor="resourceTitleId">Title :</label> 
           <input id="resourceTitleId" ref={this.state.focusElement} 
            className="form-control"
            name="title"
            value={this.state.resource.title?this.state.resource.title:''}
            onChange={(e)=>this.onResourceChange('title',e.target)}
           /> 
          </div>
          <div className="form-group">
           <label htmlFor="resourceFileNameId">File :</label> 
           <input type="file" 
            id="resourceFileNameId"
            className="form-control"
            name="file" 
            value={this.state.resource.fileElementValue?this.state.resource.fileElementValue:''} 
            onChange={(e)=>this.onResourceChange('file',e.target)}            
           /> 
          </div>
          <div className="add-resource-btn">
           <button type="button" className="btn btn-primary" onClick={this.onAddResource}>Add</button>
          </div>
         </div>
        </div>
       </div>                  
      </div>    
      <div className=" form-group justify-content-center">
       <label htmlFor="topicSummaryId">Summary :</label>      
       <RichTextEditor id="topicSummaryId" readOnly={false}
        value={this.state.topic.summary}
        placeholder="Enter topic summary"
        tabIndex={0} autoFocus={false}        
        onChange={this.onTopicSummaryChange}   />
      </div> 
      <div className="form-group row">
       <div className="col-4 text-right">
        <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
       </div>        
      </div>
     </form>
    </div>
   </div>);
  }
} 