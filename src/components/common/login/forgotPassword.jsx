import React from 'react';


export default class ForgotPassword extends React.Component{
    state={
     isError:false,
     message:'',
     email:'',
    }

    onEmailChange =(value)=>{
     this.setState({email:value});
    }

    onConfirm = ()=>{
     if( !this.state.email ){    
      this.setState({isError:true, message:'Email is mandatory!'});
      return;
     }

     if(!this.validateEmail(this.state.email)){
      return;
     }
     this.setState({isError:false, message:'Password sent to you registred mail, please check your mail box and login again.'});
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
        <span className="heading-text">Generate New Password</span> 
        <hr />
       </div>
      </div>
      <div className="row justify-content-center">
       <div className="text-center">      
        {this.state.message?
         <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
          {this.state.message}           
          {!this.state.isError?<button type="button" className="btn btn-primary" onClick={this.props.back}>Login</button>:'' }    
         </div>:''}
       </div>
      </div>
      <div  className="row justify-content-center">
       <form>
        <div className="form-row form-group">            
         <div className="flex-grow-1">
          <label htmlFor="emailId">Registred Email Id:</label>
          <input id="emailId" 
           name="email" 
           className="form-control"
           value={this.state.email?this.state.email:''} 
           onChange={(e) =>this.onEmailChange(e.target.value)}
           placeholder="please enter registred e-mail" /> 
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
         </div>  
        </div>
        <div className="text-center flex-grow-1">
         <button type="button" className="btn btn-primary login-btn" 
          onClick={this.onConfirm}>Confirm</button>          
        </div> 

       </form>
      </div>
      <div className="row justify-content-center">
      New password will be sent to your registred email id.
      </div>
   
            
     </div>;
    }
}