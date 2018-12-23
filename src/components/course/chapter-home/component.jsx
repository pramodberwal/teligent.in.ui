import React from 'react';
import * as _ from 'lodash';
import {RESOURCE_DOWNLOAD_SERVICE_ENDPOINT} from '../../../constants/system-constant';
import {ChapterTestTable} from './chapter-test-table';
import RichTextEditor from '../../admin/rich-text-editor/container';
import { getTestsByChapter } from '../../../services/exam-test';
import { getChapterById } from '../../../services/ref-data/chapter';
import { Value } from 'slate';
import {getResources} from '../../../services/ref-data/resource';
import './style.css';

export default class ChapterHomeComponent extends React.Component{
    state =  {
     isError:false,
     message:'Please wait while we are loading chapter data...',
     course:'',
     subject:'',
     chapter:'',
     topicIndexOpen:false,
     testList:[]
    };
   onTopicIndexClick = ()=>{
    this.setState({topicIndexOpen:!this.state.topicIndexOpen});
   }
    componentDidMount =()=>{
     let props = this.props;
     if(props.resource === 'chapter' && this.props.chapterId ){ 
      getChapterById( this.props.chapterId )
       .then(data =>{
        this.setState({
         isError:false,
         message:'',
         course:this.props.course,
         subject:this.props.subject,
         chapter:data.chapter,
        });

        getResources('CHAPTER',this.props.chapterId)
         .then(data =>{
          let chapter = this.state.chapter;
          chapter.resources = data.resources;
          this.setState({ 
           isError:false,
           message:'',   
           chapter:chapter
          });
         })
         .catch(error =>{
          console.log('Error resources for data.resources ',error);
          this.setState({isError:true, message:'Error while loading resources'});
         });

       })
       .catch(error =>{
        this.setState({isError:true, message:'Error while loading chapter detail.'});
       });
     } 
     getTestsByChapter(props.chapterId)
      .then(data =>{
       this.setState({
        isError:false,
        message:'', 
        testList:data.testList});
      }).catch(data=>{
       this.setState({testList:[]});
      });   
    }

    render(){
     window.scrollTo(0,0);
     let {subject,chapter} = this.state;    
     return (
      subject && chapter?
       <div className="container-fluid chapter-home-container">
        <div className="row ">
         <div><button className="btn btn-primary" onClick={this.props.history.goBack}> Back</button></div>
         <div className="chapter-heading-row">
          <div className="chapter-heading-text ">
           <span className="text-font-style">{this.state.chapter?this.state.chapter.name:''}</span>
          </div>
         </div>
        </div>        
        <hr className="divider"/>
        <div className="resource-col">
         <span className="text-font-style">Chapter Resources</span> 
        </div>
        <div className="chapter-resources-row"> 
         {Array.isArray(chapter.resources)?
          chapter.resources.map((resource,index)=>{
           return <div key={index} className="resource-col">
            <a href={RESOURCE_DOWNLOAD_SERVICE_ENDPOINT+'?resourceName=chapter&resourceId='+this.state.chapter.id+'&fileName='+resource.fileName} 
             target="_blank" rel="noopener noreferrer">{resource.title}</a>
           </div>;
          })
          :''}        
        </div>
        <hr className="divider"/>  
        <div className="chapter-description-row">
         {this.state.chapter.summary?          
          <RichTextEditor readOnly={true}
           value={Value.fromJSON(JSON.parse(this.state.chapter.summary))}/>:'No summary'}
        </div>       
        <div className="chapter-test-table">
         <ChapterTestTable 
          testList={this.state.testList}
          {...this.props}/>
        </div>
       </div>
       :<div className='chapter-home-not-found'>
        {this.state.message}!       
       </div>
     );
    }
}  