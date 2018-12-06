import React from 'react';
import {getSubjectById} from '../../../services/ref-data/subject';
export let ChapterManagerTableHeaderRow =()=>{
 return (
  <tr>
   <th scope="col">#Seq</th>
   <th scope="col" >Name</th>   
   <th scope="col">Subject</th> 
   <th scope="col"></th>   
  </tr>
 );
};

export class ChapterManagerTableBodyRow extends React.Component{
  state={
   subjectName:'',
  }
  componentDidMount = ()=>{
  
  }

  render(){
   let {props} = this;

   return (
    <tr onDoubleClick={()=>props.onDoubleClick(props.chapter.id)}>
     <th scope="row">{props.chapter.seqOrder}</th>
     <td >{props.chapter.name}</td>
     <td>{props.chapter.subjectName?props.chapter.subjectName:''}</td>
     <td> 
      <button type="button" 
       onClick={()=>props.onDoubleClick(props.chapter.id)}
       className="btn btn-primary mb-1 mobile-heading">Edit</button>       
      <button type="button" 
       onClick={()=>props.onDelete(props.chapter.id)}
       className="btn btn-danger"> Delete</button>
     </td>
    </tr>   
   );
  }
};
