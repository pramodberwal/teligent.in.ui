import React from 'react';
import './popup.css';

export let PopUpModel = (props)=>{
 let {Component,title} = props;
 return (
  <div className="modal fade popup-box" id={props.id} tabIndex="-1" 
   role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
   <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
     <div className="modal-header">
      <h5 className="modal-title popup-title" id="popupModalLongTitle">
       {title}
      </h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
       <span aria-hidden="true">&times;</span>
      </button>
     </div>
     <div className="modal-body book-summary-body">
      <Component {...props}/>
     </div>
     <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
     </div>    
    </div>
   </div>
  </div>
 );
};