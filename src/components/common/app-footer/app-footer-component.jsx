import React from 'react';
import FeedbackFormComponent from '../feedback-form/component';
import PopupModal from '../../helper/popup';
import './style.css';

//App Footer component
export default class AppFooter extends React.Component{
  state={
   feedbackPopUp:false
  }
  onFeedbackClick = ()=>{
   this.setState({feedbackPopUp:!this.state.feedbackPopUp});
  }

  render (){
   return (
    <footer className="app-footer-container">
     <div className="container-fluid">      
    
      <div className=" row">
       <div className="flex-grow-1">
     © 2018, Tutorial Services, Inc. or its affiliates. All rights reserved
       </div>  
      </div>
   
     </div>
    </footer>
   );
   // Return Method Ends here
  }
};