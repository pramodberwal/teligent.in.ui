import React from 'react';
import * as _ from 'lodash';
import {NavLink} from 'react-router-dom';
import RichTextEditor from '../admin/rich-text-editor/container';
import { Value } from 'slate';
import {getAllStrategies,getStrategyById} from '../../services/strategy';
import './style.css';

export default class StrategyComponent extends React.Component{
    state={
     isError:true,
     message:'Please wait while loading the strategy...',
     strategies:[],
     strategy:'',  
    }
    componentDidMount=()=>{
     getAllStrategies()
      .then( data =>{
       this.setState({isError:false,message:'',strategies:data.strategies,strategy:data.strategies[0]});
      })
      .catch(error =>{
       this.setState({isError:true,message:error.message});
      });
    }
    componentWillReceiveProps =(props)=>{
     if(props.strategyId){
      let strategy = _.find(this.state.strategies, strategy =>Number(strategy.id) === Number(props.strategyId));
      this.setState({strategy:strategy});
     }
    }

    render(){
     window.scrollTo(0,0);
     if(!Array.isArray(this.state.strategies) || this.state.strategies.length === 0){
      return <div>
       {this.state.message}
      </div>;
     }
     let strategyListHtml = this.state.strategies.map((strategy,index)=>{
      return <li key={index}>
       <NavLink to={`${this.props.match.url}/`+strategy.id}>{strategy.summary}</NavLink>
      </li>;
     });

     return <div className="container-fluid strategy-container">  
      <div className="row">
       <div className="strategy-navigation-container">
        <ol>
         {strategyListHtml}
        </ol>
       </div>
       <div className="flex-grow-1 strategy-detail-container">
        <div className="strategy-summary-header">{this.state.strategy.summary}</div>
        <div className="strategy-Description">
         {this.state.strategy?<RichTextEditor readOnly={true}
          value={Value.fromJSON(JSON.parse(this.state.strategy.description))}/>
          :''}   
        </div>
            
       </div>
      </div>
     </div>;
    }

}