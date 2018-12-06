import React from 'react';
import {Switch,Route,withRouter,Redirect} from 'react-router-dom';
import {doLogout} from '../../../services/login';
import Home from '../home/container';

class LogoutContainer extends React.Component{
  state={
   isError:false,
   message:'Loging out...',
   logout:false
  };
  componentDidMount=()=>{   
   doLogout().then(data =>{
    this.setState({logout:true});
   }).catch(error =>{
    this.setState({message:'Error while loging out...'});
   });
  }
  render(){
   if(!this.state.logout){
    return <div>{this.state.message}</div>;
   }
   return (
    <Switch>
     <Route path={`${this.props.match.url}`}      
      render ={()=>{
       return <Redirect to="/"/>;}
      }
     />;
    </Switch>
   );
  }
}
let Logout = withRouter(LogoutContainer);
export default Logout;

