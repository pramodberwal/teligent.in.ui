import React from 'react';
import {NavLink,Route,Switch,Prompt,Redirect,withRouter} from 'react-router-dom';
import * as $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuestionManager from '../question-manager/question-manager-container';
import ChapterManager from '../chapter-manager/container';
import TopicManager from '../topic-manager/container';
import SubjectManager from '../subject-manager/container';
import TestSeriesManager from '../test-series-manager/container';
import UserManager from '../user-manager/container';
import CourseManager from '../course-manager/container';
import BlogManager from '../blog-manager/container';
import StrategyManager from '../strategy-manager/container';
import SecureComponent from '../../common/secure/component';
import {isUserAuthenticated} from '../../../utils/autherization';
import './style.css';
import CacheManagerComponent from '../cache-manager/component';
import StudyMatrial from '../study-matrial/container';
function PrivateRoute({ component: Component, ...rest }) {
 return (
  <Route
   {...rest}
   render={props =>
    isUserAuthenticated() ? (
     <Component {...props} />
    ) : (
     <Redirect
      to={{
       pathname: "/login",
       state: { from: props.location }
      }}
     />
    )
   }
  />
 );
}

class AdminHome extends React.Component{ 
  state={
   navigationOpen:false
  }
  closeNavigationPanel = ()=>{
   $('#demo').collapse('hide');
  }
  
  render(){
   return (
    <div className="container-fluid admin-home-container" >    
     <div className="row admin-navigator-container">
      <div className="admin-navigator-toggler-col">
       <FontAwesomeIcon 
        data-toggle="collapse"
        data-target="#demo"
        className="admin-navigator-toggler"
        icon="bars" />
      </div>       
      <div  id="demo" className=" collapse admin-navigator-items-container">
       <div className=" admin-navigator-items-row">
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item"
          to={`${this.props.match.url}/user-manager`} activeClassName="admin-navigator-item-active" > User Manager </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/study-matrial`} activeClassName="admin-navigator-item-active"> Study Matrial </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/subject-manager`} activeClassName="admin-navigator-item-active"> Subject Manager </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/chapter-manager`} activeClassName="admin-navigator-item-active"> Chapter Manager </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/topic-manager`} activeClassName="admin-navigator-item-active"> Topic Manager </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/test-series-manager`} activeClassName="admin-navigator-item-active"> Test Series Manager </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/blog-manager`} activeClassName="admin-navigator-item-active"> Blog Manager </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/strategy-manager`} activeClassName="admin-navigator-item-active"> Strategy Manager </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/question-manager`} activeClassName="admin-navigator-item-active"> Question Manager </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/course-manager`} activeClassName="admin-navigator-item-active"> Course Manager </NavLink>
        </div>
        <div className="admin-navigator-items-item">
         <NavLink className="admin-navigator-item" to={`${this.props.match.url}/cache-manager`} activeClassName="admin-navigator-item-active"> Cache Manager </NavLink>
        </div>
       </div>
      </div>

      <div className="admin-editor-container"  onClick={this.closeNavigationPanel}>
       <Switch>       
        <SecureComponent  path={`${this.props.match.url}/study-matrial`} component={StudyMatrial}/>
        <SecureComponent  path={`${this.props.match.url}/user-manager`} component={UserManager}/>
        <SecureComponent  path={`${this.props.match.url}/course-manager`} component={CourseManager}/>
        <SecureComponent  path={`${this.props.match.url}/chapter-manager`} component={ChapterManager}/>
        <SecureComponent  path={`${this.props.match.url}/topic-manager`} component={TopicManager}/>
        <SecureComponent  path={`${this.props.match.url}/subject-manager`} component={SubjectManager}/>
        <SecureComponent  path={`${this.props.match.url}/test-series-manager`} component={TestSeriesManager}/>
        <SecureComponent  path={`${this.props.match.url}/question-manager`} component={QuestionManager}/>
        <SecureComponent  path={`${this.props.match.url}/blog-manager`} component={BlogManager}/>
        <SecureComponent  path={`${this.props.match.url}/strategy-manager`} component={StrategyManager}/>
        <SecureComponent  path={`${this.props.match.url}/cache-manager`} component={CacheManagerComponent}/>
        <Route  
         render={()=><Redirect to={`${this.props.match.url}/user-manager`}/>}/>
       </Switch>
      </div>     
     </div>
    </div>
   );
  }
    
};

let AdminHomeComp = withRouter(AdminHome);

export default AdminHomeComp;