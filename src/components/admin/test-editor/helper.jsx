import {Value} from 'slate';
import {getQuestionById} from '../../../services/questions/question-service';
import { getTestById } from '../../../services/exam-test';
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
 if(props.testId){     
  getTestById(props.testId)
   .then(testData =>{

    if(testData.test.instructions){
     testData.test.instructions = Value.fromJSON(JSON.parse(testData.test.instructions));       
    }

    component._isMounted &&  component.setState({isError:false,message:'',
     test:testData.test,      
    }); 
    if(testData.test.courseId){
     getSubjectByCourse(testData.test.courseId)
      .then(subjectData =>{
       component.setState({isError:false,message:'',        
        subjects:subjectData.subjects
       }); 
      })
      .catch(error =>{
       component.setState({message:'', isError:false,test:testData.test}); 
      });
    // component.setState({test:testData.test,message:'', isError:false});    
    }
    if(testData.test.subjectId){
     getChaptersBySubject(testData.test.subjectId)
      .then(chapterData =>{
      /*  component.setState({isError:false,message:'',       
        chapters:chapterData.chapters
       });  */
      })
      .catch(error =>{
       component.setState({message:'', isError:false,test:testData.test}); 
      });
    // component.setState({test:testData.test,message:'', isError:false});    
    }
   }
   )
   .catch(error =>{
    component.setState({isError:true,message:error.message});    
   });
 }else{
  let test = component.state.test;
  
  if(props.location && props.location.state && props.location.state.from){
   test.active= true;
   test.mockPaper=true;
   test.courseId= props.location.state.courseId;
   test.subjectId= props.location.state.activeSubject;
   test.testStartTime= props.location.state.testStartTime;
  }

  component.setState({isError:false,message:'',test:test}); 
 } 
};

export let loadAllSubjects = (fieldName,fieldValue,component)=>{ 
 getCourseById(fieldValue).then(courseData =>{ 
  getSubjectByCourse(courseData.course.id).then((data)=>{
   component.setState({
    inProgress:true,
    isError:false,
    test:{...component.state.test,
     [fieldName]:fieldValue,
     subjectId:'',
     chapterId:'',
    },
    subjects:data.subjects,});
  }).catch(data =>{
   component.setState({
    inProgress:true,
    isError:true,
    test:{...component.state.test,
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
   test:{...component.state.test,
    [fieldName]:fieldValue,
    chapter:'',
   },
   chapters:data.chapters
  });
 }).catch(data =>{
  component.setState({
   inProgress:true,
   test:{...component.state.test,
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