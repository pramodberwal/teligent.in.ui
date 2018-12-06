import {Value} from 'slate';
import {getQuestionById} from '../../../services/questions/question-service';
import { getTestSeriseById } from '../../../services/test-series';
import { getAllCourses, getCourseById } from '../../../services/ref-data/course';
import { getChaptersBySubject } from '../../../services/ref-data/chapter';
import { getAllSubjects, getSubjectByCourse } from '../../../services/ref-data/subject';

export let loadData =(props,component)=>{
 getAllCourses().then((data)=>{ 
  component.setState({courses:data.courses});
 }).catch(error =>{
  component.setState({isError:true,message:error.message});
 });
 getAllSubjects()
  .then(data =>{
   component.setState({subjects:data.subjects});
  }).catch(error =>{
   component.setState({isError:true,message:error.message});
  });
 if(props.seriesId){     
  getTestSeriseById(props.seriesId)
   .then(seriesData =>{

    if(seriesData.testSeries.instructions){
     seriesData.testSeries.instructions = Value.fromJSON(JSON.parse(seriesData.testSeries.instructions));       
    }

    component.setState({isError:false,
     testSeries:seriesData.testSeries,      
    }); 
    if(seriesData.testSeries.courseId){
     getSubjectByCourse(seriesData.testSeries.courseId)
      .then(subjectData =>{
       component.setState({isError:false,        
        subjects:subjectData.subjects
       }); 
      })
      .catch(error =>{
       component.setState({message:'', isError:false,testSeries:seriesData.testSeries}); 
      });
     component.setState({testSeries:seriesData.testSeries,message:'', isError:false});    
    }
    if(seriesData.testSeries.subjectId){
     getChaptersBySubject(seriesData.testSeries.subjectId)
      .then(chapterData =>{
       component.setState({isError:false,       
        chapters:chapterData.chapters
       }); 
      })
      .catch(error =>{
       component.setState({message:'', isError:false,testSeries:seriesData.testSeries}); 
      });
     component.setState({testSeries:seriesData.testSeries,message:'', isError:false});    
    }
   }
   )
   .catch(error =>{
    component.setState({isError:true,message:error.message});    
   });
 }else{
  component.setState({isError:false,message:''}); 
 } 
};

export let loadAllSubjects = (fieldName,fieldValue,component)=>{ 
 getCourseById(fieldValue).then(courseData =>{ 
  getSubjectByCourse(courseData.course.id).then((data)=>{
   component.setState({
    inProgress:true,
    isError:false,
    testSeries:{...component.state.testSeries,
     [fieldName]:fieldValue,
     subjectId:'',
     chapterId:'',
    },
    subjects:data.subjects,});
  }).catch(data =>{
   component.setState({
    inProgress:true,
    isError:true,
    testSeries:{...component.state.testSeries,
     [fieldName]:fieldValue,
     subjectId:'',
     chapterId:'',
    },
    subjects:[],});
  });
 }).catch(error =>{
  component.setState({isError:true, message:error.message});
 });
 

};
export let loadChapters=(fieldName,fieldValue,component)=>{
 getChaptersBySubject(fieldValue).then((data)=>{
  component.setState({
   inProgress:true,
   testSeries:{...component.state.testSeries,
    [fieldName]:fieldValue,
    chapter:'',
   },
   chapters:data.chapters
  });
 }).catch(data =>{
  component.setState({
   inProgress:true,
   testSeries:{...component.state.testSeries,
    [fieldName]:fieldValue,
    chapter:'',
   },
   chapters:[]
  });
 });
};
export let loadQuestion=(props,component)=>{
 getQuestionById(props.id).then(data =>{
  component.setState({question:data.question});
 });
};