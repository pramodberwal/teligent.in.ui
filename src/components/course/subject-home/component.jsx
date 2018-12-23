import React from 'react';
import {NavLink} from 'react-router-dom';
import {RESOURCE_DOWNLOAD_SERVICE_ENDPOINT} from '../../../constants/system-constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTestsBySubject } from "../../../services/exam-test";
import { getChaptersBySubject } from "../../../services/ref-data/chapter";
import { Value } from 'slate';
import { SubjectTestTable } from './subject-test-table';
import {getResources} from '../../../services/ref-data/resource';
import RichTextEditor from '../../admin/rich-text-editor/container';
import './style.css';

export default class SubjectHomeComponent extends React.Component{
    state =  {
     isError:false,
     message:'Please wait while we are loading the data...',
     course:'',
     subject:'',
     chapterIndexOpen:false,
     testList:[]
    };
    componentWillReceiveProps= (props)=>{ 
     if(!props.subject.id){
      return;
     }
      
     getChaptersBySubject(props.subject.id)
      .then(data =>{
       let subject = props.subject;
       subject.chapters = data.chapters;
       this.setState({
        course:props.course,        
        subject:props.subject
       });

       getResources('SUBJECT',props.subject.id)
        .then(data =>{
         let subject = this.state.subject;
         subject.resources = data.resources;
         this.setState({    
          subject:subject
         });
        })
        .catch(error =>{
         console.log('Error resources for data.resources ',error);
         this.setState({isError:true, message:'Error while loading resources'});
        });

      })
      .catch(error =>{
       this.setState({isError:true, message:'Error while loading chapters'});
      });
     
     

      getTestsBySubject(props.subject.id)
      .then(data =>{
       this.setState({testList:data.testList});
      }).catch(data=>{
       this.setState({testList:[]});
      });
    }

    componentDidMount = ()=>{
     let props = this.props;
     if(!props.subject){
      return;
     }
     this.componentWillReceiveProps(this.props);
    }
    onChapterIndexClick = ()=>{
     this.setState({chapterIndexOpen:!this.state.chapterIndexOpen});
    }
    onCloseChapterIndex = ()=>{
     this.setState({chapterIndexOpen:false});
    }

    render(){ 
     let {subject} = this.state;
     return (
      subject?
       <div className="subject-home-container">   
        <div className="row subject-heading-row"> 
         <div>
          <button className="btn btn-primary" onClick={this.props.history.goBack}>Back</button>
         </div>      
         {       
          this.state.chapterIndexOpen?
           <div className="chapter-index-toggler-col">
            <FontAwesomeIcon onClick={this.onChapterIndexClick} 
             className="chapter-index-toggler"
             icon="window-close" />
           </div>
           :
           <div className="chapter-index-toggler-col">
            <FontAwesomeIcon onClick={this.onChapterIndexClick}             
             className="chapter-index-toggler"         
             icon="bars" />
           </div>}
         <div className=" flex-grow-1 ">
          <span className="subject-heading-text"> {this.state.subject.name}</span>
         </div>
        </div>
        <div onClick={this.onCloseChapterIndex} className={"chapter-list-container "+(this.state.chapterIndexOpen?' show ':'') }>
         <ul className="chapter-list">
          {Array.isArray(this.state.subject.chapters)?this.state.subject.chapters.map((chapter,index) =>{
           return <li key={index} className="list-item"> 
            <NavLink to={`${this.props.match.url}/chapter/`+chapter.id}>
             <span className="chapter-text">{chapter.seqOrder?chapter.seqOrder:index} - {chapter.name}</span>;
            </NavLink>
           </li>;
          }):''}          
         </ul>
        </div>
        <div className="resource-text-row">
         <span className="resource-text"> Subject Resources </span>
        </div>
        <div className="subject-resources-row"> 
         {Array.isArray(this.state.subject.resources)?
          this.state.subject.resources.map((resource,index)=>{
           return <div key={index} className="resource-col">
            <a href={RESOURCE_DOWNLOAD_SERVICE_ENDPOINT+'?resourceName=subject&resourceId='+this.state.subject.id+'&fileName='+resource.fileName} 
             target="_blank" rel="noopener noreferrer">
             <span className="resource-title"> {resource.title} </span>
            </a>
           </div>;
          })
          :''}        
        </div>
        
        <hr className="divider"/>
        <div className="subject-description-row">
         {this.state.subject.summary?
          <RichTextEditor readOnly={true}
           value={Value.fromJSON(JSON.parse(this.state.subject.summary))}/>
          :'No summary'}
        </div>
       
        <div className="subject-test--table">
         <SubjectTestTable 
          testList={this.state.testList}
          {...this.props}/>
        </div>
       </div>
       :<div className='subject-home-not-found'>{this.state.message}       
       </div>
     );
    }
}  