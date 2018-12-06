import React from 'react';
import {Link} from 'react-router-dom';
import * as $ from 'jquery';
import '../../../../node_modules/skitter-slider/dist/skitter.css';
import 'jquery.easing';
import 'skitter-slider';
import {skitterOption} from './skitter-config';
import './carousel.css';

export default class CarouselComponent  extends React.Component{

  componentDidMount = ()=>{
   $('.skitter-large').skitter(skitterOption);
  }

  render(){
   return <div className="carousel-container">  
    <div className="skitter skitter-large " >
     <ul>       
      <li> <Link to="/">
       <img src="/static/images/carousel/slider-06.jpg" className="swapBlocks" />
      </Link>
      <div className="label_text">
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit eos nihil corrupti inventore id culpa repellat molestiae quam at molestias. 
        <a href="#" className="btn btn-small btn-yellow">See more</a>
       </p></div>
      </li>
      <li>
       <Link to="/">
        <img src="/static/images/carousel/slider-07.jpg" className="swapBarsBack" />
       </Link>
       <div className="label_text">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit eos nihil corrupti inventore id culpa repellat molestiae quam at molestias. 
         <a href="#" className="btn btn-small btn-yellow">See more</a>
        </p>
       </div>
      </li>
      <li>
       <Link to="/">
        <img src="/static/images/carousel/slider-08.jpg" className="swapBarsBack" />
       </Link>
       <div className="label_text">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit eos nihil corrupti inventore id culpa repellat molestiae quam at molestias. 
         <a href="#" className="btn btn-primary">See more
         </a></p></div>
      </li>
     </ul>
    </div>
   </div> ;
  }
}