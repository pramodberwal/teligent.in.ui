import React from 'react';
import {Link} from 'react-router-dom';

export class SubjectTestTable extends React.Component{
 render(){   
  return (
   <table className="table table-hover">
    <thead>
     <SubjectTestTableHeader />
    </thead>
    <tbody>
     {Array.isArray(this.props.testList)?
      this.props.testList.map((test,index)=>{
       return <SubjectTestTableBodyRow key={index} 
        test={test} {...this.props}/>;
      })
      :<tr><td>Empty list!</td></tr>}     
    </tbody>
   </table>
  );
 }
};

let SubjectTestTableHeader=(props)=>{
 return (
  <tr>
   <th scope="col">#ID</th>
   <th scope="col" >Name</th>
   <th scope="col" >Description</th>
   <th scope="col"></th>
  </tr>
 );
};

class SubjectTestTableBodyRow extends React.Component{   
 render(){
  if(this.props.test){
   return (     
    <tr>
     <th scope="row" >{this.props.test.id}</th>
     <td  className=" desktop-heading ">{this.props.test.name}</td>
     <td  className=" desktop-heading ">{this.props.test.desc}</td>
     <td><Link to={`${this.props.match.url}/examtestpaper/`+this.props.test.id}
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