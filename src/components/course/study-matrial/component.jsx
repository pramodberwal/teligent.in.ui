import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import './style.css';
import HandWrittenNotesComponent from './hand-written-notes';
import PreviousYearPapersComponent from './previous-year-papers';
import RecommendedBooksComponent from './recommended-books';

export default class StudyMatrialComponent extends React.Component{
 render(){
  return <div className="study-matrial-container container-fluid">
   <div className="row navigation-row">
    <div className="flex-grow-1 navigation-col">    
     <ul className="study-matrial-list">
      <li className="study-matrial-item">
       <NavLink to={`${this.props.match.url}/previous-year-papers`} >Previous Year Papers</NavLink>
      </li>
      <li className="study-matrial-item">
       <NavLink to={`${this.props.match.url}/recommended-books`}>Recommended Books</NavLink>
      </li>
      <li className="study-matrial-item">
       <NavLink to={`${this.props.match.url}/hand-written-notes`} >Hand Written Notes</NavLink>
      </li>
     </ul>    
    </div>
   </div>
   <div className="row"> 
    <button className="btn btn-primary" onClick={this.props.history.goBack}>Back</button>
   </div>
   <div className="row">   
    <Switch>
     <Route path={`${this.props.match.url}/hand-written-notes`}
      render ={()=>{
       return <HandWrittenNotesComponent {...this.props}/>;
      }}/>
     <Route path={`${this.props.match.url}/previous-year-papers`}
      render ={()=>{
       return <PreviousYearPapersComponent {...this.props}/>;
      }}/>
     <Route path={`${this.props.match.url}/recommended-books`}
      render ={()=>{
       return <RecommendedBooksComponent {...this.props}/>;
      }}/>
     <Route render ={()=>{
      return <Redirect to={`${this.props.match.url}/previous-year-papers`}/>;
     }}/>
    </Switch>
   </div>
  </div>;
 }
    
}