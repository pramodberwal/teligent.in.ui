import React from 'react';
import {Value} from 'slate';
import RichTextEditor from '../../admin/rich-text-editor/container';

export default class Instructions extends React.Component{
    componentDidMount=()=>{
     window.oncontextmenu =(e)=>{
      e.preventDefault();
     };
    }
    componentWillUnmount =()=>{
     window.oncontextmenu =(e)=>{
     };
    }
    render(){
     let {test} = this.props;
     return (<div className="instructions-row">
      <div className="instructions-heading">
        Important Instructions:
      </div>
      <div className="instructions-container">         
       <RichTextEditor id="instructionsId" readOnly={true}
        value={test.instructions?Value.fromJSON(JSON.parse(test.instructions)):''}  />
      </div>
  
     </div>);
    }
};