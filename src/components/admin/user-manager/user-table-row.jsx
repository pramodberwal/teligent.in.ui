import React from 'react';
import {getRoleById} from '../../../services/ref-data/role-service';

export let UserTableHeader = (props)=>{
 return (
  <tr>
   <th scope="col">
                   #ID
   </th>
   <th scope="col" className="desktop-heading">
                   Role
   </th>
   <th scope="col">
                   First Name
   </th>
   <th scope="col"  className="desktop-heading">
                   Last Name
   </th>
   <th scope="col" >
    <div className="row">
     <div className="col text-center">Contact</div>
    </div>
    <div className="row">
     <div className="col text-center ">Mobile</div>
     <div className="col text-center ">Email</div>
    </div>
   </th>   
   <th scope="col"  className="desktop-heading">
    <div className="row">
     <div className="col text-center">Address</div>
    </div>
    <div className="row">
     <div className="col text-center ">Name</div>
     <div className="col text-center ">City</div>
     <div className="col text-center">State</div>
    </div>
   </th>
   <th scope="col"  className="desktop-heading">
   
   </th>  
  </tr>
 );   
};
export let UserTableRow =(props)=>{
 let {user} = props;
 return (<tr onDoubleClick={()=>props.onDoubleClick(user.id)}>
  <th scope="row">{user.id}</th>
  <td className="desktop-heading">{
   Array.isArray(user.roles)?
    user.roles.map((role,index)=>{
     return <div key={index}>{role.name}</div>;
    } )
    :''
  }</td>
  <td>{user.firstName}</td>
  <td className="desktop-heading">{user.lastName}</td>
  <td>
   <div className="row">
    <div className="col text-center ">{(user.contact && user.contact[0])?user.contact[0].mobile:''}</div>
    <div className="col text-center ">{(user.contact && user.contact[0])?user.contact[0].email:''}</div>
   
   </div>
  </td>  
  <td className="desktop-heading">
   <div className="row">
    <div className="col text-center ">{user.address[0]?user.address[0].name:''}</div>
    <div className="col text-center ">{user.address[0]?user.address[0].city:''}</div>
    <div className="col text-center">{user.address[0]?user.address[0].state:''}</div>
   </div>
  </td>
  <td>
   <button type="button" onClick={()=>props.onDeleteUser(user.id)} className="btn btn-danger">Delete</button>
  </td>
 </tr>     
 );

};

