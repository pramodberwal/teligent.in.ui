import React from 'react';
import {getSubjectById} from '../../../services/ref-data/subject';
export let TopicManagerTableHeaderRow =()=>{
 return (
  <tr>
   <th scope="col">#Seq</th>
   <th scope="col">Name</th>   
   <th scope="col">Chapter</th> 
   <th scope="col"></th>   
  </tr>
 );
};

export class TopicManagerTableBodyRow extends React.Component{
  state={
   subjectName:'',
  }
  componentDidMount = ()=>{
  
  }

  render(){
   let {props} = this;

   return (
    <tr onDoubleClick={()=>props.onDoubleClick(props.topic.id)}>
     <th scope="row">{props.topic.seqOrder}</th>
     <td >{props.topic.name}</td>
     <td>{props.topic.chapterName?props.topic.chapterName:''}</td>
     <td> 
      <button type="button" 
       onClick={()=>props.onDoubleClick(props.topic.id)}
       className="btn btn-primary mb-1 mobile-heading">Edit</button>       
      <button type="button" 
       onClick={()=>props.onDelete(props.topic.id)}
       className="btn btn-danger"> Delete</button>
     </td>
    </tr>   
   );
  }
};
