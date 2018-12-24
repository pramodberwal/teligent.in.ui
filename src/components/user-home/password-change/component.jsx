import React from 'react';
import './style.css';
import {passwordChange,getCsrfToken} from '../../../services/user-service';


export default class PasswordChangeComponent extends React.Component{

    state={
     isError:false,
     message:'Please wait while loading data...',
     currentPassword:'',
     newPassword:'',
     confirmPassword:'',
     username:'',
    }
    componentDidMount = ()=>{
     getCsrfToken();
     this.setState({message:'', isError:false});
    }

    onChange = (field, value)=>{
     let newState = this.state;
     newState[field] = value;
     this.setState({state:newState});
    }
    onChangePassword = ()=>{

     if(!this.state.newPassword || !this.state.currentPassword ){
      this.setState({isError:true, message:'Please provide current password and new password!'});
      return;
     }

     if(this.state.confirmPassword !== this.state.newPassword){
      this.setState({isError:true, message:'New password and confirm password not same!'});
      return;
     }
     passwordChange(this.state.currentPassword, this.state.newPassword)
      .then(data =>{
       let newState = this.state.state;
       newState['currentPassword']='';
       newState['newPassword']='';
       newState['confirmPassword']='';
       this.setState({isError:false, message:'Password changed successfully!'});
      })
      .catch(error =>{
       this.setState({isError:true, message:'Error while changing password!'});
      });
    }

    render(){
     return <div className="container password-change-container">
      <div className="row justify-content-center">
       <div className="heading-col">
        <span className="text-style">
        Change Your Password</span>
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
       <form>
        <div className="form-row change-password-row">
         <div className="form-group mr-2">
          <label htmlFor="currentPasswordId">Current Password</label>
          <input id="currentPasswordId" className="form-control" 
           type="password"
           value={this.state.currentPassword}
           name='currentPassword'
           onChange={(e) => this.onChange('currentPassword', e.target.value)}
          />
         </div>

         <div className="form-group ml-2 mr-2">
          <label htmlFor="newPasswordId">New Password</label>
          <input id="newPasswordId" className="form-control" 
           type="password"
           value={this.state.newPassword}
           name='newPassword'
           onChange={(e) => this.onChange('newPassword', e.target.value)}
          />
         </div>

         <div className="form-group ml-2">
          <label htmlFor="confirmPasswordId">Confirm Password</label>
          <input id="confirmPasswordId" className="form-control" 
           value={this.state.confirmPassword}
           name='confirmPassword'
           onChange={(e) => this.onChange('confirmPassword', e.target.value)}
          />
         </div>

         <div className="form-group ml-2">
          <button className="btn btn-primary" type="button"
           onClick={this.onChangePassword}
          >Change</button>
         </div>

        </div>
       </form>
      </div>
     </div>;
    }
    
}