import * as _ from 'lodash';
const QUESTION_DESC_SIZE=2000;
let validateSize = (value)=>{
 return (_.isString(value) && value.length < QUESTION_DESC_SIZE) ?true:false;
};

let validate;