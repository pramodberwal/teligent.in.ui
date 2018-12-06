import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,withRouter} from 'react-router-dom';
import AddQuestionComponent from './add-question-component';
let mapStateToProps =(state,props)=>{ 
 return  {seriesId:props.seriesId};
};

let MapDispatchToProps = (dispatch)=>{
 return { }; 
};
class AddQuestionContainer extends React.Component{
 render(){
  return(
   <Switch>
    <Route exact path={`${this.props.match.url}`} 
     render={()=>{
      return <AddQuestionComponent {...this.props}/>;
     }}/>            
   </Switch>
  );
 }
}

let AddQuestion = withRouter(connect(mapStateToProps,MapDispatchToProps)(AddQuestionContainer));
export default AddQuestion;