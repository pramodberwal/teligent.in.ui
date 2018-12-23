import React from 'react';
import {Value} from 'slate';
import {getChoiceName} from '../../../services/questions/question-service';
import RichTextEditor from '../rich-text-editor/container';
import {addQuestionToTest,removeQuestionFromTest} from '../../../services/exam-test';

export let TestQuestionTableHeader =(props)=>{
 return (
  <tr>
   <th>ID</th>   
   <th>Description</th>   
   <th>Action</th>
  </tr>
 );
};

export class TestQuestionTableBodyRow extends React.Component{
 state={
  isError:false,
  message:'',
  added:this.props.added,

 }
 
  onQuestionRemove = (Id , id)=>{    
   removeQuestionFromTest(Id,id)
    .then(data =>{
     this.setState({isError:false,added:!this.state.added});
     this.props.onUpdateCounter(this.props.questionCounter-1);
    })
    .catch(error =>{
     this.setState({isError:true,message:error.message});
    });   
  }

  onQuestionAdd = (testId , id)=>{
   addQuestionToTest(testId,id)
    .then(data =>{
     this.setState({isError:false,added:!this.state.added});
     this.props.onUpdateCounter(this.props.questionCounter+1);
    })
    .catch(error =>{
     this.setState({isError:true,message:error.message});
    });   
  }

  render (){
   let {question} = this.props;
   return (<tr>
    <th><span className="options-toggler"
    >{question.id}</span></th>
    <td className="text-style" >
     <RichTextEditor      
      id={question.id} 
      readOnly={true} 
      value={Value.fromJSON(JSON.parse(question.desc))}/>
     <div>
      <div className="container">
       <div className="row text-style">
        <div className="mr-1">
           A:
        </div>
        <RichTextEditor 
         id={this.props.question.id} 
         readOnly={true} 
         value={Value.fromJSON(JSON.parse(this.props.question.optionA))}/>
       </div>
       <div className="row text-style">
        <div className="mr-1">
           B:
        </div>
        <RichTextEditor 
         id={this.props.question.id} 
         readOnly={true} 
         value={Value.fromJSON(JSON.parse(this.props.question.optionB))}/>
       </div>   
       <div className="row text-style">
        <div className="mr-1">
           C:
        </div>
        <RichTextEditor 
         id={this.props.question.id} 
         readOnly={true} 
         value={Value.fromJSON(JSON.parse(this.props.question.optionC))}/>
       </div>   
       <div className="row text-style">
        <div className="mr-1">
           D:
        </div>
        <RichTextEditor 
         id={this.props.question.id} 
         readOnly={true} 
         value={Value.fromJSON(JSON.parse(this.props.question.optionD))}/>
       </div>
       <div className="row text-style">
        <div className="container">
         <div className="row"> 
          <div className="mr-4 text-style ">Type : {question.typeName?question.typeName:' '} </div>            
          <div className="mr-4 text-style ">Subject :    {question.subjectName?question.subjectName:' '}</div>
          <div className="mr-4 text-style">Chapter :    {question.subjectName?question.chapterName:' '}</div>       
          <div className="mr-2 text-style">Complexity Level : {question.complexityLevel?question.complexityLevel:' '}</div>
         </div>
        </div>
       </div>            
      </div>
     </div>
    </td>
    <td>
     { this.state.added ? <button 
      className="btn btn-danger"
      onClick={()=>this.onQuestionRemove(this.props.testId,question.id)}>Remove</button>:<button className="btn btn-primary"
      onClick={()=>this.onQuestionAdd(this.props.testId,question.id)}>Add</button> }           
    </td>
   </tr>
   );
  }
}