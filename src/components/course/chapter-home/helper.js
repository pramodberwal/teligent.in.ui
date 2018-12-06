import { getChapterById } from "../../../services/ref-data/chapter";
import { getSubjectById } from "../../../services/ref-data/subject";
import { getTestSeriseByChapter } from "../../../services/test-series";


export let loadData =(props,component) =>{
 getSubjectById(props.subjectId)
  .then(data =>{
    //console.log('component in chapter ',component.isMounted());
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
 getTestSeriseByChapter(props.chapterId)
  .then(data =>{
   component.setState({testSeriesList:data.testSeriesList});
  }).catch(data=>{
   component.setState({testSeriesList:[]});
  });
};