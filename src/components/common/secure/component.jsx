import React from 'react';
import {NavLink,Route,Switch,Prompt,Redirect,withRouter} from 'react-router-dom';
import {isUserAuthenticated} from '../../../utils/autherization';

export default class SecureComponent extends React.Component{
 render() {
  let { component: Component, ...rest } = this.props;
  
  return (
   <Route
    {...rest}
    render={props =>
     isUserAuthenticated() ? (
      <Component {...props} />
     ) : (
      <Redirect
       to={{
        pathname: "/login",
        state: { from: props.location }
       }}
      />
     )
    }
   />
  );
 }
}