import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Switch,Route} from 'react-router-dom';
import UserEditorComponent from './component';


let mapStateToProps=(state,props)=>{ 
 return {};
};
let mapDispatchToProps = (dispatch)=>{
 return {};
};

class UserEditorContainer extends React.Component{
 render(){
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`} render={()=>{
     return (<UserEditorComponent {...this.props}/>);
    }}/>
   </Switch>
 
  );
 }
}

export let UserEditor = withRouter(connect(mapStateToProps,mapDispatchToProps)(UserEditorContainer));