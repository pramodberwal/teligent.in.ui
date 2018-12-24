import React from 'react';
import * as _ from 'lodash';
import ExamResultTable from '../exam-result-table';

export default class ExamResultComponent extends React.Component{
   state={
    isError:false,
    message:'Please wait while we are validating you answers...',
    examAttempt:'',
    testAttempts:'',
    attemptScore:'',
    exam:'',
   }
   componentDidMount = ()=>{
    let exam = this.props.location.state.exam;
    let examAttempt= this.props.location.state.examAttempt;
    let testAttempts = this.props.location.state.testAttempts;
    if(!exam || !examAttempt || !testAttempts){
     this.setState({isError:true,message:'Error while calculating exam result!'});
     return;
    }
    let attemptScore = {}; 
    let totals = {
     correctQuestionCount:0,
     inCorrectQuestionCount:0,
     positiveMarks:0,
     negativeMarks:0,
     unAttemptedQuestionCount:0,
     MarksObtained:0,

    } ;
    _.forEach(testAttempts, attempt =>{
     let correctQuestionCount = 0;
     let inCorrectQuestionCount = 0;
     let test = _.find(exam.tests, test => test.id === attempt.examTestPaperId);
     console.log('Test >', test);
     _.forEach(attempt.attemptAnswers, answer =>{     
      if(answer.isCorrect){
       correctQuestionCount = correctQuestionCount + 1;
      }else{
       inCorrectQuestionCount = inCorrectQuestionCount + 1;
      }
     });
     totals['correctQuestionCount'] += correctQuestionCount;
     totals['inCorrectQuestionCount'] += inCorrectQuestionCount;

     let subjectName = test.name.split('-')[1];
     attemptScore[attempt.examTestPaperId] = {
      subjectName:subjectName,
      wrongAnsMarks:test.wrongAnsMarks,
      correctAnsMarks:test.correctAnsMarks,
      maximumMarks:test.correctAnsMarks * test.questions.length,
      totalMarksObtained:attempt.score,
      correctQuestionCount:correctQuestionCount,
      inCorrectQuestionCount:inCorrectQuestionCount,
      unAttemptedQuestionCount:(test.questions.length - (correctQuestionCount + inCorrectQuestionCount))
     };

     totals['positiveMarks'] += correctQuestionCount * test.correctAnsMarks;
     totals['negativeMarks'] += inCorrectQuestionCount * test.wrongAnsMarks;
     totals['unAttemptedQuestionCount'] += (test.questions.length - (correctQuestionCount + inCorrectQuestionCount)) ;
     totals['MarksObtained'] += attempt.score ;
    });

    attemptScore['totals'] = totals;
    console.log('attemptScore >',attemptScore);

    this.setState({isError:false, message:'',
     examAttempt:examAttempt,
     testAttempts:testAttempts,
     attemptScore:attemptScore,
     exam:exam
    });
   }
   render(){
    let exam = this.state.exam;
    let tests = exam.tests;
    let attemptScore = this.state.attemptScore;
    let testResultBlock =''; 
    console.log('attemptScore >',attemptScore);
    if(tests && Array.isArray(tests)){
     testResultBlock = tests.map((test,index)=>{
      let subjectName = test.name?test.name.split('-')[1]:test.name;
      return <div key={index} className="exam-test-result-block container">  
       <div className="row">
        <div className="mx-auto">
         <span  className="text-style">{subjectName}  </span>
        </div>
       </div>
       <div className="row">
        <div className="mx-auto">
         <span  className="text-style">Marks Obtained:</span>
        </div>
        <div className="mx-auto">
         <span  className="text-style">{attemptScore[test.id].totalMarksObtained}/{attemptScore[test.id].maximumMarks}</span>
        </div>
       </div>
      </div>;
     });
    }

    return <div className="container exam-result-container">
     <div className="row exam-result-heading-row">
      <div className="mx-auto"><span className="text-style"> Exam Result </span></div>
     </div>
     <hr className="divider" />
     <div className="row exam-result-row">
      <ExamResultTable tests={this.state.exam.tests} attemptScore={this.state.attemptScore} {...this.props}/>
     </div>

    </div>;
   }
}