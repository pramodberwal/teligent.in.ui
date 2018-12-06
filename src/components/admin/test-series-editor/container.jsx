import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,withRouter} from 'react-router-dom';
import TestSeriesEditorComponent from './component';
import AddQuestionComponent from './add-question-container';

let mapStateToProps =(state,props)=>{  
 return {};
};
let MapDispatchToProps = (dispatch)=>{
 return {};
};
class TestSeriesEditorContainer extends React.Component{  
 render(){   
  return(
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render={()=>{
      return <TestSeriesEditorComponent         
       {...this.props}/>;
     }}/> 
    <Route exact path={`${this.props.match.url}/add-question/:id`} 
     render={(props)=>{
      return <AddQuestionComponent
       seriesId={props.match.params.id}
      />;
     }}/> 
   </Switch>
  );
 }
}

let TestSeriesEditor = withRouter(connect(mapStateToProps,MapDispatchToProps)(TestSeriesEditorContainer));
export default TestSeriesEditor;