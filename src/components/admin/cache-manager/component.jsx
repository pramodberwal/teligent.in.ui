import React from 'react';
import {getAllCaches,clearCache} from '../../../services/ref-data/cache-service';
export default class CacheManagerComponent extends React.Component{
 
    state={
     isError:false,
     message:'',
     caches:'',
     cacheName:'',
    }
 componentDidMount =()=>{
  window.scroll(0,0);
  getAllCaches()
   .then(data =>{
    this.setState({isError:false,caches:data.caches});
   })
   .catch(error =>{
    this.setState({isError:true,message:error.message});
   });
 }

 onChange = (value)=>{
  this.setState({cacheName:value});
 }

 clearCache = ()=>{
  clearCache(this.state.cacheName)
   .then( data =>{
    this.setState({isError:false,message:data.message});
   })
   .catch(error =>{
    this.setState({isError:true,message:error.message});
   });
 }
 
 render(){
  return <div className="container">
   <div className="row heading-row">
    <div>
  Cache Manager
    </div>
    <div className="ml-2">
     <select className="custom-select"
      name="cacheName"
      value={this.state.cacheName}
      onChange={(e)=>this.onChange(e.target.value)}
     >
      <option>Please select</option>
      {Array.isArray(this.state.caches)?
       this.state.caches.map((cache,index)=>{
        return <option key={index} value={cache}>{cache}</option>;
       })
       :''
      }
     </select>

    </div>

    <div>
     <button className="btn btn-primary" onClick={this.clearCache}>Clear Cache</button>
    </div>
   </div>
   <div className="row">
    <div className="justify-content-center">
     <div className="text-center">      
      {this.state.message?
       <div className={"alert "+ (this.state.isError?' alert-danger':'alert-success') }>
        {this.state.message}       
       </div>:''}
     </div>
    
    </div>

   </div>
        
  
   
  </div>;
 }
}