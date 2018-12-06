import React from 'react';
import  {withRouter,Switch, Route} from 'react-router-dom';
import { connect} from 'react-redux';
import SubjectManagerComponent from './component';
import SubjectEditor from '../subject-editor/container';
import {getAllSubjects} from '../../../services/ref-data/subject';

let mapStateToProps =( state )=>{  
 return {};
};

let mapDispatchToProps = (dispatch ) =>{
 return {};
  
};

class SubjectManagerContainer extends React.Component{
 render () {

  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render ={(props) =>{
      return <SubjectManagerComponent {...this.props} />;
     }}/>
    <Route exect path={`${this.props.match.url}/add-subject`} 
     render ={(props) =>{
      return <SubjectEditor {...this.props} />;
     }}/>
    <Route 
     path={`${this.props.match.url}/edit-subject/:id`} 
     render={(props)=><SubjectEditor id={props.match.params.id} {...this.props}/>} />
     }}/>
   </Switch>
  );
 }
    
}

let SubjectManager = withRouter(connect(mapStateToProps,mapDispatchToProps)(SubjectManagerContainer));
export default SubjectManager;

