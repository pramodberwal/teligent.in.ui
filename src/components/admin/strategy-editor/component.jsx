import React from 'react';
import * as _ from 'lodash';
import {Value} from 'slate';
import './style.css';
import RichTextEditor from '../rich-text-editor/container';
import {getStrategyById, saveStrategy} from '../../../services/strategy';
import {initialSummary} from './initial-value';

export default class StrategyEditorComponent extends React.Component{

    state={
     message:'',
     isError:false,
     strategy:{
      seqOrder:'',
      summary:'',
      description:initialSummary,
     }      
    }

    componentDidMount =()=>{
     if(this.props.strategyId){   
      getStrategyById(this.props.strategyId)
       .then(resp =>{
        if(resp.strategy.description){
         resp.strategy.description = Value.fromJSON(JSON.parse(resp.strategy.description));       
        }else{
         resp.strategy.description = initialSummary;
        }
        this.setState({strategy:resp.strategy});
       });
     }else if(document.cookie){
      let cookiearray = document.cookie.split(';');
      let name, value;
      for(var i=0; i<cookiearray.length; i++){
       name = cookiearray[i].split('=')[0];
       value = cookiearray[i].split('=')[1];
       if('strategy' === name){
        let strategy = JSON.parse(value);
        if(!Value.isValue(strategy.description)){
         strategy.description = Value.fromJSON(strategy.description);
        }
        this.setState({strategy:strategy});
       }
       
      }
     }
    }
    onClear = ()=>{
     window.scroll(0,0);
     this.setState({strategy:{ summary:' ',seqOrder:'',
      description:initialSummary}});
    }

    onSave = ()=>{
     let strategy =  this.state.strategy;
     window.scroll(0,0);
     let editorString ='';
     if(Value.isValue(strategy.description)){
      editorString = strategy.description.toJSON();
      strategy.description = JSON.stringify(editorString);   
     }
     saveStrategy(strategy)
      .then(resp =>{       
       this.props.history.goBack();
      })
      .catch(error =>{
       this.setState({isError:true, message:error.message});
      });
    }
    onChange = (filedName, fieldValue)=>{
     this.setState({strategy:{...this.state.strategy,[filedName]:fieldValue}});
     document.cookie="strategy="+JSON.stringify(this.state.strategy);
    }

    onStrategyDescriptionChange  = ( change ) =>{
     let {value} = change;
     this.setState({strategy:{...this.state.strategy,description:value}});
     document.cookie="strategy="+JSON.stringify(this.state.strategy);
    }

    render(){
     return <div className="container-fluid strategy-editor-container">
      <div className="row editor-heading-row "> 
       <div className="back-btn">
        <button className="btn btn-primary" onClick={this.props.history.goBack}>
      Back
        </button>
       </div>   
       <span className="editor-heading-text">Strategy Editor</span>
      </div>
      <hr className="divider m-1"/>
      <div className="row justify-content-center">
       <div className="text-center">      
        {this.state.message?
         <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
          {this.state.message}       
         </div>:''}
       </div>
      </div>
      <form>
       <div className="form-row">
        <label htmlFor="seqOrderId">Seq Order: </label>
        <div className="form-group col-6 col-sm-1">        
         <input type="text"
          id="seqOrderId"
          className="form-control"
          name="seqOrder"
          value={this.state.strategy.seqOrder?this.state.strategy.seqOrder:''}
          onChange={(e)=>this.onChange('seqOrder', e.target.value)}
         ></input>
        </div>
       </div>
       <div className="form-group">
        <label htmlFor="strategySummaryId">Strategy Summary:</label>
        <input type="text"
         id="strategySummaryId"
         className="form-control"
         name="summary"
         value={this.state.strategy.summary}
         onChange={(e)=>this.onChange('summary', e.target.value)}
        ></input>
       </div>
       <div className="form-group">
        <label htmlFor="strategyDescriptionId">Strategy Description:</label>
        <RichTextEditor id="strategyDescriptionId" readOnly={false}
         value={this.state.strategy.description}
         placeholder="Enter strategy description"
         tabIndex={0} autoFocus={false}        
         onChange={this.onStrategyDescriptionChange}   />
       </div>
       <div className="form-group row">
        <div className="col-4 text-right">
         <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
        </div>  

        <div className="col-4 text-right">
         <button type="button" className="btn btn-primary" onClick={this.onClear}>Clear</button>
        </div>         
       </div>

      </form>            
     </div>;
    }

}
