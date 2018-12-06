import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import TopicComponent from './component';
import TopicEditor from '../topic-editor/container';

let mapStateToProps = (state) =>{
 return {};
};

let mapDispatchToProps = (dispatch) =>{
 return {};
};

class TopicManagerContainer extends React.Component{
 
 render(){
  return (
   <Switch>
    <Route exact 
     path={`${this.props.match.url}`} 
     render={()=><TopicComponent {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/add-topic`} 
     render={()=><TopicEditor {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/edit-topic/:id`} 
     render={(props)=><TopicEditor id={props.match.params.id} {...this.props}/>} />
   </Switch>
  );   
 }
}


let TopicManager = connect(mapStateToProps,mapDispatchToProps)(TopicManagerContainer);

export default TopicManager;