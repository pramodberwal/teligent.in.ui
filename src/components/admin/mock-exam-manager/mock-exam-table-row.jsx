import React from 'react';
import moment from 'moment';

export let MockExamTableHeaderRow = (props)=>{
 return (
  <tr>
   <th scope="col" ><span className="text-style">#ID</span></th>
   <th scope="col" ><span className="text-style">Name</span></th>
   <th scope="col"  ><span className="text-style">Start Date</span></th> 
   <th scope="col"  ><span className="text-style">Course Name</span></th>     
   <th scope="col" ><span className="text-style">Status</span></th> 
   <th scope="col" ><span className="text-style"></span></th> 
  </tr>
 );
};

export class MockExamTableBodyRow extends React.Component{
 render(){
  let {props} = this;
  return (
   <tr onDoubleClick={()=>this.props.onDoubleClick(props.mockExam.id)}>
    <th scope="row"><span className="text-style">{props.seq}</span></th>
    <td   ><span className="text-style">{props.mockExam.name}</span></td>   
    <td  ><span className="text-style">{props.mockExam.startDateTime?moment(props.mockExam.startDateTime).format('DD/MM/YYYY hh:mm A'):''}</span></td>
    <td   ><span className="text-style">{props.mockExam.courseName}</span></td>
    <td  ><span className="text-style">{props.mockExam.active?'Active':'Not Active'}</span></td>
    <td  ><span className="text-style">
     <button className="btn btn-danger"
      onClick={()=>this.props.onDeleteClick(props.mockExam.id)}
     ><span className="text-style">Delete</span></button>
    </span>
    
    </td>
   </tr>
  );
 }
};

