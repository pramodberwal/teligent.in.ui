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
     <img src="/static/images/hcverma.jpg" className="img-rounded" alt="Cinque Terre"></img>
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
          <img src="/static/images/hcverma.jpg" className="img-rounded" alt="Cinque Terre"></img>
          <div><span className="text-style">{book.title}</span></div>
          <div><span className="text-style">{book.subjectName}</span></div> 
          <PopUpModel id={'book_'+index} title={book.title} Component={()=><BookSummary book={book}/>}/>
         </div>;
        })
        :''}
      </div>
      <div className="row">
       <div>
        <iframe 
         className="external-book-box"
         title="HC Verma Book"
         marginWidth="0" 
         marginHeight="0" 
         scrolling="no" 
         frameBorder="0" 
         src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=teligent-21&language=en_IN&marketplace=amazon&region=IN&placement=8177091875&asins=8177091875&linkId=7916d787a32741744d1d830240abfd90&show_border=true&link_opens_in_new_window=true"></iframe>
       </div>
     
      </div>
     </div>;
    }

}