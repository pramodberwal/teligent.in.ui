import React from 'react';
import './style.css';
import DefaultUserHome from './default-user-home';
import PasswordChangeComponent from '../password-change/container';

export default class UserHomeComponent extends React.Component{
    state={
     isError:false,
     message:'Please wait while we are loading data...',
     user:{},
     bodyComponent:DefaultUserHome
    }

    onNavigationItemClicked = (component)=>{
     this.setState({bodyComponent:component});
    }

    render(){
     return <div className="container-fluid user-home-container">
      <div className="row justify-content-center">
       <div className="left-navigation ">      
        <div className="container-fluid">
         <div className="row">
          <div>
           <button className="btn btn-primary"
            type="button"
            onClick={()=>this.onNavigationItemClicked(PasswordChangeComponent)}
           >Change Password</button>
          </div>
         </div>
        </div>
       </div>
       <div className="user-home-body">
        <div className="container-fluid">
         <div className="row justify-content-center">
          <div className="flex-grow-1">
           <this.state.bodyComponent />
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>;
    }
}