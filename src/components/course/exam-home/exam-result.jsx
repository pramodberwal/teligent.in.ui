import React from 'react';

export default class ExamResultComponent extends React.Component{
   state={
    isError:false,
    message:'Please wait while we are validating you answers...',
    examAttempt:'',
    testAttempts:'',
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

    this.setState({isError:false, message:'',
     examAttempt:examAttempt,
     testAttempts:testAttempts,
     exam:exam
    });
   }


   render(){
    let exam = this.state.exam;
    let tests = exam.tests;
    let testResultBlock =''; 
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
         <span  className="text-style">23/100</span>
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
      {testResultBlock}
     </div>

    </div>;
   }
}