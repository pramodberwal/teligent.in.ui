import React from 'react';

export let TestTableHeaderRow = (props)=>{
 return (
  <tr>
   <th scope="col" >#ID</th>
   <th scope="col" className="desktop-heading">Name</th>
   <th scope="col">Description</th>
   <th scope="col"  className="desktop-heading" >Course</th>
   <th scope="col"  className="desktop-heading">Subject</th>
   <th scope="col"  className="desktop-heading">Chapter</th>
   <th scope="col"></th>
  </tr>
 );
};

export class TestTableBodyRow extends React.Component{
 render(){
  let {props} = this;
  return (
   <tr onDoubleClick={()=>props.onDoubleClick(props.test.id)}>
    <th scope="row">{props.test.id}</th>
    <td  className="desktop-heading" >{props.test.name}</td>
    <td>{props.test.desc}</td>
    <td  className="desktop-heading">{props.test.courseName?props.test.courseName:''}</td>
    <td  className="desktop-heading">{props.test.subjectName?props.test.subjectName:''}</td>
    <td  className="desktop-heading">{props.test.chapterName?props.test.chapterName:''}</td>
    <td >
     <button type="button" 
      onClick={()=>props.onDoubleClick(props.test.id)}
      className="btn btn-primary ">Edit</button>
    </td>
    <td >
     <button type="button" 
      onClick={()=>props.onDeleteClick(props.test.id)}
      className="btn btn-danger ">Delete</button>
    </td>
   </tr>
  );
 }
};

