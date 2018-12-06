import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import AppBodyComponent from './component';

class AppBodyContainer extends React.Component{
 render(){    
  return (
   <Switch>
    <Route exact path={`${this.props.match.url}`}
     render ={()=>{
      return <AppBodyComponent {...this.props}/>;
     }}>
    </Route>
   </Switch>
  );
 }
}

let AppBody = withRouter(AppBodyContainer);

export default AppBody;