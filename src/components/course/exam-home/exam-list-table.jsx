import React from 'react';
import moment from 'moment';

export let ExamListTableHeaderRow = (props)=>{
 return (
  <tr>
   <th scope="col" ><span className="text-style"></span></th>
   <th scope="col" ><span className="text-style">#ID</span></th>
   <th scope="col" ><span className="text-style">Name</span></th>
   <th scope="col"  ><span className="text-style">Start Date</span></th>  
   <th scope="col" ><span className="text-style"></span></th> 
  </tr>
 );
};
export class ExamListTableBodyRow extends React.Component{
 render(){
  let {props} = this;
  return (
   <tr>
    <th scope="row"><span className="text-style">{props.seq}</span></th>
    <th scope="row"><span className="text-style">{props.exam.id}</span></th>
    <td   ><span className="text-style">{props.exam.name}</span></td>   
    <td  ><span className="text-style">{props.exam.startDateTime?moment(props.mockPaper.startDateTime).format('DD/MM/YYYY hh:mm A'):''}</span></td>
    <td  ><span className="text-style">
     <button className="btn btn-danger"
      onClick={()=>this.props.onStartClick(props.exam.id)}
     ><span className="text-style">Start</span></button>
    </span>    
    </td>
   </tr>
  );
 }
};

