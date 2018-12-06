import React from 'react';
import {getCourseById} from '../../../services/ref-data/course';
import './style.css';

export let SubjectTableHeaderRow = (props)=>{
 return (
  <tr>
   <th scope="col">#Seq</th>
   <th scope="col">Name</th> 
   <th scope="col"></th>
   <th scope="col"></th>
  </tr>
 );
};

export class SubjectTableBodyRow extends React.Component{
    componentDidMount = ()=>{
       
    }

    render(){ 
     let {props} = this;
     return (
      <tr onDoubleClick={()=>props.onDoubleClick(props.subject.id)}
       data-toggle="tooltip" data-placement="bottom" title="Double Click To Edit." >
       <th scope="row">{props.subject.seqOrder}</th>
       <td >{props.subject.name}</td>             
       <td>
        <button type="button" 
         onClick={()=>props.onDoubleClick(props.subject.id)}
         className="btn btn-primary mobile-heading"
        > Edit </button>
       </td>
       <td>
        <button type="button" 
         onClick={()=>props.onDelete(props.subject.id)}
         className="btn btn-danger"
         data-toggle="tooltip" data-placement="bottom" title="Click to delete."
        > Delete </button>
       </td>
      </tr>
     );
    }
};

