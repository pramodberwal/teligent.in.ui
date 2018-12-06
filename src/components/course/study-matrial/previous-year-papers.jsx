import React from 'react';
import {getPreviousYearPapers} from '../../../services/study-material';
import {STUDY_MATRIAL_DOWNLOAD_ENDPOINT} from '../../../constants/system-constant';

export default class PreviousYearPapersComponent extends React.Component{

    state={
     isError:false,
     message:'Please wait while we are loading papers...',
     previousYearPapers:[],
    }
    componentDidMount = ()=>{
     getPreviousYearPapers()
      .then(data =>{
       let previousYearPapers = data.previousYearPapers;
       this.setState({previousYearPapers:previousYearPapers});
      })
      .catch(error =>{
       this.setState({isError:true,message:'Error while loading papers'});
      });
    }
    render(){
     return <div className=" container-fluid previous-year-paper-container">
      <div className="row justify-content-center">
       <div>Previous Year Papers</div>    
      </div>
      <hr className="divider"/>
      <div className="row">
       {this.state.previousYearPapers && Array.isArray(this.state.previousYearPapers)?
        this.state.previousYearPapers.map((paper , index )=>{
         return <div key={index} className="paper-box ">
          <div><span className="text-style">{paper.year}</span></div>
          <div><span className="text-style">{paper.subjectName}</span></div>
          <div><span className="text-style"><a href={STUDY_MATRIAL_DOWNLOAD_ENDPOINT+'?studyMatrialId='+paper.id+'&fileName='+paper.fileName} 
           target="_blank" rel="noopener noreferrer"> {paper.title}</a></span></div>
         </div>;
        })
        :''}
      </div>
     </div>;
    }

}