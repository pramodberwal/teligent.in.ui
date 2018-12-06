import React from 'react';
import {Link} from 'react-router-dom';
import * as $ from 'jquery';
import {getAll, getAllFiltred, deleteQuestion} from '../../../services/questions/question-service';
import {getAllSubjects} from '../../../services/ref-data/subject';
import {getChaptersBySubject, getAllChapters} from '../../../services/ref-data/chapter';
import {getTopicsByChapter} from '../../../services/ref-data/topic';
import {QuestionManagerTableHeader,QuestionManagerTableBodyRow} from './question-manager-table-row';
import './style.css';


export default class QuestionManagerComponent extends React.Component{
state = {
 isError:false,
 message:'Please wait while we are loading data...',
 pagable:'', 
 filter:{
  subjectId:'',
  chapterId:'',
  topicId:'',
  fromComplexityLevel:'',
  toComplexityLevel:'',
 },
 subjects:[],  
 chapters:[],  
 topics:[],  
 questions:[],
 page:1,
};

componentDidMount =()=>{
 this.componentWillReceiveProps (this.props);
}

 componentWillReceiveProps = (props)=>{
  window.scroll(0,0);
  let page = Number(props.page);
  if(Number.isNaN(page)){
   page = 0;
  }

  let filter = $.cookie('questions_manager_filter');
  if( filter ){
   filter = JSON.parse(filter);
   //this.setState({filter:filter});
   if(filter.subjectId){
    getChaptersBySubject(filter.subjectId)
     .then(chapterData =>{
      if(filter.chapterId){
       getTopicsByChapter(filter.chapterId)
        .then(topicData =>{
         this.setState({filter:filter
          ,chapters:chapterData.chapters
          ,topics:topicData.topics});
        });
      }
     });
   }
   this.applyFilter(filter);
   return;
  }
  getAll(page).then( data =>{
   getAllSubjects()
    .then(subjectData =>{
     this.setState({
      page:page,
      message:'',
      questions:data.questions,
      subjects:subjectData.subjects,
      pagable:data.pagable
     });
    })
    .catch(error =>{
     this.setState({isError:true, message:error.message,
      page:page,
      questions:data.questions,
      pagable:data.pagable});
    });    
  
  }).catch(error =>{
   this.setState({isError:true, message:error.message});
  });
 }

onFilterChange = (field, value)=>{
 this.setState({filter:{...this.state.filter,[field]:value}});
}
onSubjectFilterChange = (subjectId)=>{  
 if(Number.isNaN(Number(subjectId)))
 {
  this.setState({filter:{...this.state.filter, subjectId:''},  
   chapters:[],
   topics:[]});
  return ;
 }
 getChaptersBySubject(subjectId)
  .then(chapterData =>{
   this.setState({filter:{...this.state.filter,subjectId:subjectId,
    chapterId:'', topicId:'',message:'',}
   , chapters:chapterData.chapters,
   topics:[]}); 
  })
  .catch(error =>{
   this.setState({isError:true, message:error.message,filter:{...this.state.filter,subjectId:subjectId}
    , chapters:[],
    topics:[]});
  });
  
};

onClearFilter = ()=>{
 $.cookie('questions_manager_filter','', { expires:0,
  secure:false});
 this.setState({filter:''});
}

applyFilter = (filter)=>{ 
 if(!filter){
  filter = this.state.filter;
 }
 if(filter){
  getAllFiltred(filter,0)
   .then(questionData =>{
    getAllSubjects()
     .then(subjectData =>{
      this.setState({
       message:'',
       questions:questionData.questions,
       subjects:subjectData.subjects,
       pagable:questionData.pagable
      });
      $.cookie('questions_manager_filter', JSON.stringify(filter));
     })
     .catch(error =>{
      this.setState({isError:true, message:error.message,
       questions:questionData.questions,
       pagable:questionData.pagable});
     });
   })
   .catch(error =>{
    this.setState({isError:true, message:error.message});
   });
 }else{
  this.componentDidMount();
 }
}

 onChapterFilterChange = (chapterId)=>{
  
  if(Number.isNaN(Number(chapterId)))
  {
   this.setState({filter:{...this.state.filter,chapterId:''},
    topics:[]});
   return ;
  }

  getTopicsByChapter(chapterId)
   .then(topicData =>{
    this.setState({filter:{...this.state.filter,chapterId:chapterId, topicId:''}
     , topics:topicData.topics
    });  
   })
   .catch(error =>{
    this.setState({isError:true, message:error.message,filter:{...this.state.filter,chapterId:chapterId}
     ,
     topics:[]});
   });
 
 }

 onDeleteQuestion = (questionId)=>{
  deleteQuestion(questionId)
   .then(data =>{
    this.setState({isError:false,message:data.message});
    this.componentDidMount();
   })
   .catch(error =>{
    this.setState({isError:true,message:error.message});
   });
 }

 onPageChangeHandler= (newPage,e)=>{	
  e.stopPropagation();					
  this.setState({...this.state,page:newPage});
 };

 render(){
  let {questions,pagable} = this.state;
   
  let PageLinks = (props) =>{   
   let children = [];
   for (let j = 0; j < props.pagable.totalPages; j++) {
    children.push(
     <li key={j} className={"page-item "+ (Number(props.page) === Number(j) ? ' active ':'')}>
      <Link className="page-link" to={`${props.match.url}/`+j}>{j}</Link>
     </li>
    );
   }
   return  children;
  };

  

  if(!Array.isArray(questions)){
   return (<div>Error occured while applying filter on questions!</div>);
  }
  return (<div className="container-fluid question-manager-container">
   <div className="flex-grow-1 text-center">
        Question Manager
   </div>
   <div className="row justify-content-center">
    <div className="text-center">      
     {this.state.message?
      <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
       {this.state.message}       
      </div>:''}
    </div>
   </div> 
   <div className="row question-manager-filter-row">
    <div className="filter-col">
     <span className="filter-label">Subject:</span>
     <span className="filter-value">
      <select className="custom-select"
       name="subjectId"
       value={this.state.filter.subjectId?this.state.filter.subjectId:''}
       onChange={(e)=>this.onSubjectFilterChange(e.target.value)}
      ><option>Please select</option>
       {Array.isArray(this.state.subjects)?this.state.subjects.map((subject,index)=>{
        return <option key={index} value={subject.id}>{subject.name}</option>;
       }):''}
      </select>
     </span>
    </div>
    <div className=" filter-col">
     <span className="filter-label">Chapter:</span>
     <span className="filter-value">
      <select className="custom-select"
       name="chapterId"
       value={this.state.filter.chapterId?this.state.filter.chapterId:''}
       onChange={(e)=>this.onChapterFilterChange(e.target.value)}
      >
       <option>Please select</option>
       {Array.isArray(this.state.chapters)?this.state.chapters.map((chapter,index)=>{
        return <option key={index} value={chapter.id}>{chapter.name}</option>;
       }):''}
      </select>
     </span>
    </div>

    <div className=" filter-col">
     <span className="filter-label">Topic:</span>
     <span className="filter-value">
      <select className="custom-select"
       name="topicId"
       value={this.state.filter.topicId?this.state.filter.topicId:''}
       onChange={(e) =>this.onFilterChange('topicId',e.target.value)}
      >
       <option>Please select</option>
       {Array.isArray(this.state.topics)?this.state.topics.map((topic,index)=>{
        return <option key={index} value={topic.id}>{topic.name}</option>;
       }):''}
      </select>
     </span>
    </div>

    <div className="filter-col">
     <span className="filter-label">Complexity From:</span>
     <span className="filter-value">
      <select className="custom-select"
       name="fromComplexityLevel"
       value={this.state.filter.fromComplexityLevel?this.state.filter.fromComplexityLevel:''}
       onChange={(e) =>this.onFilterChange('fromComplexityLevel',e.target.value)}
      >
       <option>Please select</option>
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>
       <option value="6">6</option>       
      </select>
     </span>
    </div>

    <div className="filter-col">
     <span className="filter-label">Complexity To:</span>
     <span className="filter-value">
      <select className="custom-select"
       name="toComplexityLevel"
       value={this.state.filter.toComplexityLevel?this.state.filter.toComplexityLevel:''}
       onChange={(e) =>this.onFilterChange('toComplexityLevel',e.target.value)}
      >
       <option>Please select</option>
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>
       <option value="6">6</option>       
      </select>
     </span>
    </div>

   </div>
   <div className="row">
    <div className="flex-grow-1"> 
     <Link className="btn btn-primary bg-primary "  
      to={{
       pathname: `${this.props.match.url}/add-question`
      }}>     
      Add New
     </Link>  
    </div>  
    <div className="text-left mr-4"> 
     <div>
      <button type="button" className="btn btn-primary " onClick={this.onClearFilter}>
      Clear Filter
      </button> 
     </div> 
    </div>  
    <div className="text-left mr-4"> 
     <div>
      <button type="button" className="btn btn-primary " onClick={()=>this.applyFilter(this.state.filter)}>
      Apply Filter
      </button> 
     </div> 
     <div> 
      <span>Questions:</span>
      <span className="ml-2 font-weight-bold">{this.state.pagable.totalElements}</span>
     </div> 
    </div>
     
   </div>
   <div className="row">
    <div className="col">
     <table className="table table-hover">
      <thead>
       <QuestionManagerTableHeader />
      </thead>
      <tbody>
       {questions.map((question,index)=>{
        return (
         <QuestionManagerTableBodyRow key={index} 
          question={question}
          onDeleteQuestion={this.onDeleteQuestion}
          match={this.props.match}
         />);  
       })
       }
      </tbody>
     </table>
    </div>
   </div> 
   <hr className="divider"/>
   <div className="row pagination-container">
    <div className="pagination-row">
     <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
       <li className={"page-item "+(this.state.pagable.isFirst?' disabled ':'  ')}>
        <Link className="page-link" to={`${this.props.match.url}/0`} >First</Link>
       </li>
       <li className={"page-item "+(this.state.pagable.isFirst?' disabled ':'  ')}>
        <Link className="page-link" to={`${this.props.match.url}/`+(this.state.pagable?(this.state.pagable.pageNumber - 1):0)} >Previous</Link>
       </li>
       <PageLinks match={this.props.match} pagable={this.state.pagable} page={this.state.page}/> 
       <li className={"page-item "+(this.state.pagable.isLast?' disabled ':'  ')}>
        <Link className="page-link" to={`${this.props.match.url}/`+(this.state.pagable?(this.state.pagable.pageNumber + 1):0)} >Next</Link>
       </li> 
       <li className={"page-item "+(this.state.pagable.isLast?' disabled ':'  ')}>
        <Link className="page-link" to={`${this.props.match.url}/`+(this.state.pagable.totalPages - 1)} >Last</Link>
       </li>   
      </ul>
     </nav>
    </div>     
   </div>   
  </div>);
 }
};
