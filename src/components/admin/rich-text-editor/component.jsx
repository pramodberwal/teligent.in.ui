import React from 'react';
import { Editor } from 'slate-react';
import _ from 'lodash';
import { getEventRange, getEventTransfer } from 'slate-react';
import { Value, Block } from 'slate';
import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fraction, toTex } from 'algebra.js';
import MathJax from 'react-mathjax';
import {PopUpModel} from '../../helper/popup';
import initialValue from './value.json';
import { isKeyHotkey } from 'is-hotkey';
import styled from 'react-emotion';
import { Button, Icon, Toolbar } from './components';
import './style.css';
import Video from './Video';

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph';

const ALLOWED_IMAGES_EXT = ['gif','png','jpg','jpeg'];
const ALLOWED_MIMES = ['image'];
const ALLOWED_IMAGE_FILE_SIZE= 20480;



/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

/**
 * The rich text example.
 *
 * @type {Component}
 */

function isImage(url) {
 return !!imageExtensions.find(url.endsWith);
}
function insertVideo (change, url, target){
 if (target) {
  change.select(target);
 }
 change
  .insertBlock({
   type: 'video',
   data: { 
    video: url 
   }   
  });

}

function insertImage(change, src, target) {
 if (target) {
  change.select(target);
 }
 change
  .insertInline({
   type: 'image',
   data: { src:src,
    className: 'img-responsive' },
    
  })
  .moveToStartOfNextText()
  .focus();

}

function FractionDisplay(props) {
 const a = new Fraction(1, 5);
 const b = new Fraction(2, 7);
 const answer = a.multiply(b);
 return (    
  <MathJax.Provider>
   <span>
    <MathJax.Node inline formula={`${toTex(a)} × ${toTex(b)} = ${toTex(answer)}`} />
   </span>
  </MathJax.Provider>
   
 );
}

const Emoji = styled('span')`
  outline: ${props => (props.selected ? '2px solid blue' : 'none')};
`;

const CHARS = [
 'divide',
 'plus',
 'minus',
 'times',
];


const noop = e => e.preventDefault();
let VideoSelectorComp = (props)=>{
 let videoUrlInput = React.createRef();
 return <div>
  <div className="form-group">
   <input  className="form-control"
    ref={videoUrlInput} 
    name="video_url"   
    id="videoUrlId"/> 
   <button type="button" 
    className="btn btn-primary form-control"
    data-dismiss="modal" 
    onClick={()=>props.onAddVideo(props,videoUrlInput.current.value)}>Insert</button>
  </div>
 
 </div>; 
};

let mathEquationEditor = (props)=>{
 let mathJaxFormulaInput = React.createRef();
 return <div>
  <label><a target="_blank" rel="noopener noreferrer "
   href="http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm">
   TeX Help Link.
  </a></label>
  <textarea rows={3} cols={50} ref={mathJaxFormulaInput}  name="mathjaxformula" />
  <button type="button" 
   className="btn btn-primary"
   data-dismiss="modal" 
   onClick={()=>props.onMathJaxFormulaInsert(mathJaxFormulaInput.current.value)}>Insert</button>
 </div>;
};
let ImageSelectorComp = (props)=>{
 let imageFileInput = React.createRef();
 return <div>
  <input type="file" 
   ref={imageFileInput} 
   name="image_path"   
   id="imagePathId"/> 
  <button type="button" 
   className="btn btn-primary"
   data-dismiss="modal" 
   onClick={()=>props.onUploadImage(props,imageFileInput.current)}>Upload</button>         
 </div>; 
};
 
export default class RichTextEditorComponent extends React.Component{
 /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
   openSpecialCharsContainerActive:false,
   isInfoOpen:false,
   value: Value.fromJSON(initialValue),
  }

  schema = {
   document: {
    last: { type: 'paragraph' },
    normalize: (change, { code, node, child }) => {
     switch (code) {
     case 'last_child_type_invalid': {
      const paragraph = Block.create('paragraph');
      return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
     }
     default:
     }
    },
   },
   blocks: {
    image: {
     isVoid: true,
    },
    'mathjax-inline': {
     isVoid: true,
    },
    video: {
     isVoid: true,
    },
   },
   inlines: {
    emoji: {
     isVoid: true,
    },
    image: {
     isVoid: true,
    },
    'mathjax-inline': {
     isVoid: true,
    }
   },
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
   const { value } = this.state;
   return value.activeMarks.some(mark => mark.type == type);
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {   
   if(!Value.isValue( this.props.value)){
    return false;
   }
   return this.props.value.blocks.some(node => 
   {
    return node.type === type;
   });
  }

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  ref = editor => {
   this.editor = editor;
  }

  /**
   * Render.
   *
   * @return {Element}
   */
  openSpecialCharsContainer= ()=>{
   this.setState({openSpecialCharsContainerActive:!this.state.openSpecialCharsContainerActive});
  }

  onAddVideo = (props,videoUrlInput) => {
   this.editor.change(insertVideo, videoUrlInput);
  }

  onMathJaxFormulaInsert = (formula)=>{
   this.editor.change(change => {
    change
     .insertInline({
      type:'mathjax-inline',
      data:{
       tex:formula
      }
     });
   });

  }
  onUploadImage = (props,fileInput) => {
   let fileList = fileInput.files;
   let imageFile = "";
   if(!fileList || fileList.length <= 0 ){
    alert('Please select image file');
    return;
   }

   if( fileList.length > 1){
    alert('Please select single image file');
    return ;
   }    
   imageFile = fileList[0];
   if(imageFile){
    let [mime,ext] = imageFile.type.split('/');
    if(!ALLOWED_IMAGES_EXT.includes(_.toLower(ext)) || !ALLOWED_MIMES.includes(_.toLower(mime))){
     alert('Only image with extentions (png, gif, and jpg are allowed) are allowed! you file:'+ ext);
     return;
    }
    let fileSize = imageFile.size;

    if(fileSize > ALLOWED_IMAGE_FILE_SIZE){
     alert('Image file size should not be more than '+(ALLOWED_IMAGE_FILE_SIZE/1024)+' KB your file size ='+(fileSize/1024));
     return;
    }
   };
   let fileReader = new FileReader();
   fileReader.addEventListener('load',()=>{
    this.editor.change(insertImage, fileReader.result);
   });
   fileReader.readAsDataURL(fileInput.files[0]); 
  };

  onClickImage = event => {
   event.preventDefault();
   const src = <input tyep="file"></input>;
   if (!src) return;
    
   let fileReader = new FileReader();
   let file = new File(src);
   fileReader.addEventListener('load',()=>{     
    this.editor.change(insertImage, fileReader.result);
   });
   fileReader.readAsDataURL(file); 
  }

  onInfo = ()=>{
   this.setState({isInfoOpen:!this.state.isInfoOpen});
  }


  render() {
   if(this.props.readOnly){
    return ( 
     <div className="rich-text-editor-container">
      <div className="read-only">        
       <Editor id={"descriptionEditorId"+this.props.id} key={this.props.id} 
        readOnly={true}
        renderNode={this.renderNode}
        renderMark={this.renderMark}       
        value={Value.isValue(this.props.value)?this.props.value:this.state.value}
       /> 
      </div>
     </div>);
   }
   return (
    <div className="rich-text-editor-container">
     <i className="help-icon" onMouseDown={this.onInfo}><FontAwesomeIcon          
      className="tool-icon"                         
      icon="info-circle" /></i>
     <span className={this.state.isInfoOpen?'help-info-container-active':'help-info-container'}>
      You can use http://latex.codecogs.com/eqneditor/editor.php?mode=NEW 
      to edit equations and paste the image here.</span>
     <div className="read-writer">
      <div className="tool-bar-row">      
       <span className="tool-bar-col">        
        <FontAwesomeIcon  
         data-toggle="modal"        
         className="tool-icon"
         data-target={"#"+this.props.id}                    
         icon="image" />
        <PopUpModel id={this.props.id} title="Select Image"
         Component={ImageSelectorComp}
         onUploadImage={this.onUploadImage}
        /> 
       </span>
       <span className="tool-bar-col">        
        <FontAwesomeIcon  
         data-toggle="modal"        
         className="tool-icon"
         data-target={"#video_"+this.props.id}                    
         icon="video" />
        <PopUpModel id={"video_"+this.props.id} title="Select Video Source"
         Component={VideoSelectorComp}
         onAddVideo={this.onAddVideo}
        /> 
       </span>         
       <span className="tool-bar-col">
        {this.renderMarkButton('bold','bold')}
        {this.renderMarkButton('italic','italic')}
        {this.renderMarkButton('underlined','underline')}
       </span>
       <span className="tool-bar-col">
        {this.renderMarkButton('superscript','superscript')}
        {this.renderMarkButton('subscript','subscript')}
       </span>
       <span className="tool-bar-col">
       
        <span className="tool-icon">
         <span  
          data-toggle="modal"        
          className="tool-icon"
          data-target={"#mathjax_"+this.props.id}                    
         >MathEq</span>
         <PopUpModel id={'mathjax_'+this.props.id} 
          title="Insert MathJAX and Tex formula"
          Component={mathEquationEditor}
          onMathJaxFormulaInsert={this.onMathJaxFormulaInsert}
         /> 
        </span>
        <span className="tool-icon"
         onMouseDown={event => this.onClickBlock(event, 'heading-one')}
        > h1</span>
        <span className="tool-icon"
         onMouseDown={event => this.onClickBlock(event, 'heading-two')}
        > h2</span> 
        <span className="tool-icon"
         onMouseDown={event => this.onClickBlock(event, 'bulleted-list')}
        > ul</span>   
        <span className="tool-icon"
         onMouseDown={event => this.onClickBlock(event, 'list-item')}
        > li</span>   
        {this.renderBlockButton('numbered-list','list-ol')}       
       </span>
       <span className="tool-bar-col">
        <button type="button" className={this.state.openSpecialCharsContainerActive?"toggler-active":""} onClick={this.openSpecialCharsContainer}>
         <span>&#937;</span>
        </button>              
        <div className={this.state.openSpecialCharsContainerActive?"special-character-container-active":"special-character-container"}>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('division')}>
          <span>&#247;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('infinity')}>
          <span>&#8734;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('plus-minus')}>
          <span>&#177;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('micro')}>
          <span>&#181;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('dollar')}>
          <span>&#36;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('euro')}>
          <span>&#8364;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('rupee')}>
          <span>&#8377;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('eta')}>
          <span>&#951;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('eta')}>
          <span>&#955;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('lambda')}>
          <span>&#945;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('mu')}>
          <span>&#956;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('pi')}>
          <span>&#960;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('rho')}>
          <span>&#961;</span>
         </button>
        
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('sigma')}>
          <span>&#963;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('sigma')}>
          <span>&#966;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('phi')}>
          <span>&#946;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('gamma')}>
          <span>&#947;</span>
         </button>
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('delta')}>
          <span>&#948;</span>
         </button>          
         <button className="tool-icon" type="button" 
          onMouseDown={() => this.insertChar('epsilon')}>
          <span>&#949;</span>
         </button>          
        </div>
       </span>

      </div>
      <div className="rich-text-editor">
       <Editor
        tabIndex={this.props.tabIndex}
        spellCheck
        schema={this.schema}
        placeholder={this.props.placeholder?this.props.placeholder:"Enter text"}
        ref={this.ref}
        value={Value.isValue(this.props.value)?this.props.value:this.state.value}
        onChange={this.props.onChange}
        onKeyDown={this.onKeyDown}
        onDrop={this.onDropOrPaste}
        onPaste={this.onDropOrPaste}
        renderNode={this.renderNode}
        renderMark={this.renderMark}
       />
      </div>
     </div>
    </div>
   );
  }
  onDropOrPaste = (event, change, next) => {
   const { editor } = change;
   const target = getEventRange(event, editor);
   if (!target && event.type === 'drop') return next();

   const transfer = getEventTransfer(event);
   const { type, text, files } = transfer;

   if (type === 'files') {
    for (const file of files) {
     const reader = new FileReader();
     const [mime] = file.type.split('/');
     if (mime !== 'image') continue;

     reader.addEventListener('load', () => {
      editor.change(c => {
       c.call(insertImage, reader.result, target);
      });
     });

     reader.readAsDataURL(file);
    }
    return;
   }

   if (type === 'text') {
    if (!isUrl(text)) return next();
    if (!isImage(text)) return next();
    change.call(insertImage, text, target);
    return;
   }

   next();
  }


  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
   const isActive = this.hasMark(type);
   return (
    <FontAwesomeIcon        
     className="tool-icon"
     onMouseDown={event => this.onClickMark(event, type)}     
     icon={icon} />
   );
  }

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon) => {
   let isActive = this.hasBlock(type);

   if (['numbered-list', 'bulleted-list'].includes(type)) {
    const { value } = this.state;
    const parent = value.document.getParent(value.blocks.first().key);
    isActive = this.hasBlock('list-item') && parent && parent.type === type;
   }

   return (
    <FontAwesomeIcon        
     className="tool-icon"
     onMouseDown={event => this.onClickBlock(event, type)}     
     icon={icon} />
   );
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = (props, next) => {
   const { attributes, children, node,isFocused  } = props;

   switch (node.type) {
   case 'paragraph': 
    return <p {...attributes}>{children}</p>;   
   case 'video':
    return <Video {...props} />;
   case 'emoji1': {
    const code = node.data.get('code');
    return (
     <Emoji
      {...props.attributes}
      selected={isFocused}
      contentEditable={false}
      onDrop={noop}
     >
      {code}
     </Emoji>
    );
   }
   case 'emoji': {
    const code = node.data.get('code');
      
    return (
     <span>
      <FontAwesomeIcon 
       icon={code} /> 
     </span>  

    );
   }
   case 'division': {       
    return  <span>&#247;</span>;
   }
   case 'dollar': {       
    return  <span>&#36;</span>;
   }
   case 'euro': {       
    return  <span>&#8364;</span>;
   }
   case 'rupee': {       
    return  <span>&#8377;</span>;
   }
   case 'micor': {       
    return  <span>&#181;</span>;
   }
   case 'plus-minus': {       
    return  <span>&#177;</span>;
   }
   case 'infinity': {       
    return  <span>&#8734;</span>;
   }
   case 'pi': {       
    return  <span>&#960;</span>;
   }
   case 'lambda': {       
    return  <span>&#955;</span>;
   }
   case 'capital_omega': {       
    return  <span>&#937;</span>;
   }
   case 'alpha': {       
    return  <span>&#945;</span>;
   }
   case 'beta': {       
    return  <span>&#946;</span>;
   }
   case 'gamma': {       
    return  <span>&#947;</span>;
   }
   case 'delta': {       
    return  <span>&#948;</span>;
   }
   case 'epsilon': {       
    return  <span>&#949;</span>;
   }
   case 'theta': {       
    return  <span>&#952;</span>;
   }   
   case 'eta': {       
    return  <span>&#951;</span>;
   }   
   case 'capital_phi': {       
    return  <span>&#934;</span>;
   }   
   case 'mu': {       
    return  <span>&#956;</span>;
   }   
   case 'rho': {       
    return  <span>&#961;</span>;
   }   
   case 'sigma': {       
    return  <span>&#963;</span>;
   }   
   case 'phi': {       
    return  <span>&#966;</span>;
   }   
   case 'omega': {       
    return  <span>&#969;</span>;
   }
   case 'mathjax-inline':{
    const tex = node.data.get('tex');
    return <span {...attributes}>
     <span {...attributes}>{children}</span> 
     <MathJax.Provider>
      <MathJax.Node inline formula={tex} />
     </MathJax.Provider>
     <span {...attributes}>{children}</span> 
    </span>;
   }
   case 'mathjax-block':{
    return '';
   }
   case 'image': {
    const src = node.data.get('src');
    const className = node.data.get('className');
    return <img className={"img-fluid d-inline "+className }
     src={src} {...attributes} alt="Question"/> ;   
   }
   case 'block-quote':
    return <blockquote {...attributes}>{children}</blockquote>;
   case 'bulleted-list':
    return <ul {...attributes}>{children}</ul>;
   case 'heading-one':
    return <h1 {...attributes}>{children}</h1>;
   case 'heading-two':
    return <h2 {...attributes}>{children}</h2>;
   case 'list-item':
    return <li {...attributes}>{children}</li>;
   case 'numbered-list':
    return <ol {...attributes}>{children}</ol>;
   default:
    return next();
   }
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */
  renderMark = (props, next) => {
   const { children, mark, attributes } = props;

   switch (mark.type) {
   case 'bold':
    return <strong {...attributes}>{children}</strong>;
   case 'code':
    return <code {...attributes}>{children}</code>;
   case 'italic':
    return <em {...attributes}>{children}</em>;
   case 'underlined':
    return <u {...attributes}>{children}</u>;
   case 'subscript':
    return <sub {...attributes}>{children}</sub>;
   case 'superscript':
    return <sup {...attributes}>{children}</sup>;
   default:
    return next();
   }
  }

  /**
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

  onChange = (change) => { 
   this.props.onChange(change);  
  }

  onClickEmoji11 = (e, code) => {
   e.preventDefault();

   this.editor.change(change => {
    change
     .insertInline({
      type: 'emoji',
      data: { code },
     })
     .moveToStartOfNextText()
     .focus();
   });
  }

  insertChar =(name)=>{    
   this.editor.change(change => {
    change.insertText(' ');    
    change
     .insertInline({
      type: name
     })        
     .moveToStartOfNextText()
     .focus();
    change.insertText('');  
   });
  }

  onClickEmoji = (e, code) => {
   e.preventDefault();
   this.editor.change(change => {    
    change
     .insertInline({
      type: 'emoji',
      data: { code:code,
       spCode:'&#64;' },
     })        
     .moveToStartOfNextText()
     .focus();
   });
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  onKeyDown = (event, change, next) => {
   let mark;
   if (isBoldHotkey(event)) {
    mark = 'bold';
   } else if (isItalicHotkey(event)) {
    mark = 'italic';
   } else if (isUnderlinedHotkey(event)) {
    mark = 'underlined';
   } else if (isCodeHotkey(event)) {
    mark = 'code';
   } else {
    return next();
   }
   event.preventDefault();
   change.toggleMark(mark);
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
   event.preventDefault();

   this.editor.change(change => {
    change.toggleMark(type);
   });
  }

  onClickChar = (event, type) => {
   event.preventDefault();

   this.editor.change(change => {
    change.toggleMark(type);
   });
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
   event.preventDefault();
   this.editor.change(change => {
    const { value } = change;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
     const isActive = this.hasBlock(type);
     const isList = this.hasBlock('list-item');

     if (isList) {
      change
       .setBlocks(isActive ? DEFAULT_NODE : type)
       .unwrapBlock('bulleted-list')
       .unwrapBlock('numbered-list');
     } else {
      change.setBlocks(isActive ? DEFAULT_NODE : type);
     }
    } else {
     // Handle the extra wrapping required for list buttons.
     const isList = this.hasBlock('list-item');
     const isType = value.blocks.some(block => {
      return !!document.getClosest(block.key, parent => parent.type === type);
     });

     if (isList && isType) {
      change
       .setBlocks(DEFAULT_NODE)
       .unwrapBlock('bulleted-list')
       .unwrapBlock('numbered-list');
     } else if (isList) {
      change
       .unwrapBlock(
        type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
       )
       .wrapBlock(type);
     } else {
      change.setBlocks('list-item').wrapBlock(type);
     }
    }
   });
  }

}
