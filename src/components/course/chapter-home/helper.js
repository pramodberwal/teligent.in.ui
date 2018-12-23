import { getChapterById } from "../../../services/ref-data/chapter";
import { getSubjectById } from "../../../services/ref-data/subject";
import { getTestsByChapter } from "../../../services/exam-test";


export let loadData =(props,component) =>{
 getSubjectById(props.subjectId)
  .then(data =>{
   component.setState({subject:data.subject});
  }).catch(data=>{
   component.setState({subject:''});
  });
 getChapterById(props.chapterId)
  .then(data =>{
   component.setState({chapter:data.chapter});
  }).catch(data=>{
   component.setState({chapter:''});
  });
  getTestsByChapter(props.chapterId)
  .then(data =>{
   component.setState({testList:data.testList});
  }).catch(data=>{
   component.setState({testList:[]});
  });
};