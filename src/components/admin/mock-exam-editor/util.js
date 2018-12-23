import * as _ from 'lodash';
import {COMPLEXITY_LEVELS} from '../../../constants/system-constant';


export let calculateTestDuration = (examDuration, testCount)=>{
 if( !Number.isNaN( Number.parseInt(examDuration)) 
        && !Number.isNaN( Number.parseInt(testCount) )
        && Number.parseInt(testCount) > 0 ){
  return Math.floor(examDuration / testCount);
 }else{
  return examDuration;
 }
};

export let getComplexityLevel = (id)=>{
 let level = _.find(COMPLEXITY_LEVELS, c => Number(c.id) === Number(id));
 return level? level.name :'N/A';
};