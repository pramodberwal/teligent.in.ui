import React from 'react';
import {PopUpModel} from '../../helper/popup';
import {getAllRecommendedBooks} from '../../../services/study-material';
import {STUDY_MATRIAL_DOWNLOAD_ENDPOINT} from '../../../constants/system-constant';

let BookSummary = (props) =>{
 let {book} = props;
 return <div className="book-summary-container container-fluid">
  <div className="row justify-content-center">
   <div className="text-center">
    <div className="book-image-box">
     <img src="/static/images/hcverma.jpg" class="img-rounded" alt="Cinque Terre"></img>
    </div>
   </div>
   <div className="flex-grow-1">
    <p className="text-style">
   Here Book summary will be comig.....
    </p>
   </div>
  </div>
  <div className="row justify-content-end">
   <div><span className="text-style">
    {book.fileName ? <a href={STUDY_MATRIAL_DOWNLOAD_ENDPOINT+'?studyMatrialId='+book.id+'&fileName='+book.fileName} 
     target="_blank" rel="noopener noreferrer"> {book.title}</a>:book.title}
   </span></div>
  </div>
 </div>;
};
export default class RecommendedBooksComponent extends React.Component{
    state={
     isError:false,
     message:'Please wait while we are loading books...',
     recommendedBooks:[],
    }
    componentDidMount = ()=>{
     getAllRecommendedBooks()
      .then(data =>{
       let recommendedBooks = data.recommendedBooks;
       this.setState({recommendedBooks:recommendedBooks});
      })
      .catch(error =>{
       this.setState({isError:true,message:'Error while loading books'});
      });
    }
    render(){
     return <div className=" container-fluid book-container">
      <div className="row justify-content-center">
       <div>
        <span className="text-style"> Recommonded Books</span>
       </div>    
      </div>
      <hr className="divider"/>
      <div className=" row ">
       {this.state.recommendedBooks && Array.isArray(this.state.recommendedBooks)?
        this.state.recommendedBooks.map((book , index )=>{
         return <div key={index} className="paper-box book-box" 
          data-toggle="modal" data-target={'#book_'+index}>
          <img src="/static/images/hcverma.jpg" class="img-rounded" alt="Cinque Terre"></img>
          <div><span className="text-style">{book.title}</span></div>
          <div><span className="text-style">{book.subjectName}</span></div> 
          <PopUpModel id={'book_'+index} title={book.title} Component={()=><BookSummary book={book}/>}/>
         </div>;
        })
        :''}
      </div>
     </div>;
    }

}