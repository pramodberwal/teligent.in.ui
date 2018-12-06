import React from 'react';
import {withRouter,Switch,Route} from 'react-router-dom';
import StrategyEditorComponent from './component';

class StrategyEditorContainer extends React.Component{
 render(){
  return (
   <Switch>
    <Route exact path={this.props.match.url} render={()=>{
     return <StrategyEditorComponent {...this.props}/>;
    }}/>              
   </Switch>   
  );
 }
}

let StrategyEditor = withRouter(StrategyEditorContainer);
export default StrategyEditor;