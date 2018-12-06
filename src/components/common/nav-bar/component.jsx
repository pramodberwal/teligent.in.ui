import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import * as $ from 'jquery';
import {NavBarBuilder} from './navigation-builder';
import * as autherization from '../../../utils/autherization';
import './style.css';
/* This is app top header componet. */
export default class NavBarComponent extends React.Component{
   
    state={
     isMobileMenuOpen:false
    }
    loginBtnInit = (e)=>{     
     if(e){
     }
    }
    navbarScroller =  ()=> {
     var windowTopPosition = window.pageYOffset;
     var elementHeight ='';// seoHeaderContainer.offsetHeight;
     if (windowTopPosition > elementHeight) {
     /// seoHeaderContainer.classList.add('sticky');
     } else {
      ///seoHeaderContainer.classList.remove('sticky');
     }
    }
    mediaQueryMatches = ()=>{
     return {
      click:()=>{              
       document.addEventListener('click', function (event) {
        var target = event.target;
       }, false);
      }
     };
    }

    mobileBurgerIconWatcher=(matchMediaScroll) =>{
       
     let navbarContainer = $(".nav-bar-container");
     if (matchMediaScroll && matchMediaScroll.matches) {
      navbarContainer.addClass('sticky');
     } else {
      navbarContainer.removeClass('sticky');
     // navbarScroller();
     // checkCookie();
     }
    }

    tabletBurgerIconWatcher=(matchMediaScroll) =>{
     let navbarContainer = $(".nav-bar-container");
     if (matchMediaScroll && matchMediaScroll.matches) {
     // navbarContainer.addClass('sticky');
     } else {
     // navbarContainer.removeClass('sticky');
      // navbarScroller();
      // checkCookie();
     }
    }
    componentDidMount =()=>{
     let scrollTimeSetter='';
     window.addEventListener('scroll', function (event) {
      var windowTopPosition = window.pageYOffset;
      let navbarContainer = $(".nav-bar-container");
      if (navbarContainer && windowTopPosition > 0) {
       navbarContainer.addClass('sticky');
      }else{
       navbarContainer.removeClass('sticky');
      }
      if (mobileBreakPointMatcher && !mobileBreakPointMatcher.matches) {
       if (!!scrollTimeSetter) {
        window.clearTimeout(scrollTimeSetter);
       };
       scrollTimeSetter = setTimeout( () =>{
       
       }, 0);
      }
     }, false);
     var mobileBreakPointMatcher = window.matchMedia('(max-width: 600px) and (orientation: portrait)');
     var tabletBreakPointMatcher = window.matchMedia('(min-width: 601px ) and (max-width: 1200px)');
     
     mobileBreakPointMatcher.addListener(this.mobileBurgerIconWatcher);
     tabletBreakPointMatcher.addListener(this.tabletBurgerIconWatcher);
    };
    onNavItemClick =()=>
    {
     this.setState({isMobileMenuOpen:!this.state.isMobileMenuOpen});
    }
    render(){ 
     
     return ( 
      <div className="nav-bar-container">
       <nav className="navbar navbar-expand-md navbar-light">
        <div className="left">
         <img src="/static/images/logo.png" className="d-inline-block align-top" alt="Logo" />
        </div>
        <div className="middle">   
         <div className="collapse navbar-collapse justify-content-center">
          {NavBarBuilder(this.props).build()}
         </div>     
        </div>
        <div className="row right justify-content-flex-end" >  
         <div className="container-fluid my-account-login-container">
          {autherization.isUserAuthenticated()?
           <div className="row justify-content-flex-end pr-2">           
            <div className="my-account-col">
             <NavLink to='/my-profile'>
              {autherization.getUserFullName()}
             </NavLink>            
            </div>
            <div className="logout-btn">
             <Link className="logout-link" to="/logout">Logout</Link>
            </div>
           </div>
           :
           <div className="row justify-content-flex-end pr-2">
            <div className="login-btn">
             <Link className="login-link" to="/login">Login</Link>
            </div>
           </div> }
         </div>
         <div className="container-fluid ">  
          <div className="row justify-content-flex-end">
           <div >
            <button  type="button" className="mobile-menu-toggler" 
             onClick={()=>this.onNavItemClick()}>
             <span className="navbar-toggler-icon"></span>
            </button> 
           </div>
           

          </div>
         
         </div> 

        </div>     
       </nav>
       <div 
        className={"justify-content-end mobile-menu-top-container " 
        + (this.state.isMobileMenuOpen?"":" d-none ")}  
        onClick={()=>this.onNavItemClick()} >
        <div className="mobile-menu-items-container text-center " 
         id="navbarSupportedContent">
         {NavBarBuilder(this.props).build()}
        </div>    
       </div> 
      </div>
     );
    }
};
