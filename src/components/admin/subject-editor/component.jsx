import React, { Fragment } from 'react';
import * as _ from 'lodash';
import {Value} from 'slate';
import {RESOURCE_DOWNLOAD_SERVICE_ENDPOINT} from '../../../constants/system-constant';
import {saveSubject,getSubjectById} from '../../../services/ref-data/subject';
import {saveResources,deleteResource,getResources} from '../../../services/ref-data/resource';
import {initialSummary} from './initial-value';
import RichTextEditor from '../rich-text-editor/container';
import './style.css';


export default class SubjectEditorComponent extends React.Component{
  state={
   focusElement : React.createRef(),
   message:'',
   isError:false,
   subject:{
    id:'',
    name:'',   
    summary:initialSummary,
   },
   resources:[],
   resource:{},
  }

  loadAllResources = (resourceId)=>{   
   getResources('SUBJECT',resourceId)
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
 
componentDidMount = ()=>{
 if(this.props.subjectId){     
  getSubjectById(this.props.subjectId)
   .then(data =>{       
    if(data.subject.summary){
     data.subject.summary = Value.fromJSON(JSON.parse(data.subject.summary));       
    }else{
     data.subject.summary = initialSummary;
    }
    this.setState({subject:data.subject});
    this.loadAllResources(this.props.subjectId);
   });
 }
}

  onChange=(fieldName, fieldValue)=>{
   this.setState({subject:{...this.state.subject,[fieldName]:fieldValue}});
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

  handleBack = ()=>{   
   this.props.history.goBack();
  }
  onRemoveResource = (resourceId) =>{   
   deleteResource(resourceId)
    .then(data =>{
     if(this.state.subject && this.state.subject.id){
      this.loadAllResources(this.state.subject.id);
     }     
    })
    .catch(error=>{
     this.setState({isError:true, message:'Error while deleting resouces'});
    });
  }
  onAddResource = () =>{
   if(this.state.subject.id &&  this.state.resource.title &&
    this.state.resource.file ){
    saveResources('SUBJECT',this.state.subject.id,this.state.resource)
     .then(data =>{
      if(this.state.subject && this.state.subject.id){
       this.loadAllResources(this.state.subject.id);
      }  
     })
     .catch(error=>{
      this.setState({isError:true, message:'Error while adding resouces'});
     });
   }
  }

  onSave = ()=>{
   let subject =  this.state.subject;
   let editorString ='';
   if(Value.isValue(subject.summary)){
    editorString = subject.summary.toJSON();
    subject.summary = JSON.stringify(editorString);   
   }   
   window.scroll(0,0);
   saveSubject(subject)    
    .then(resp =>{
     subject = resp.subject;
     if(!Value.isValue(subject.summary)){     
      subject.summary = Value.fromJSON(JSON.parse(subject.summary));       
     }   
     this.setState({isError:false,subject:subject, message:'Subject saved!'});
     this.onAddResource();
    })
    .catch(error =>{
     console.log('Error while saving subject', error);
     this.setState({isError:true, message:error.message});
    });
  }
  onReset = ()=>{
   this.state.focusElement.current.focus();   
   this.setState({message:'',subject:{
    id:'',
    name:'',
    courseId:'',
    summary:initialSummary,
   }});
  }

  onSubjectSummaryChange = ( change ) =>{
   let {value} = change;
   this.setState({subject:{...this.state.subject,summary:value}});
  }

  render(){
   let {subject} = this.props;  
   let resourcesHtml = <tr><td></td></tr>;
   if(this.state.resources && Array.isArray(this.state.resources)){
    resourcesHtml = this.state.resources.map((resource, index)=>{   
     return (
      <tr key={index} className="resource-row">
       <td className=" resource-col text-right">
        {resource.title}
       </td>
       <td className="resource-col">
        <a 
         target="_blank" 
         rel="noopener noreferrer"
         href={RESOURCE_DOWNLOAD_SERVICE_ENDPOINT+'?resourceName=subject&resourceId='+this.state.subject.id+'&fileName='+resource.fileName}
      
        >{resource.fileName?resource.fileName:''}</a>
        <span className="resource-remove-btn" onClick={()=>this.onRemoveResource(resource.id)}>
         <sup>X</sup>
        </span>
       </td>
      </tr>
     );
    });
   }

   return (<div className="containerfluid subject-editor-container">
    <div className="row editor-heading-row "> 
     <div className="back-btn">
      <button className="btn btn-primary" onClick={this.handleBack}>
      Back
      </button>
     </div>   
     <span className="editor-heading-text">Subject Editor</span>
    </div> 
    <hr className="divider"/>
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
         value={this.state.subject && this.state.subject.seqOrder?this.state.subject.seqOrder:''}
         onChange={(e)=>this.onChange('seqOrder', e.target.value)}
        ></input>
       </div>
      </div>      
      <div className="form-group">       
       <label htmlFor="subjectNameId">Name :</label>       
       <input id="subjectNameId" ref={this.state.focusElement} 
        className="form-control"
        name="name"
        value={this.state.subject && this.state.subject.name?this.state.subject.name :''}
        onChange={(e)=>this.onChange('name',e.target.value)}
       /> 
                 
      </div>
      <div className="form-row form-group justify-content-center subject-resource-container">
      
       <label htmlFor="subjectResourceId">Subject Resources:</label>       
       <div id="subjectResourceId" className="container">
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
          <input id="resourceTitleId" 
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
           name="fileName" 
           value={this.state.resource.fileElementValue?this.state.resource.fileElementValue:''} 
           onChange={(e)=>this.onResourceChange('file',e.target)}            
          /> 
         </div>
         <div className="add-resource-btn">
          <button type="button" className="btn btn-primary" 
           disabled={this.state.subject.id?false:true}
           onClick={this.onAddResource}>Add</button>
         </div>
        </div>
       </div>
                      
      </div>
     
      <div className="form-group justify-content-center">
       <label htmlFor="subjectSummaryId">Summary :</label>      
       <RichTextEditor id="subjectSummaryId" readOnly={false}
        value={this.state.subject && this.state.subject.summary}
        placeholder="Enter subject summary"
        tabIndex={0} autoFocus={false}        
        onChange={this.onSubjectSummaryChange}   />
      </div>

      <div className="form-group row">
       <div className="col-4 text-center">
        <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
       </div> 
       <div className="col-4 text-center">
        <button type="button" className="btn btn-primary" 
         onClick={this.onReset}>Reset</button>
       </div>    
      </div>
     </form>     
    </div>
   </div>);
  }
} 