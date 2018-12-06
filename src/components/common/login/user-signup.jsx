import React from 'react';
import {doUserSignup} from '../../../services/login';


export class UserSignup extends React.Component{
    state ={
     isError:false,
     message:'',
     user:{
      contact:[],
     },
     confirmPassword:''
    }
    

    onUserDetailChange = (filedName,fieldValue)=>{
     this.setState({user:{...this.state.user,[filedName]:fieldValue}});
    }

    onConfirmPasswordChange = (value)=>{
     this.setState({confirmPassword:value});
    }
    onContactChange =(field,value)=>{
     let contact=this.state.user.contact[0];
     let newContact=[];
     newContact.push({...contact,[field]:value});
     this.setState({user:{...this.state.user,contact:newContact}});
    }

    onRegister = ()=>{
     window.scroll(0,0);
     if( !this.state.user.password ){    
      this.setState({isError:true, message:'Password is mandatory!'});
      return;
     }

     if(this.state.user.password.length < 8 || this.state.user.password.length > 255 ){
      this.setState({isError:true, message:'Password minimum length is 8 and max length is 255!'});
      return;
     }

     if(this.state.user.password && this.state.user.password !== this.state.confirmPassword ){    
      this.setState({isError:true, message:'Password and confirm password not matching!'});
      return;
     }
     if( !this.state.user.username ){    
      this.setState({isError:true, message:'Username is mandatory!'});
      return;
     }
     if(!this.validateEmail(this.state.user.username)){
      return;
     }
     

     this.setState({isError:false, message:'Saving user...'});

     doUserSignup(this.state.user)
      .then(data =>{
       this.setState({isError:false,message:'User registred successfully!'});
       this.props.back();
      })
      .catch(resp=>{
       this.setState({isError:true,message:(resp.message)});
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
     return <div className="container user-signup-container">
      <div className=" row signup-heading-row">
       <div className="back-btn">
        <button type="button" className="btn btn-primary" onClick={this.props.back}>Login</button> 
       </div>
       <div className="flex-grow-1 text-center">
        <span className="heading-text">User registration form</span> 
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
      <div className=" row signup-detail-row justify-content-center">
       <form>
        <div className="form-row editor-row">
        
         <div className="form-group mr-2">
          <label htmlFor="firstNameId">First Name:</label>
          <input id="firstNameId" className="form-control"
           name="firstName"
           value={this.state.user.firstName?this.state.user.firstName:''}
           onChange={(e)=>this.onUserDetailChange('firstName',e.target.value)}
          ></input>  
         </div>
         <div className="form-group editor-row-col mr-2">      
          <label htmlFor="middleNameId">Middle Name:</label>
          <input id="middleNameId" className="form-control"
           name="middleName"
           value={this.state.user.middleName?this.state.user.middleName:''}
           onChange={(e)=>this.onUserDetailChange('middleName',e.target.value)}
          ></input>
         </div>
         <div className="form-group editor-row-col"> 
          <label htmlFor="lastNameId">Last Name:</label>
          <input id="lastNameId" className="form-control"
           name="lastName"
           value={this.state.user.lastName?this.state.user.lastName:''}
           onChange={(e)=>this.onUserDetailChange('lastName',e.target.value)}
          ></input>
         </div>
        </div>          
        <div className="form-row form-group">            
         <div className="flex-grow-1  mr-2">
          <label htmlFor="firstNameId">Email Id:</label>
          <input id="usernameId" 
           name="username" 
           className="form-control"
           value={this.state.user.username?this.state.user.username:''} 
           onChange={(e) =>this.onUserDetailChange('username', e.target.value)}
           placeholder="please enter valid e-mail" /> 
          <small id="emailHelp" className="form-text text-muted">We'll never share your email and contact number with anyone else.</small>
         </div>  
         <div className="form-group">            
          <div className="flex-grow-1">
           <label htmlFor="firstNameId">Contact Number:</label>
           <input id="mobileId" className="form-control"
            name="mobile"
            value={(this.state.user && Array.isArray(this.state.user.contact) && this.state.user.contact[0] && this.state.user.contact[0].mobile)?this.state.user.contact[0].mobile:''}
            onChange={(e)=>this.onContactChange('mobile',e.target.value)}
           ></input>
          </div>     
         </div>   
        </div>
        <div className="form-row editor-row">        
         <div className="form-group editor-row-col mr-2"> 
          <label htmlFor="passwordId">Password:</label>
          <input type="password" autoComplete="off" id="passwordId" className="form-control"
           name="password"
           value={this.state.user.password?this.state.user.password:''}
           onChange={(e)=>this.onUserDetailChange('password',e.target.value)}
          ></input>
         </div>
         <div className="form-group editor-row-col "> 
          <label htmlFor="confirmPasswordId">Confirm Password:</label>
          <input type="text" id="confirmPasswordId" autoComplete="off" className="form-control"
           name="confirmPassword"
           value={this.state.confirmPassword}
           onChange={(e)=>this.onConfirmPasswordChange(e.target.value)}
          ></input>
         </div>
        </div> 
        <div className="form-row justify-content-center">        
         <button type="button" 
          onClick={this.onRegister}
          className="btn btn-primary">Register</button>
        </div>         
       </form>
      </div>
     
     </div>;
    }
}