import React from 'react';
import * as _ from 'lodash';
import {RESOURCE_DOWNLOAD_SERVICE_ENDPOINT} from '../../../constants/system-constant';
import {Value} from 'slate';
import RichTextEditor from '../rich-text-editor/container';
import {saveChapter, getChapterById} from '../../../services/ref-data/chapter';
import {saveResources,deleteResource,getResources} from '../../../services/ref-data/resource';
import {getAllSubjects} from '../../../services/ref-data/subject';
import {initialSummary} from './initial-value';
import './style.css';

export default class ChapterEditorComponent extends React.Component{
  state={
   message:'',
   isError:false,
   chapter:{
    id:'',
    subjectId:'',
    name:'',
    summary:initialSummary,
   } ,
   resources:[],
   resource:{},
   subjects:[]
  }
  loadAllResources = (resourceId)=>{    
   getResources('CHAPTER',resourceId)
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
 window.scroll(0,0);
 if(this.props.chapterId){ 
  this.loadAllResources(this.props.chapterId);  
  getChapterById(this.props.chapterId)
   .then(data =>{
    if(data.chapter.summary){
     data.chapter.summary = Value.fromJSON(JSON.parse(data.chapter.summary));       
    }else{
     data.chapter.summary = initialSummary;
    }
    this.setState({chapter:data.chapter});
   })
   .catch(error =>{
    this.setState({isError:true,message:error.message});
   });
 }
  
 getAllSubjects().then(data =>{
  this.setState({subjects:data.subjects});
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
    if(this.state.chapter && this.state.chapter.id){
     this.loadAllResources(this.state.chapter.id);
    }     
   })
   .catch(error=>{
    this.setState({isError:true, message:'Error while deleting resouces'});
   });
 }
  onAddResource = () =>{
   if(this.state.chapter.id && this.state.resource.title 
    && this.state.resource.file){
    saveResources('CHAPTER',this.state.chapter.id,this.state.resource)
     .then(data =>{
      if(this.state.chapter && this.state.chapter.id){
       this.loadAllResources(this.state.chapter.id);
      }  
     })
     .catch(error=>{
      this.setState({isError:true, message:'Error while adding resouces'});
     });
   }
  }

  onChange=(fieldName, fieldValue)=>{
   this.setState({chapter:{...this.state.chapter,[fieldName]:fieldValue}});
  }
  handleBack = ()=>{   
   this.props.history.goBack();
  }

  onChapterSummaryChange = ( change ) =>{
   let {value} = change;
   this.setState({chapter:{...this.state.chapter,summary:value}});
  }
  onSave = ()=>{
   let chapter =  this.state.chapter;
   window.scroll(0,0);
   let editorString ='';
   if(Value.isValue(chapter.summary)){
    editorString = chapter.summary.toJSON();
    chapter.summary = JSON.stringify(editorString);   
   }   

   saveChapter(chapter).then((resp)=>{
    chapter = resp.chapter;
    if(!Value.isValue(chapter.summary)){     
     chapter.summary = Value.fromJSON(JSON.parse(chapter.summary));       
    }   
    this.setState({isError:false,chapter:chapter, message:'Chapter saved!'});
    this.onAddResource();
   }).catch(error =>{
    this.setState({isError:true,message:error.message});
   });
  }
 
  render(){
   let {chapter} = this.props;

   let resourcesHtml = '';
   if(Array.isArray(this.state.resources)){
    resourcesHtml = this.state.resources.map((resource, index)=>{     
     return (
      <tr key={index} className="resource-row">
       <td className=" resource-col text-right">
        {resource.title}
       </td>
       <td className="resource-col">
        <a target="_blank" 
         rel="noopener noreferrer"
         href={RESOURCE_DOWNLOAD_SERVICE_ENDPOINT+'?resourceName=chapter&resourceId='+this.state.chapter.id+'&fileName='+resource.fileName}
        >{resource.fileName?resource.fileName:''}</a>
        <span className="resource-remove-btn" onClick={()=>this.onRemoveResource(resource.id)}>
         <sup>X</sup>        
        </span>        
       </td>
      </tr>
     );
    });
   }

   return (<div className="container-fluid chapter-editor-container">
    <div className="row editor-heading-row "> 
     <div className="back-btn">
      <button className="btn btn-primary" onClick={this.handleBack}>
      Back
      </button>
     </div>   
     <span className="editor-heading-text">Chapter Editor</span>
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
       <div className="form-group col-6 col-sm-1">        
        <input type="text"
         id="seqOrderId"
         className="form-control"
         name="seqOrder"
         value={this.state.chapter.seqOrder?this.state.chapter.seqOrder:''}
         onChange={(e)=>this.onChange('seqOrder', e.target.value)}
        ></input>
       </div>
      </div>
      <div className="form-group">
       <label htmlFor="chapterSubjectId">Subject :</label>
        
       <select id="chapterSubjectId" className="form-control"
        name="subjectId"
        value={this.state.chapter.subjectId}
        onChange={(e)=>this.onChange('subjectId',e.target.value)}
       >
        <option>Please Select</option>
        {Array.isArray(this.state.subjects)?this.state.subjects.map((subject,index)=>{
         return <option key={index} value={subject.id}>{subject.name}</option>; 
        }):''}
       </select>
      </div> 

      <div className="form-group">
       <label htmlFor="chapterNameId">Name :</label>        
       <input id="chapterNameId" className="form-control"
        name="name"
        value={this.state.chapter.name}
        onChange={(e)=>this.onChange('name',e.target.value)}
       />
      </div> 

      <div className="form-row form-group justify-content-center chapter-resource-container">
     
       <label htmlFor="chapterResourceId">Chapter Resources:</label>       
       <div id="chapterResourceId" className="container">
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
      <div className=" form-group justify-content-center">
       <label htmlFor="chapterSummaryId">Summary :</label>      
       <RichTextEditor id="chapterSummaryId" readOnly={false}
        value={this.state.chapter.summary}
        placeholder="Enter subject summary"
        tabIndex={0} autoFocus={false}        
        onChange={this.onChapterSummaryChange}   />
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