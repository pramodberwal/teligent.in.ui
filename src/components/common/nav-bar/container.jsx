import React from 'react';
import NavBarComp from './component';
import {withRouter,Route , Switch} from 'react-router-dom';

class NavBarContainer extends React.Component{
 render(){
  return (
   <Switch>
    <Route path={`${this.props.match.url}`} render = {
     (props)=>{
      return <NavBarComp {...this.props}/>;
     }
    }/>
   </Switch>
  );
 }
}


export let NavBarWrapper = withRouter(NavBarContainer);
export default NavBarWrapper;
