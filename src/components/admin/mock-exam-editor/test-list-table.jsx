import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
export default class TestListComponent extends React.Component{
 render (){
  return <table className="table table-hover">
   <thead>
    <tr>
     <th>ID</th>
     <th>Name</th>
     <th>Duration Time(Minutes)</th>
     <th></th>
     <th><Link className="btn btn-primary" to ={{
      pathname:`${this.props.match.url}/add-test`
      ,state:{
       from:this.props.match.url,
       activeSubject:this.props.activeSubject,
       courseId:this.props.mockPaper.courseId,
       testStartTime:this.props.mockPaper.startDateTime,  
       paperId:this.props.mockPaper.id} }}
     > Add New</Link></th>
    </tr>
   </thead>
   <tbody>
    {this.props.tests && Array.isArray(this.props.tests) && this.props.tests.length ?
     this.props.tests.map((test,index)=>{
      return  <tr key={index}>
       <td>{test.id}</td>
       <td>{test.name}</td>
       <td>{test.durationMinutes}</td>
       <td><input type="checkbox" checked={this.props.addedTests && this.props.addedTests[test.id] ?this.props.addedTests[test.id]:false} onChange={(e)=> this.props.onTestAddRemove(test.id,e.target.checked)} /></td>
       <td>
        <Link className="btn btn-primary" to={`${this.props.match.url}/edit-test/`+test.id} >view / edit</Link>
       </td>
      </tr>;
     })    
     :<tr><td><span className="text-style">Tests not available 
      <Link to ={{
       pathname:`${this.props.match.url}/add-test`
       ,state:{
        from:this.props.match.url,
        activeSubject:this.props.activeSubject,
        courseId:this.props.mockPaper.courseId,
        testStartTime:this.props.mockPaper.startDateTime,  
        paperId:this.props.mockPaper.id} }}
      > Add New Test</Link>
     </span></td></tr>}   
   </tbody>
  </table>;
 }; 
}