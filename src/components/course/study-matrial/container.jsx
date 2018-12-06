import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import StudyMatrialComponent from './component';
import SecureComponent from '../../common/secure/component';

class StudyMatrialContainer extends React.Component{
 render(){
  return <Switch>
   <Route path={this.props.match.url}
    render ={()=>{     
     return <SecureComponent  path={`${this.props.match.url}`} component={()=><StudyMatrialComponent {...this.props}/>}/>;
    }}/>
  </Switch>;
 }    
}

let StudyMatrial = withRouter(StudyMatrialContainer);
export default StudyMatrial;