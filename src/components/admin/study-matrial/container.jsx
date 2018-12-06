import React from 'react';
import {withRouter,Switch,Route} from 'react-router-dom';
import StudyMatrialComponent from './component';

class StudyMatrialContainer  extends React.Component{
 render(){
  return (
   <Switch>
    <Route exact path={this.props.match.url} render={()=>{
     return <StudyMatrialComponent {...this.props}/>;
    }}/>              
   </Switch>   
  );
 }
}  
let StudyMatrial = withRouter(StudyMatrialContainer);
export default StudyMatrial;