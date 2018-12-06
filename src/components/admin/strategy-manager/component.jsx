import React from 'react';
import {Link} from 'react-router-dom';
import { Value } from 'slate';
import RichTextEditor from '../../admin/rich-text-editor/container';
import {getAllStrategies} from '../../../services/strategy';
import {deleteStrategy} from '../../../services/strategy';
import './style.css';

export default class StrategyManagerComponent extends React.Component{
    state={
     isError:false,
     message:'Loading strategies....',
     strategies:[],
    }
    componentDidMount=()=>{     
     getAllStrategies()
      .then(resp => {
       this.setState({isError:false,message:'',strategies:resp.strategies});
      })
      .catch(error=>{
       this.setState({isError:true,message:error.message});
      });
    }

    deleteStrategy = (id)=>{
     deleteStrategy(id)
      .then(data =>{
       this.componentDidMount();
      })
      .catch(error =>{
       this.setState({isError:true,message:error.message});
      });
    }

    render(){
     window.scrollTo(0,0);
     if( !Array.isArray(this.state.strategies) || this.state.strategies.length === 0){
      return <div className="container-fluid strategy-manager-container">
       <div className="row ">     
        <div>
         <Link className="btn btn-primary" to={`${this.props.match.url}/add-strategy`}>Add New</Link>
        </div>    
        <div className="flex-grow-1 text-center">
        Strategy Manager
        </div>
       </div>
       <div className="row justify-content-center">
        {this.state.message?
         <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
          {this.state.message}       
         </div>:''}   
       </div>
      </div>;
     }

     let strategyListHtml = this.state.strategies.map((strategy,index)=>{
      return <div key={index} className="row strategy-row"> 
       <div className="flex-grow-1">
        <div className="strategy-summary-row">
         <div className="container-fluid">
          <div className="row">
           <div className="flex-grow-1">
            {strategy.summary}
           </div>
           <div className="strategy-edit-btn">
            <Link className="btn btn-primary" to={`${this.props.match.url}/edit-strategy/`+strategy.id}>Edit</Link>
           </div> 
           <div className="strategy-delete-btn">
            <button type="button" className="btn btn-primary" onClick={()=>this.deleteStrategy(strategy.id)}>Delete</button>
           </div> 
          </div>

         </div>
        </div>
        <div className="strategy-Description">
         <RichTextEditor readOnly={true}
          value={Value.fromJSON(JSON.parse(strategy.description))}/>
        </div>
       </div>     
      </div>;
     });

     return <div className="container-fluid strategy-manager-container">
      <div className="row heading-row ">     
       <div>
        <Link className="btn btn-primary" to={`${this.props.match.url}/add-strategy`}>Add New</Link>
       </div>    
       <div className="flex-grow-1 text-center">
        Strategy Manager
       </div>
      </div>

      {strategyListHtml}

     </div>;
    }
}