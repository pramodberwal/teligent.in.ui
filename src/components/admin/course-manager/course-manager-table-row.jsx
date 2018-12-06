import React from 'react';
import {getCourseByName} from '../../../services/ref-data/course';
export let CourseManagerTableHeaderRow =()=>{
 return (
  <tr>
   <th scope="col" >#Seq</th>
   <th scope="col">Name</th>
   <th scope="col"></th>
   <th scope="col"></th> 
  </tr>
 );
};
export let CourseManagerTableBodyRow = (props)=>{  
 return (
  <tr onDoubleClick={()=>props.onDoubleClick(props.course.id)}>
   <th scope="row">{props.course.seqOrder}</th>
   <td>{props.course.name}</td>
   <td>    
    <button type="button" 
     onClick={()=>props.onDoubleClick(props.course.id)}
     className="btn btn-primary mobile-heading"> Edit </button>
   </td>
   <td>    
    <button type="button" 
     onClick={()=>props.onDelete(props.course.id)}
     className="btn btn-danger"> Delete</button>
   </td>
  </tr>   
 );
};
