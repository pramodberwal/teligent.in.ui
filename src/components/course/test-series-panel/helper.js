import {getTestSeriseById} from '../../../services/test-series';

export let loadData=(props,component)=>{
 if(props.testSeriesId){
  getTestSeriseById(props.testSeriesId)
   .then(data => {
    component.setState({testSeries:data.testSeries});
   })
   .catch(data=>{
    component.setState({testSeries:''});
   });
 }
};
