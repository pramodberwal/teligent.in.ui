import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { createStore,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import * as icons from '@fortawesome/free-solid-svg-icons';
import  '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import * as boot from 'bootstrap';
import appReducer from './reducers';
import RootComp from './components/root-comp'; 
library.add(icons.faBars,icons.faImage); 
library.add(icons.faBold,icons.faUnderline, icons.faItalic); 
library.add(icons.faPlus, icons.faMinus,icons.faDivide, icons.faTimes);
library.add(icons.faSubscript, icons.faSuperscript);
library.add(icons.faList);
library.add(icons.faInfoCircle,icons.faInfo);
library.add(icons.faWindowClose);
library.add(icons.faVideo);
library.add(icons.faListOl, icons.faHeading);



let store = createStore(appReducer,applyMiddleware(thunk));
//let store = createStore(appReducer,applyMiddleware(thunk));

ReactDOM.render(
 <Provider store={store}>  
  <Router basename="/"> 
   <RootComp />    
  </Router>
 </Provider>, 
 document.getElementById('root'));


// This is being done for caching on client side.
registerServiceWorker();
