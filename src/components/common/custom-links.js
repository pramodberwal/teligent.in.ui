import React from 'react';
import {Link,NavLink} from 'react-router-dom';
export let CustomButton = (props)=>{
 return <button type='button' 
  className='btn-primary'
  onClick={()=>props.onClick({...props.params})}
 >{props.name}</button>;
};

export let CustomLink = (props)=>{
 return <Link className={props.className} to={props.to}>{props.name}</Link>;
};
export let CustomNavLink = (props)=>{
 return <NavLink 
  className={props.className}
  activeClassName={props.activeClassName} 
  to={props.to}>
  {props.name}
 </NavLink>;
};
