import React from 'react';

/**
 * An video embed component.
 *
 * @type {Component}
 */

class Video extends React.Component {
 
 /**
   * When clicks happen in the input, stop propagation so that the void node
   * itself isn't focused, since that would unfocus the input.
   *
   * @type {Event} e
   */

  onClick = e => {
   e.stopPropagation();
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
   return (
    <div {...this.props.attributes}>
     {this.renderVideo()}    
    </div>
   );
  }

  renderVideo = () => {
   const { node, isFocused } = this.props;
   const video = node.data.get('video');
   const wrapperStyle = {
    position: 'relative',
    outline: isFocused ? '2px solid blue' : 'none',
   };
   const iframeStyle = {
    display: 'block',
    margin:'auto'
   };

   return (
    <div style={wrapperStyle}>    
     <iframe title="new title" 
      width="560" 
      height="315" 
      src={video} 
      frameborder="0" 
      allow="autoplay;fullscreen; encrypted-media" 
      
      style={iframeStyle}>
     </iframe>
     
    </div>
   );
  }

}

export default Video;