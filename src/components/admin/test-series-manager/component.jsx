import React from 'react';
import {Link} from 'react-router-dom';
import {deleteTestSeriesId} from '../../../services/test-series';
import {getAllTestSeries} from '../../../services/test-series';
import './style.css';

import {TestSeriesTableHeaderRow,TestSeriesTableBodyRow} from './test-series-table-row';

export default class TestSeriesManagerComponent extends React.Component{
state = {
 isError:false,
 message:'Please wait while loading data...',
 testSeriseList:this.props.testSeriseList
}
componentDidMount =()=>{
 window.scroll(0,0);
 getAllTestSeries().then(data =>{
  this.setState({isError:false,message:'',testSeriseList:data.testSeriesList});
 }).catch(error =>{
  this.setState({isError:true, message:error.message});
 });
}

onDeleteClick = (id)=>{
 deleteTestSeriesId(id)
  .then(data =>{
   this.setState({isError:false, message:'Test series deleted!'});
   this.componentDidMount();
  })
  .catch(error =>{
   this.setState({isError:true, message:'Error while deleting Test series!'});
  });

}
  onDoubleClick = (id)=>{
   this.props.history.push(`${this.props.match.url}/edit-test-series/`+id);
  }
    onDelete = (id)=>{
     deleteTestSeriesId(id).then((data)=>{      
      this.setState({isError:false,message:data.message});
     }).catch(error =>{
      this.setState({isError:true,message:error.message});
     });     
    }
    render(){
     return <div className="container-fluid test-series-manager-container">
      <div className="row heading-row">       
       <div>
        <Link className="btn btn-primary "  
         to={`${this.props.match.url}/add-test-series`}>
      Add New
        </Link>  
       </div>
       <div className="flex-grow-1 text-center">
        Test Series Manager
       </div>
      </div>
      <div className="row test-series-manager-table">
       <table className="table table-hover">
        <thead>
         <TestSeriesTableHeaderRow />
        </thead>
        <tbody>
         {
          Array.isArray(this.state.testSeriseList) && this.state.testSeriseList.length?
           this.state.testSeriseList.map((serise,index)=>{
            return <TestSeriesTableBodyRow key={index} 
             onDoubleClick = {this.onDoubleClick}
             onDeleteClick = {this.onDeleteClick}
             testSeries={serise}/>;
           }):<tr><td>{this.state.message}</td></tr>}       
        </tbody>         
       </table>
      </div>            
     </div>;
    }
}