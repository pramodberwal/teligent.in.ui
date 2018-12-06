import React from 'react';

export let TestSeriesTableHeaderRow = (props)=>{
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

export class TestSeriesTableBodyRow extends React.Component{
 render(){
  let {props} = this;
  return (
   <tr onDoubleClick={()=>props.onDoubleClick(props.testSeries.id)}>
    <th scope="row">{props.testSeries.id}</th>
    <td  className="desktop-heading" >{props.testSeries.name}</td>
    <td>{props.testSeries.desc}</td>
    <td  className="desktop-heading">{props.testSeries.courseName?props.testSeries.courseName:''}</td>
    <td  className="desktop-heading">{props.testSeries.subjectName?props.testSeries.subjectName:''}</td>
    <td  className="desktop-heading">{props.testSeries.chapterName?props.testSeries.chapterName:''}</td>
    <td >
     <button type="button" 
      onClick={()=>props.onDoubleClick(props.testSeries.id)}
      className="btn btn-primary ">Edit</button>
    </td>
    <td >
     <button type="button" 
      onClick={()=>props.onDeleteClick(props.testSeries.id)}
      className="btn btn-danger ">Delete</button>
    </td>
   </tr>
  );
 }
};

