import React from 'react';
import {connect} from 'react-redux';
import RichTextEditorComponent from './component';

let mapStateToProps=(state) =>{
 return state;
};

let mapDispatchToProps = (dispatch) =>{ 
 return {};
};

class RichTextEditorContainer extends React.Component{
 render(){
  return (
   <RichTextEditorComponent {...this.props} />
  );
 }
}

let RichTextEditor = connect(mapStateToProps,mapDispatchToProps)(RichTextEditorContainer);
export default RichTextEditor;