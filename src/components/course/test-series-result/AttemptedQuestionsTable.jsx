import React from 'react';

let TableRow = (props)=>{
 return <tr>
  <td>props.question.id</td>
  <td>props.question.desc</td>
  <td>explanation</td>
 </tr>;
};

export default class AttemptedQuestionsTable extends React.Component{
 render(){
  return <table>
   <thead>
    <th>#ID</th>
    <th>Description</th>
    <th>Explanation</th>
   </thead>
   <tbody>
    <TableRow question={{id:'1',desc:'desc',isCorrect:true}}/>
   </tbody>
  </table>;
 }
}