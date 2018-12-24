import React from 'react';
import {passwordResetRequest} from '../../../services/user-service';


export default class ForgotPassword extends React.Component{
    state={
     isError:false,
     message:'',
     username:'',
    }

    onUsernameChange =(value)=>{
     this.setState({username:value});
    }

    onConfirm = ()=>{
     if( !this.state.username ){    
      this.setState({isError:true, message:'Email is mandatory!'});
      return;
     }

     if(!this.validateEmail(this.state.username)){
      return;
     }
     this.setState({isError:false, message:'Please wait while we are generating request for you.'});
     passwordResetRequest(this.state.username)
      .then(data =>{
       this.setState({isError:false, message:data.message});
      })
      .catch(error =>{
       this.setState({isError:true, message:error.message});
      });     
    }
    validateEmail =(email)=>{
     var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
     if (reg.test(email) === false) 
     {
      this.setState({isError:true,message:'Invalid Email Address'});
      return false;
     }
     return true;
    }

    render(){
     return <div className="container forgot-password-container">
      <div className="row heading-row">
       <div>
        <button type="button" className="btn btn-primary" onClick={this.props.back}>Login</button> 
       </div>
       <div className="flex-grow-1 text-center">
        <span className="heading-text">Request New Password</span> 
        <hr />
       </div>
      </div>
      <div className="row justify-content-center">
       <div className="text-center">      
        {this.state.message?
         <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
          {this.state.message}   
         </div>:''}
       </div>
      </div>
      <div  className="row justify-content-center">
       <form>
        <div className="form-row form-group">            
         <div className="flex-grow-1">
          <label htmlFor="emailId">Registred Email Id/Username:</label>
          <input id="emailId" 
           name="username" 
           className="form-control"
           value={this.state.username?this.state.username:''} 
           onChange={(e) =>this.onUsernameChange(e.target.value)}
           placeholder="please enter registred e-mail/username" /> 
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
         </div>  
        </div>
        <div className="text-center flex-grow-1">
         <button type="button" className="btn btn-primary login-btn" 
          onClick={this.onConfirm}>Place request</button>          
        </div> 

       </form>
      </div>
      <div className="row justify-content-center">
      New password will be sent to your registred email id.
      </div>
   
            
     </div>;
    }
}