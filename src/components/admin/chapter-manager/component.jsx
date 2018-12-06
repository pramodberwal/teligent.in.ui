import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {deleteChapter, getAllChapters} from '../../../services/ref-data/chapter';

import {ChapterManagerTableHeaderRow,ChapterManagerTableBodyRow} from './chapter-manager-table-row';

export default class ChapterManagerComponent extends React.Component{
  state={
   message:'Please wait while we are loading data...',
   isError:false,
   chapters:[],
  }
componentDidMount=()=>{
 getAllChapters()
  .then(data => {
   this.setState({message:'',chapters:data.chapters});
  })
  .catch(error=>{
   this.setState({isError:true,message:error.message});
  });
}
   
  onDoubleClick = (id)=>{
   this.props.history.push(`${this.props.match.url}/edit-chapter/`+id);
  }

  onDelete = (id) =>{
   deleteChapter(id).then((data)=>{
    this.componentDidMount();    
    this.setState({message:data.message});
   })
    .catch(error=>{
     this.setState({isError:true,message:error.message});
    });
  
  }

  render(){ 
   window.scrollTo(0,0);
   return (<div className="container-fluid chapter-manager-container"> 
    <div className="row heading-row">     
     <div>
      <Link className="btn btn-primary" to={`${this.props.match.url}/add-chapter`}>Add New</Link>
     </div>
    
     <div className="flex-grow-1 text-center">
        Chapter Manager
     </div>
    </div>
    <div className="row justify-content-center">
     <div className="text-center">      
      {this.state.message?
       <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
        {this.state.message}       
       </div>:''}
     </div>
    </div> 
    <div className="row chapter-manager-table">     
     <table className="table table-hover">
      <thead>
       <ChapterManagerTableHeaderRow />
      </thead>
      <tbody>
       {Array.isArray(this.state.chapters)?this.state.chapters.map((chapter,index)=>{
        return  <ChapterManagerTableBodyRow key={index}
         onDelete={this.onDelete} 
         onDoubleClick={this.onDoubleClick}  
         chapter={chapter}/> ;
       }):<tr><td>Chapters not found!</td></tr>}          
      </tbody>
     </table>  
    </div>
   </div>);
  };
}