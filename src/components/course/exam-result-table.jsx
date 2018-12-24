import React from 'react';

let TableHeadingRow = ()=>{
 return <tr>
  <th  scope="col">
   <span className="text-style">Section</span>
  </th>
  <th  scope="col">
   <span className="text-style">Correct Response</span>
  </th>
  <th  scope="col">
   <span className="text-style">+ive Marks</span>
  </th>
  <th  scope="col">
   <span className="text-style">InCorrect Response</span>
  </th>
  <th  scope="col">
   <span className="text-style">-ive Marks</span>
  </th>
  <th  scope="col">
   <span className="text-style">No Response</span>
  </th>
  <th  scope="col">
   <span className="text-style">Marks Obtained</span>
  </th>
 </tr>;
};

let TableBodyRow = (props)=>{
 let attemptScore = props.attemptScore;

 if(attemptScore['totals']){
  return <TotalsRow totals = {attemptScore['totals']}/>;
 }
 return <tr className="text-center">
  <th scope="row">
   <span className="text-style">{attemptScore.subjectName}</span>
  </th>
  <th >
   <span className="text-style">{attemptScore.correctQuestionCount}</span>
  </th>
  <td>
   <span className="text-style">{attemptScore.correctQuestionCount * attemptScore.correctAnsMarks}</span>
  </td>
  <th >
   <span className="text-style">{attemptScore.inCorrectQuestionCount}</span>
  </th>
  <td>
   <span className="text-style">{attemptScore.inCorrectQuestionCount * attemptScore.wrongAnsMarks}</span>
  </td>
  <td>
   <span className="text-style">{attemptScore.unAttemptedQuestionCount}</span>
  </td>
  <td>
   <span className="text-style">{attemptScore.totalMarksObtained}</span>
  </td>
 </tr>;
};

let TotalsRow = (props)=>{
 let totals = props.totals;
 return <tr className="text-center">
  <th scope="row">
   <span className="text-style">Totals</span>
  </th>
  <th >
   <span className="text-style">{totals.correctQuestionCount}</span>
  </th>
  <td>
   <span className="text-style">{totals.positiveMarks}</span>
  </td>
  <th >
   <span className="text-style">{totals.inCorrectQuestionCount}</span>
  </th>
  <td>
   <span className="text-style">{totals.negativeMarks}</span>
  </td>
  <td>
   <span className="text-style">{totals.unAttemptedQuestionCount}</span>
  </td>
  <td>
   <span className="text-style">{totals.MarksObtained}</span>
  </td>
 </tr>;
};

export default class ExamResultTable extends React.Component{

 render(){
  return <div className="table-responsive">
   <table className="table table-hover table-bordered">
    <thead>
     <TableHeadingRow />
    </thead>
    <tbody>
     {this.props.tests && Array.isArray(this.props.tests)?
      this.props.tests.map((test, index)=>{
       return <TableBodyRow key={index} attemptScore={this.props.attemptScore[test.id]}/>;
      })    
      :<tr>
       <td>No Attempts</td>
      </tr>}
     {this.props.attemptScore['totals']?
      <TotalsRow totals={this.props.attemptScore['totals']}/>:<tr>
       <td>No Attempts</td>
      </tr>}
    </tbody>
   </table>
  </div>;

 }
}