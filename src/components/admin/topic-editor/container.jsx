import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Switch,Route} from 'react-router-dom';
import TopicEditorComponent from './component';

let mapStateToProps = (state,props)=>{
 return {topicId:props.id};
};

let mapDispatchToProps = (dispatch)=>{
 return {};
};

class TopicEditorContainer extends React.Component{
 render(){
  return (
   <TopicEditorComponent {...this.props}/>
  );
 }
}

let TopicEditor = withRouter(connect(mapStateToProps,mapDispatchToProps)(TopicEditorContainer));
export default TopicEditor;