import React from 'react';
import  RichTextEditor from '../../admin/rich-text-editor/container';
import {Value} from 'slate';

export default class TogglerComp extends React.Component{
 state={
  instructionsOpen:true,
  descriptionOpen:true,
 }

 onInstructionToggler = ()=>{
  this.setState({instructionsOpen:!this.state.instructionsOpen});
 }
   onDescriptionToggler = ()=>{
    this.setState({descriptionOpen:!this.state.descriptionOpen});
   }

   render(){
    return <div className="container">
     <div className="row"><div className="desc-toggler"
      onClick={this.onDescriptionToggler}
     >
      <span className="font-weight-bold">{this.state.descriptionOpen?'-':'+'}</span>
     
      <span className="text-style">Description:</span></div>
     </div>
     <div id="descriptionContainerId" 
      className={"row instructions-row "+(this.state.descriptionOpen?'':' d-none ')}>
      <div className="container">
       <div className="row">
        <div><span className="text-style">{this.props.exam.desc?this.props.exam.desc:'Not provided.'}</span></div>
       </div>
      </div>     
     </div>

     <div className="row "> <div 
      onClick={this.onInstructionToggler}
     >
      <span className="font-weight-bold">{this.state.instructionsOpen?'-':'+'}</span>      
      <span className="text-style">Instructions:</span></div></div>
     <div className={"row instructions-row "+(this.state.instructionsOpen?'':' d-none ')}>        
      <div className="container">
       <div className="row">
        <div><span className="text-style">
         <RichTextEditor id="instructionsId" 
          readOnly={true}
          value={this.props.exam.instructions?Value.fromJSON(JSON.parse(this.props.exam.instructions)):'Not provided.'}  
         />  
        </span></div>
       </div>
      </div>     
     </div>
    </div>;
   }
}