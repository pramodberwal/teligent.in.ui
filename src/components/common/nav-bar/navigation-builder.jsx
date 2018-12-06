import React from 'react';
import {NavLink} from 'react-router-dom';
import {userHasRole,isUserAuthenticated} from '../../../utils/autherization';

export let NavBarBuilder = (props)=>{ 
 let isAdminRole = userHasRole('Admin');

 let build = ()=>{
  return (
   <ul className="navbar-nav">  
    <li className="nav-item pr-2 app-nav-item">
     <NavLink exact className="nav-link" to="/" >
      <span className="nav-bar-item">Home</span></NavLink>
    </li>
    <li className="nav-item pr-2 app-nav-item">
     <NavLink  className="nav-link"  to="/strategy"> <span className="nav-bar-item">Strategy</span></NavLink>
    </li>
    <li className="nav-item pr-2 app-nav-item">
     <NavLink  className="nav-link"  to="/blog" > <span className="nav-bar-item">Blog</span></NavLink>
    </li> 
    <li className="nav-item pr-2 app-nav-item">
     <NavLink  className="nav-link"  to="/e-library" > <span className="nav-bar-item">E-Library</span></NavLink>
    </li> 
    <li className="nav-item pr-2 app-nav-item">
     <NavLink  className="nav-link"  to="/contact-us" > <span className="nav-bar-item">Contact Us</span></NavLink>
    </li> 
    {isAdminRole?
     <li className="nav-item pr-2 app-nav-item">
      <NavLink  className="nav-link"  to="/admin" > <span className="nav-bar-item">Admin</span></NavLink>
     </li>
     :''}  
    {isUserAuthenticated()?
     <li className="nav-item pr-2 app-nav-item">
      <NavLink  className="nav-link"  to="/my-profile" > <span className="nav-bar-item">Profile</span></NavLink>
     </li>
     :''}  
   </ul>
  );
 };
 return {
  build:build
 };
};

