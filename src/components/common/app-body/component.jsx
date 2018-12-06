import React from 'react';
import CarouselComponent from './carousel';
import './style.css';

export default class AppBodyComponent extends React.Component{
    state={
     isError:false,
     message:'Loading data...',
    }
    componentDidMount = ()=>{
    
    }
    render (){
     return (
      <div className="app-body-container"> 
       <div className="container-fluid">
        <div className="row heading-row">
         <div className="heading-col">
          <span className="heading-text">
              Welcome to the world of Competitions!
          </span>
         </div>
        </div>

       </div>
       <CarouselComponent {...this.props}/>
       
      </div>  
     );
    }
}