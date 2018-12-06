/**
 * Copyright (c) 2018-present, Pramod, Inc.
 */
/*
@Author: Pramod Kumar
@Created: July 25, 2018
@Since: 1.0
@Version: 1.0
@Description:This is App root Component
*/
import React, { Component } from 'react';
import NavBarWrapper from './common/nav-bar/container';
import AppFooter from './common/app-footer/app-footer-wrapper';
import Home from '../components/common/home/container';
import './style.css';

export default class App extends React.Component{ 
 render(){
  return (   
   <div className="container-fluid root-body-container">    
    <div className="row nav-bar-row">   
     <NavBarWrapper /> 
    </div>
    
    <div className="row root-body-row">
     <Home />
    </div>

    <div className="row root-footer-row">     
     <AppFooter />    
    </div>
   </div>
  );
 }
};

