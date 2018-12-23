import React from 'react';
import {Link} from 'react-router-dom';

export class ChapterTestTable extends React.Component{
 render(){
  return (
   <table className="table table-hover">
    <thead>
     <ChapterTestTableHeader />
    </thead>
    <tbody>
     {Array.isArray(this.props.testList)?
      this.props.testList.map((test,index)=>{
       return <ChapterTestTableBodyRow key={index} 
        test={test} {...this.props} />;
      })
      :<tr><td>Empty list!</td></tr>}     
    </tbody>
   </table>
  );
 }
};

let ChapterTestTableHeader=(props)=>{
 return (
  <tr>
   <th scope="col" >#ID</th>
   <th scope="col" className="desktop-heading">Name</th>
   <th scope="col">Description</th>
   <th scope="col" className="desktop-heading" >Course</th>
   <th scope="col" className="desktop-heading">Subject</th>
   <th scope="col" className="desktop-heading" >Chapter</th>
   <th scope="col"></th>
   
  </tr>
 );
};

class ChapterTestTableBodyRow extends React.Component{
 render(){     
  if(this.props.test){
   return (     
    <tr>
     <th scope="row" >{this.props.test.id}</th>
     <td className="desktop-heading">{this.props.test.name}</td>
     <td>{this.props.test.desc}</td>
     <td className="desktop-heading">{this.props.test.courseName?this.props.test.courseName:''}</td>
     <td className="desktop-heading">{this.props.test.subjectName?this.props.test.subjectName:''}</td>
     <td className="desktop-heading">{this.props.test.chapterName?this.props.test.chapterName:''}</td>
     <td><Link to={`${this.props.match.url}/test/`+this.props.test.id}
      className="btn btn-primary">Take</Link></td>
    </tr>
   );
  }else{
   return <tr>    
    <td>Test Not found</td>
   </tr>;
  }
 } 

};