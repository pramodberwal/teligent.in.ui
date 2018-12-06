import React from 'react';
import {getAllHandWrittenNotes} from '../../../services/study-material';
import {STUDY_MATRIAL_DOWNLOAD_ENDPOINT} from '../../../constants/system-constant';

export default class HandWrittenNotesComponent extends React.Component{

    state={
     isError:false,
     message:'Please wait while we are loading notes...',
     handWrittenNotes:[],
    }

    componentDidMount = ()=>{
     getAllHandWrittenNotes()
      .then(data =>{
       let handWrittenNotes = data.handWrittenNotes;
       this.setState({handWrittenNotes:handWrittenNotes});
      })
      .catch(error =>{
       this.setState({isError:true,message:'Error while loading notes'});
      });
    }

    render(){
     return <div className=" container-fluid hand-written-container">
      <div className="row justify-content-center">
       <div>Hand Written Notes</div>    
      </div>
      <hr className="divider"/>
      <div className="row table-responsive">
       <table className="table table-hover">
        <thead>
         <tr>
          <th>Subject</th>
          <th>Title</th>
          <th>File Name</th>
         </tr>
        </thead>
        <tbody>

         {this.state.handWrittenNotes && Array.isArray(this.state.handWrittenNotes)?
          this.state.handWrittenNotes.map((note , index )=>{
           return <tr key={index}>
            <td>{note.subjectName}</td>
            <td>
             <a href={STUDY_MATRIAL_DOWNLOAD_ENDPOINT+'?studyMatrialId='+note.id+'&fileName='+note.fileName} 
              target="_blank" rel="noopener noreferrer"> {note.title}</a>
            </td>
            <td><a href={STUDY_MATRIAL_DOWNLOAD_ENDPOINT+'?studyMatrialId='+note.id+'&fileName='+note.fileName} 
             target="_blank" rel="noopener noreferrer"> {note.fileName}</a></td>
           </tr>;
          })
          :<tr><td>Empty list</td></tr>}         
        </tbody>
       </table>
      </div>
    
     </div>;
    }

}