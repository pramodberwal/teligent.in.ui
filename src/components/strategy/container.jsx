import React from 'react';
import {withRouter,Switch,Route} from 'react-router-dom';
import StrategyComponent from './component';

class StrategyContainer extends React.Component{
 render(){
  return <Switch>
   <Route exact path={this.props.match.url} render={()=>{
    return <StrategyComponent {...this.props}/>;
   }} />
   <Route  path={`${this.props.match.url}/:strategyId`} render={(props)=>{
    return <StrategyComponent strategyId={props.match.params.strategyId}  {...this.props}/>;
   }} />
  </Switch>;
 }
}

let Strategy = withRouter(StrategyContainer);
export default Strategy;