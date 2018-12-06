import React from 'react';
import {Link} from 'react-router-dom';

export class SubjectTestSeriesTable extends React.Component{
 render(){   
  return (
   <table className="table table-hover">
    <thead>
     <SubjectTestSeriesTableHeader />
    </thead>
    <tbody>
     {Array.isArray(this.props.testSeriesList)?
      this.props.testSeriesList.map((series,index)=>{
       return <SubjectTestSeriesTableBodyRow key={index} 
        series={series} {...this.props}/>;
      })
      :<tr><td>Empty list!</td></tr>}     
    </tbody>
   </table>
  );
 }
};

let SubjectTestSeriesTableHeader=(props)=>{
 return (
  <tr>
   <th scope="col">#ID</th>
   <th scope="col" className=" desktop-heading ">Name</th>
   <th scope="col">Description</th>
   <th scope="col" className=" desktop-heading ">Course</th>
   <th scope="col" className=" desktop-heading ">Subject</th>
   <th scope="col" className=" desktop-heading ">Chapter</th>
   <th scope="col"></th>
  </tr>
 );
};

class SubjectTestSeriesTableBodyRow extends React.Component{   
 render(){
  if(this.props.series){
   return (     
    <tr>
     <th scope="row" >{this.props.series.id}</th>
     <td  className=" desktop-heading ">{this.props.series.name}</td>
     <td>{this.props.series.desc}</td>
     <td className=" desktop-heading ">{this.props.series.courseName?this.props.series.courseName:''}</td>
     <td className=" desktop-heading ">{this.props.series.subjectName?this.props.series.subjectName:''}</td>
     <td className=" desktop-heading ">{this.props.series.chapterName?this.props.series.chapterName:''}</td>
     <td><Link to={`${this.props.match.url}/testSeries/`+this.props.series.id}
      className="btn btn-primary">Take</Link></td>
    </tr>
   );
  }else{
   return <tr>    
    <td>Series Not found</td>
   </tr>;
  }
 } 

};