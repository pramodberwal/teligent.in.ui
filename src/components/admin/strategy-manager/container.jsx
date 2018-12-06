import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import StrategyManagerComponent from './component';
import StrategyEditor from '../strategy-editor/container';

class StrategyManagerContainer extends React.Component{
 
 render(){
  return (
   <Switch>
    <Route exact 
     path={`${this.props.match.url}`} 
     render={()=><StrategyManagerComponent {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/add-strategy`} 
     render={()=><StrategyEditor {...this.props}/>} />
    <Route 
     path={`${this.props.match.url}/edit-strategy/:id`} 
     render={(props)=><StrategyEditor strategyId={props.match.params.id} {...this.props}/>} />
   </Switch>
  );   
 }
}


let StrategyManager = withRouter(StrategyManagerContainer);

export default StrategyManager;   
