import React from 'react';
import * as _ from 'lodash';
import {saveUser} from '../../../services/user-service';
import {getUserById} from '../../../services/user-service';
import {getRoles} from '../../../services/ref-data/role-service';

import './style.css';

let USER_ROLES = [];

export default class UserEditorComponent extends React.Component{

  state = {
   isError:false,
   message:'',
   inProgress:false,
   user:{
    roles:[],
    firstName:'',
    middleName:'',
    lastName:'',
    contact:[{}],
    address:[{}],
   },
   confirmPassword:'',
   selectedRoleIds:[],
   roles:[],
  };

  componentWillMount = ()=>{

   getRoles()
    .then(roleData =>{
     if(this.props.userId){
      getUserById(this.props.userId)
       .then(data =>{
        let selectedRoleIds =[];
        if(Array.isArray(data.user.roles)){
         data.user.roles.forEach(role =>{
          selectedRoleIds.push(role.id);
         });
        }
        this.setState({roles:roleData.roles,
         selectedRoleIds:selectedRoleIds,
         user:data.user,
         confirmPassword:data.user.password});
       })
       .catch(data=>{
        this.setState({isError:true,message:data.message});
       });
     }else{
      getUserById(0);
      this.setState({roles:roleData.roles});
     }
     
    })
    .catch(error =>{
     this.setState({isError:true,message:error.message});
    });

   getRoles()
    .then(data =>{
     this.setState({roles:data.roles});
    })
    .catch(error =>{
     this.setState({isError:true,message:error.message});
    });
  }

  onSave=()=>{
   window.scroll(0,0);
   if(this.state.user.password && this.state.user.password !== this.state.confirmPassword ){    
    this.setState({isError:true, message:'Password and confirm password not matching!'});
    return;
   }
   this.setState({isError:false, message:'Saving user...'});
   saveUser(this.state.user)
    .then((data)=>{ 
     this.props.history.goBack();
    })
    .catch((data)=>{    
     this.setState({isError:true,message:data.message});
    });
  }

  handleBack = ()=>{   
   this.props.history.goBack();
  }

  onRoleChange = (e )=>{
   let selectedRoles = this.state.user.roles;    
   if(e.target.checked){
    let role = _.find(this.state.roles, role=> Number(role.id) === Number(e.target.value));
    if(Array.isArray(selectedRoles)){
     selectedRoles.push(role);
    }else{
     selectedRoles=[];
     selectedRoles.push(role);
    }
    this.setState({user:{...this.state.user,roles:selectedRoles}});
   }else{
    _.remove(selectedRoles, role=> Number(role.id) === Number(e.target.value));
    this.setState({user:{...this.state.user,roles:selectedRoles}});
   }   
  }

  onChange=(fieldName,fieldValue) =>{
   this.setState({user:{...this.state.user,[fieldName]:fieldValue}});
  }
  onContactChange =(field,value)=>{
   let contact=this.state.user.contact[0];
   let newContact=[];
   newContact.push({...contact,[field]:value});
   this.setState({user:{...this.state.user,contact:newContact}});
  }

  onAddressChange =(field,value)=>{
   let address=this.state.user.address[0];
   let newAddress=[];
   newAddress.push({...address,[field]:value});
   this.setState({user:{...this.state.user,address:newAddress}});
  }


  onConfirmPasswordChange = (value)=>{
   this.setState({confirmPassword:value});
  }
  render (){
   let {user} = this.state;
   let UserRoleOptionsHtml = '';
   if(Array.isArray(this.state.roles)){
    UserRoleOptionsHtml = this.state.roles.map((role,index)=>{
     let checked = false;
     let i = _.findIndex(user.roles, r=> Number(r.id) === Number(role.id));
     if( i > -1){
      checked = true;
     }

     return (
      <span key={index} className="role-item">
       <input className="form-check-input" type="checkbox" 
        value={role.id}
        checked={checked} 
        onChange = {(e) =>this.onRoleChange(e)}
        id={"role_"+index} />
       <label className="form-check-label" htmlFor={"role_"+index} >
        {role.name}
       </label>
      </span>
     );
    });
   }
   
   return (
    <div className="container-fluid user-editor-container">
     <div className="row heading-row">     
      <button className="btn btn-primary" onClick={this.handleBack}>
      Back
      </button>       
      <div className="col text-center pt-2">
       User Editor
      </div>     
     </div>  
     <hr className="row divider" />
     <div className="row justify-content-center">
      <div className="text-center">      
       {this.state.message?
        <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
         {this.state.message}       
        </div>:''}
      </div>
     </div>
     <div className="row justify-content-center editor-container">     
      <form className="editor-form" autoComplete="off">
       <div className="form-row editor-row">
        <div className="form-group editor-row-col">
         <div className="role-row">
          {UserRoleOptionsHtml}
         
         </div> 
        </div>
       </div>
       <div className="form-row editor-row">
        
        <div className="form-group">
         <label htmlFor="firstNameId">First Name:</label>
         <input id="firstNameId" className="form-control"
          name="firstName"
          value={user.firstName?user.firstName:''}
          onChange={(e)=>this.onChange('firstName',e.target.value)}
         ></input>  
        </div>
        <div className="form-group editor-row-col">      
         <label htmlFor="middleNameId">Middle Name:</label>
         <input id="middleNameId" className="form-control"
          name="middleName"
          value={user.middleName?user.middleName:''}
          onChange={(e)=>this.onChange('middleName',e.target.value)}
         ></input>
        </div>
        <div className="form-group editor-row-col"> 
         <label htmlFor="lastNameId">Last Name:</label>
         <input id="lastNameId" className="form-control"
          name="lastName"
          value={user.lastName?user.lastName:''}
          onChange={(e)=>this.onChange('lastName',e.target.value)}
         ></input>
        </div>
       </div>  

       <div className="form-row editor-row">
        <div className="form-group"> 
         <label htmlFor="lastNameId">Username:</label>
         <input id="usernameId" className="form-control"
          name="username"
          value={user.username?user.username:''}
          onChange={(e)=>this.onChange('username',e.target.value)}
         ></input>
        </div>        
       </div>
       <div className="form-row editor-row">
        <div className="form-group ">
         <div className="form-row">
          <label htmlFor="mobileId">Contact Number: </label>
          <div className="form-check">  
           <input className="form-check-input" type="checkbox" 
            value={(user && Array.isArray(user.contact) && user.contact[0] && user.contact[0].mobileVerified)?user.contact[0].mobileVerified:false} 
            checked={(user && Array.isArray(user.contact) && user.contact[0] && user.contact[0].mobileVerified)?user.contact[0].mobileVerified:false} 
            id="mobileVerifiedId" 
            onChange={(e)=>this.onContactChange('mobileVerified',e.target.checked)}
           /> 
           <label className="form-check-label" htmlFor="mobileVerifiedId">
           Verified?
           </label>
          </div> 
         </div>
         <input id="mobileId" className="form-control"
          name="mobile"
          value={(user && Array.isArray(user.contact) && user.contact[0] && user.contact[0].mobile)?user.contact[0].mobile:''}
          onChange={(e)=>this.onContactChange('mobile',e.target.value)}
         ></input>
        </div>
        <div className="form-group flex-grow-1 editor-row-col">
         <div className="form-row">
          <label htmlFor="mobileId">Email: </label>
          <div className="form-check">  
           <input className="form-check-input" type="checkbox" 
            value={(user && Array.isArray(user.contact) && user.contact[0] && user.contact[0].emailVerified)?user.contact[0].emailVerified:false} 
            checked={(user && Array.isArray(user.contact) && user.contact[0] && user.contact[0].emailVerified)?user.contact[0].emailVerified:false} 
            id="emailVerifiedId" 
            onChange={(e)=>this.onContactChange('emailVerified',e.target.checked)}
           /> 
           <label className="form-check-label" htmlFor="emailVerifiedId">
           Verified?
           </label>
          </div> 
         </div>
         <input type="email" id="emailId" className="form-control"
          name="email"
          value={(user && Array.isArray(user.contact) && user.contact[0] && user.contact[0].email)?user.contact[0].email:''}
          onChange={(e)=>this.onContactChange('email',e.target.value)}
         ></input>
         <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
       </div>
       <div className="form-row editor-row">
        <div className="form-group flex-grow-1 ">
         <label htmlFor="addressNameId">Address:</label>
         <input id="addressNameId" className="form-control"
          name="name"
          value={(user && Array.isArray(user.address) && user.address[0] && user.address[0].name)?user.address[0].name:''}
          onChange={(e)=>this.onAddressChange('name',e.target.value)}
         ></input>
        </div>
       </div>
       
       <div className="form-row editor-row">
        <div className="form-group ">
         <label htmlFor="cityId">City:</label>
         <input id="cityId" className="form-control"
          name="city"
          value={(user && Array.isArray(user.address) && user.address[0] && user.address[0].city)?user.address[0].city:''}
          onChange={(e)=>this.onAddressChange('city',e.target.value)}
         ></input>
        </div>
        <div className="form-group editor-row-col">
         <label htmlFor="stateId" >State:</label>
         <input id="stateId" className="form-control"
          name="user.address.state"
          value={(user && Array.isArray(user.address) && user.address[0] && user.address[0].state)?user.address[0].state:''}
          onChange={(e)=>this.onAddressChange('state',e.target.value)}
         ></input>
        </div>
        <div className="form-group editor-row-col">
         <label htmlFor="zipCodeId" >Zip Code:</label>
         <input id="zipCodeId" className="form-control"
          name="zipCode"
          value={(user && Array.isArray(user.address) && user.address[0] && user.address[0].zipCode)?user.address[0].zipCode:''}
          onChange={(e)=>this.onAddressChange('zipCode',e.target.value)}
         ></input>
        </div>
       </div>

       <div className="form-row editor-row">
        <div className="form-group ">         
         <div className="form-check">  
          <input className="form-check-input" type="checkbox" 
           value={user.accountNonExpired?user.accountNonExpired:''} 
           checked={user.accountNonExpired?user.accountNonExpired:''} 
           id="accountNonExpiredId" 
           onChange={(e)=>this.onChange('accountNonExpired',e.target.checked)}
          /> 
          <label className="form-check-label" htmlFor="accountNonExpiredId">
           Is Account is Non Expired?
          </label>
         </div>
         <div className="form-check">  
          <input className="form-check-input" type="checkbox" 
           value={user.accountNonLocked?user.accountNonLocked:''} 
           checked={user.accountNonLocked?user.accountNonLocked:''} 
           id="accountNonLockedId" 
           onChange={(e)=>this.onChange('accountNonLocked',e.target.checked)}/> 
          <label className="form-check-label" htmlFor="accountNonLockedId">
           Is Account Non Locked?
          </label>
         </div>

         <div className="form-check">  
          <input className="form-check-input" type="checkbox" 
           value={user.credentialsNonExpired?user.credentialsNonExpired:''} 
           checked={user.credentialsNonExpired?user.credentialsNonExpired:''} 
           id="credentialsNonExpiredId"
           onChange={(e)=>this.onChange('credentialsNonExpired',e.target.checked)}
          /> 
          <label className="form-check-label" htmlFor="credentialsNonExpiredId">
           Is Credentials Non Expired?
          </label>
         </div>
         <div className="form-check">  
          <input className="form-check-input" type="checkbox" 
           value={user.enabled?user.enabled:''} 
           checked={user.enabled?user.enabled:''}
           id="enabledId" 
           onChange={(e)=>this.onChange('enabled',e.target.checked)}
          /> 
          <label className="form-check-label" htmlFor="enabledId">
           Is Account Enabled?
          </label>
         </div>        
        </div>
       </div>


       <div className="form-row justify-content-center">        
        <button type="button" 
         onClick={this.onSave}
         className="btn btn-primary">Save</button>
       </div>         
      </form>
     </div>
     <div className="row back-btn ">
      <button type="button" className="btn btn-primary" onClick={this.handleBack}>
      Back
      </button>
     </div>

    </div>
   );
  };
}