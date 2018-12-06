import { getCourseByName, getCourseById } from "../../../services/ref-data/course";

export let loadData =(props,component)=>{
 getCourseById(props.courseId)
  .then(data =>{ 
   component.setState({course:data.course});
  })
  .catch(data =>{
   component.setState({isError:true,message:data.message});
  });
};