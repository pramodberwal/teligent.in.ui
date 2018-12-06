import React from 'react';
import * as $ from 'jquery';
import {Redirect,Link} from 'react-router-dom';
import './style.css';
import {doLogin,doFacebookLogin,getCsrfToken, doGoogleLogin} from '../../../services/login';
import { UserSignup } from './user-signup';
import ForgotPassword from './forgotPassword';

export default class LoginComponent extends React.Component{
    state={
     isError:false,
     message:'',
     username:'',
     password:'',
     redirectToReferrer: false,
     isSignUp:false,
     forgotPassword:false
    }
    inputElement = React.createRef() ;
    
componentDidMount=()=>{
 window.scroll(0,0);
 getCsrfToken();
 this.inputElement.current.addEventListener("keypress", (event)=>{
  var keycode = (event.keyCode ? event.keyCode : event.which);  
  if(Number(keycode) === 13){
   this.onLogin();
  }
 });
}

    onLogin=(type)=>{
     if( this.state.username === ''  || !this.state.password === '' ){
      this.setState({isError:true,message:'Please provide username and password.'});   
      return; 
     }

     this.setState({isError:false,message:'Please wait while we are validating your credentials...'});
     if('facebook' === type ){
      doFacebookLogin();
     }else if( 'google' === type){
      doGoogleLogin();
     }else{
      doLogin(this.state.username, this.state.password)
       .then(data =>{
        this.setState({isError:false, 
         message:data.message,
         redirectToReferrer: true});
       })
       .catch(error =>{
        this.setState({isError:true, message:error.message});
       });
     }    
    }
    onChange = (field , value)=>{
     this.setState({[field]:value});
    }

    cancelUserSignup=()=>{    
     this.setState({isSignUp:false});
    }
    onUserSignup=()=>{
     this.setState({isSignUp:true});
    }
    onForgotPassword=()=>{
     this.setState({forgotPassword:true});
    }
    cancelForgotPassword=()=>{
     this.setState({forgotPassword:false});
    }

    render(){ 

     if(this.state.isSignUp){
      return <UserSignup back={this.cancelUserSignup}/>;
     }

     if(this.state.forgotPassword){
      return <ForgotPassword back={this.cancelForgotPassword}/>;
     }
     
     let { from } = this.props.location.state || { from: { pathname: "/" } };
     let { redirectToReferrer } = this.state;
    
     if (redirectToReferrer) return <Redirect to={from.pathname} />;

     return (<div className="container login-contaier">
      <div className="row justify-content-center">
       <div className="text-center">      
        <span>USER LOGIN FROM</span>
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
      <div className="row justify-content-center">
       <form className="pl-2">
        <div className="form-group d-flex">
         <div className="mr-2">
          <label htmlFor="usernameId" className="col-form-label">Username: </label>
         </div>      
         <div>
          <input id="usernameId" 
           name="username" 
           className="form-control"
           value={this.state.username} 
           onChange={(e) =>this.onChange('username', e.target.value)}
           placeholder="Enter username" /> 
         </div>     
        </div>
        <div className="form-group d-flex">
         <div className="mr-2">
          <label htmlFor="passworsId" className="col-form-label">Password: </label>
         </div>      
         <div className="mr-2">
          <input ref={this.inputElement} type="password" autoComplete="off" id="passwordId" 
           name="password" className="form-control"
           value={this.state.password}
           onChange={(e) =>this.onChange('password', e.target.value,e)}
           placeholder="Enter password"
          /> 
         </div>
        </div>
        <div className="form-group d-flex">  
         <div className="text-center flex-grow-1 mt-2">
          <button type="button" className="btn btn-primary forgot-btn " onClick={this.onForgotPassword}>Forgot Password?</button>
          <button type="button" className="btn btn-primary login-btn ml-2" onClick={this.onLogin}>Login</button>
         
         </div>   
        </div>
        <div className="not-registred-row"> 
        Not registred yet? <button type="button" className="btn btn-primary signup-btn" onClick={this.onUserSignup}>SignUp</button> 
         
        </div>
        <div className=" technical-issue-row "> 
        For any issue in login <Link className="ml-2" to="/contact-us"> Conatct Us</Link>
        </div>
        {/* <div className="row">           
         <div className="text-center flex-grow-1">        
          <div className="google-login-btn" onClick={()=>this.onLogin('google')}>
           <img src="/static/images/google_assets_login.png" className="google-img" alt="google-icon"></img>
          Continue with Google
          </div>
          <div className="facebook-login-btn" onClick={() => this.onLogin('facebook')}>
           <img src="/static/images/fb_assets_login.png" className="facebook-img" alt="fb-icon"></img>
           Continue with Facebook1
          </div>
         </div>
        </div> */}
       </form> 
      </div>              
     </div>);
    }
}