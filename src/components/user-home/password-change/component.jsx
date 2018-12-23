import React from 'react';
import {passwordChange} from '../../../services/user-service';

export default class PasswordResetComponent extends React.Component{

    state={
     isError:false,
     message:'Please wait while loading data...',
     currentPassword:'',
     newPassword:'',
     username:'',
    }

    render(){
     return <div className="password-change-container">
      <div className="row justify-content-center">
       <div className="heading-col">
        <span className="text-style">Change Your Password</span>
       </div>
      </div>
      <hr className="divider"/>
      <div className="row justify-content-center">
       <div className="text-center">      
        {this.state.message?
         <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
          {this.state.message}       
         </div>:''}
       </div>
      </div>


     </div>;
    }
    
}