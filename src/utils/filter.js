import * as _ from 'lodash';
/* 
This unti method will apply filters on items and will return list of filtered
items.
*/
export let getFilteredItems=(items , filters)=>{
 let filteredItems = items; 
 _.forEach(filters, (filter)=>{
  filteredItems = _.filter(filteredItems,(item)=>{
   if(typeof( filter.value) === 'number' || typeof( item[filter.name]) === 'number'){
    return _compareNumber(filter.value,item[filter.name]);
   }
   return (
    (filter.value === null) 
        ||(filter.value === '' ) 
        || item[filter.name] === null
        || (_.toLower(item[filter.name]).indexOf(_.toLower(filter.value))) > -1);
  });
 });
 return filteredItems;
};



let _compareNumber=(value1,value2)=>{
 try{
  return (value1 === '' || value1 === null ||
                (Number(value2) === Number(value1)));

 }catch(error){
  return true;     
 }

};