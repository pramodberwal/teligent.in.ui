import React from 'react';
import * as _ from 'lodash';
import{COMPLEXITY_LEVELS} from '../../../constants/system-constant';
import {getChaptersBySubject} from '../../../services/ref-data/chapter';
import {getTopicsByChapter} from '../../../services/ref-data/topic';
import QuestionListTable from './question-list-table';
import {getAllFiltred} from '../../../services/questions/question-service';

let PageLinks = (props) =>{
 let children = [];
 if(props.pagable){
  let startPage = (props.pagable.pageNumber - 3) >= 0?(props.pagable.pageNumber - 3):0;
  let endPage = (props.pagable.pageNumber + 3) <= props.pagable.totalPages ?(props.pagable.pageNumber + 3):props.pagable.totalPages;
  
  for (let j = startPage; j < endPage; j++) {
   children.push(
    <li key={j} className={"page-item "+ (Number(props.page) === Number(j) ? ' active ':'')}>
     <button className="page-link" onClick={()=>props.onLoadQuestion(j)}
     >{j}</button>
    </li>
   );
  }
  return  children;
 }
 children.push("");
 return children;
};


export default class QuestionFilter extends React.Component{
    state={
     isError:false,
     message:'',
     chapters:[],
     topics:[],
     questionFilter:{},
     checkedComplexities:{},
     availableQuestions:[],
     activeSubject:'',
     pagable:''
    }

    componentDidMount =()=>{
     this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps =(props)=>{
     if(Number(this.state.activeSubject === props.subjectId) || Number.isNaN(Number.parseInt(props.subjectId))){
      return;
     }

     getChaptersBySubject(props.subjectId)
      .then(chapterData =>{
       let questionFilter = this.state.questionFilter;
       questionFilter['subjectId'] = props.subjectId;
       this.setState({isError:false,message:'',
        activeSubject:props.subjectId,
        chapters:chapterData.chapters,
        topics:[],
        availableQuestions:[]});
      })
      .catch(error =>{
       this.setState({isError:true,message:'Error while loading chapters.'});
      });
    }

    onChapterChange = (chapterId) =>{     
     if(Number.isNaN(Number.parseInt(chapterId) )){
      return;
     }
        
     getTopicsByChapter(chapterId)
      .then(topicData =>{
       let questionFilter = this.state.questionFilter;
       questionFilter['chapterId'] = chapterId;
       this.setState({isError:false,message:'',topics:topicData.topics,questionFilter:questionFilter});
      })
      .catch(error =>{
       this.setState({isError:true,message:'Error while loading topics.'});
      });
    }

    onTopicChange = (topicId) =>{
     if(Number.isNaN(Number.parseInt(topicId) )){
      return;
     }  
     let questionFilter = this.state.questionFilter;
     questionFilter['topicId'] = topicId;
        
    }

    onQuestionComplexityChange =(selected, level)=>{
     let questionFilter = this.state.questionFilter;
     let checkedComplexities = this.state.checkedComplexities;
     checkedComplexities[level]= selected;
     let complexitiesSelected = questionFilter.complexitiesSelected || [];
        
     if(selected){
      complexitiesSelected.push(level);
     }else if(Array.isArray(complexitiesSelected)){
      _.remove(complexitiesSelected, l => Number(l) === Number(level));
     }
     questionFilter['complexitiesSelected']=complexitiesSelected;
    
     this.setState({questionFilter:questionFilter,checkedComplexities:checkedComplexities});
    }

    onLoadQuestion = (pageNumber)=>{
     if(Number.isNaN(Number.parseInt(this.state.questionFilter.subjectId) )){
      this.setState({availableQuestions:[]});
      return;
     }  

     getAllFiltred(this.state.questionFilter,pageNumber)
      .then(questionData =>{
       this.setState({availableQuestions:questionData.questions,pagable:questionData.pagable});
      })
      .catch(error =>{
       console.log('Error Loaded >', error);
       this.setState({isError:true, message:'Error while loading questions.'});
      });
    }


    render(){
     let complexityLevels = COMPLEXITY_LEVELS.map((level,index)=>{
      return  <div key={index} className="form-check form-check-inline"> 
       <input className="form-check-input" type="checkbox"
        value={level.id}
        checked={this.state.checkedComplexities && this.state.checkedComplexities[level.id]?this.state.checkedComplexities[level.id]:false} 
        id={"level"+index}
        onChange={(e) =>this.onQuestionComplexityChange(e.target.checked,level.id)}        
       />
       <label className="form-check-label " htmlFor={"level"+index}>
        {level.name}
       </label>
      </div>; 
     });
     return <div className="question-filter-row flex-grow-1">
      <div className="container-fluid ">
       <div className="row">
        <div className="text-style font-weight-bold">
        Question Filter
        </div>
       </div>
       <div className="row align-items-center question-filter-container shadow-lg bg-white p-3 mb-5">
        <div className="chapter-selector flex-grow-1">
         <div className=" align-items-center">    
          <span className="text-style font-weight-bold">
           Chapter:
          </span>
          <select id="chapterId" className="form-control"
           name="chapterId"
           onChange={(e) => this.onChapterChange(e.target.value)}
          >
           <option>Please Select</option>
           {Array.isArray(this.state.chapters)?this.state.chapters.map((chapter,index)=>{
            return <option key={index} value={chapter.id}>{chapter.name}</option>; 
           }):''}
          </select>
         </div>
        </div>
        <div className="topic-selector ml-2 flex-grow-1">
         <div className="align-items-center">    
          <span className="text-style font-weight-bold">
           Topic:
          </span>
          <select id="topicId" className="form-control"
           name="topicId"
           onChange={(e) =>this.onTopicChange(e.target.value)}
          >
           <option>Please Select</option>
           {Array.isArray(this.state.topics)?this.state.topics.map((topic,index)=>{
            return <option key={index} value={topic.id}>{topic.name}</option>; 
           }):''}
          </select>
         </div>
        </div>
        <div className="complexity-level-selector ml-2">
         {complexityLevels}
        </div>
        <div className="apply-filter-btn">
         <button className="btn btn-primary"
          onClick={()=>this.onLoadQuestion(0)}
         >Load Questions</button>
        </div>
       </div>

       <div className="row ">
        <div className="question-table-row flex-grow-1">
         <QuestionListTable 
          actionText="Add" 
          questions={this.state.availableQuestions} 
          {...this.props}/>
        </div>
       </div>
       <hr className="divider"/>
       <div className={"row justify-content-end "+( this.state.availableQuestions.length?'' :' d-none ')}>
        <div className="pagination-container">
         <div className="pagination-row">
          <nav aria-label="Page navigation example">
           <ul className="pagination justify-content-center">
            <li className={"page-item "+(this.state.pagable && this.state.pagable.isFirst?' disabled ':'  ')}>
             <span className="page-link" to={`${this.props.match.url}/0`} >First</span>
            </li>
            <li className={"page-item "+(this.state.pagable && this.state.pagable.isFirst?' disabled ':'  ')}>
             <span className="page-link" to={`${this.props.match.url}/`+(this.state.pagable?(this.state.pagable.pageNumber - 1):0)} >Previous</span>

            </li>
            <PageLinks onLoadQuestion={this.onLoadQuestion} match={this.props.match} pagable={this.state.pagable} page={this.props.page}/> 
            <li className={"page-item "+(this.state.pagable && this.state.pagable.isLast?' disabled ':'  ')}>
             <span className="page-link" to={`${this.props.match.url}/`+(this.state.pagable?(this.state.pagable.pageNumber + 1):0)} >Next</span>
            </li> 
            <li className={"page-item "+(this.state.pagable && this.state.pagable.isLast?' disabled ':'  ')}>
             <span className="page-link" to={`${this.props.match.url}/`+(this.state.pagable?(this.state.pagable.totalPages - 1):0)} >Last</span>
            </li>   
           </ul>
          </nav>
         </div>     
        </div> 
       </div>
      </div>
     </div>;
    }
}