import React from 'react';
import './style.css';
import {getAllSubjects} from '../../../services/ref-data/subject';
import {savePreviousYearPaper,saveRecommendedBook
 ,deleteStudyMatrial
 ,saveHandWrittenNote
 ,getPreviousYearPapers
 ,getAllRecommendedBooks
 ,getAllHandWrittenNotes} from '../../../services/study-material';

export default class StudyMatrialComponent  extends React.Component{

    state ={
     isError: true,
     message:'',
     studyMaterial:'',
     previousYearPapers:[],
     recommendedBooks:[],
     handWrittenNotes:[],
     previousYearPaper:'',
     recommendedBook:'',
     handWrittenNote:'',
     previousYearPaperfile:'',
     eBookFile:'',
     handWrittenNotesFile:'',
     subjects:[]
    }

    loadAllPreviousYearPapers = ()=>{
     getPreviousYearPapers()
      .then(data =>{
       this.setState({previousYearPapers:data.previousYearPapers,previousYearPaper:'',previousYearPaperfile:''});
      })
      .catch(error =>{
       this.setState({isError:true,message:'Error while getting all previous year papers.'});
      });
    }

    loadAllRecommendedBooks = ()=>{
     getAllRecommendedBooks()
      .then(data =>{
       this.setState({recommendedBooks:data.recommendedBooks,recommendedBook:''});
      })
      .catch(error =>{
       this.setState({isError:true,message:'Error while getting all previous year papers.'});
      });
    }

    loadAllHandWrittenNotes = ()=>{
     getAllHandWrittenNotes()
      .then(data =>{
       this.setState({handWrittenNotes:data.handWrittenNotes,handWrittenNote:'',handWrittenNotesFile:''});
      })
      .catch(error =>{
       this.setState({isError:true,message:'Error while getting all previous year papers.'});
      });
    }

    componentDidMount = ()=>{
     getAllSubjects()
      .then(data =>{
       this.setState({subjects:data.subjects});
      })
      .catch(error =>{
       this.setState({isError:true, message:'Error while reterving subjects.'});
      });
     this.loadAllPreviousYearPapers();
     this.loadAllRecommendedBooks();
     this.loadAllHandWrittenNotes();
    }


    savePreviousYearPaper = ()=>{

     if(!this.state.previousYearPaper){
      return;
     }

     savePreviousYearPaper(this.state.previousYearPaper, this.state.previousYearPaperfile)
      .then(data =>{
       this.setState({previousYearPaper:''});
       this.loadAllPreviousYearPapers();       
      })
      .catch(error =>{
       this.setState({isError:true,message:"Error while saving previous year paper."});
      });
    }

    saveHandWrittenNote = ()=>{

     if(!this.state.handWrittenNote){
      return ;
     }

     saveHandWrittenNote(this.state.handWrittenNote, this.state.handWrittenNotesFile)
      .then(data =>{       
       this.loadAllHandWrittenNotes();
      })
      .catch(error =>{
       this.setState({isError:true,message:"Error while saving previous year paper."});
      });
    }
   
    saveRecommendedBook = ()=>{
     if(!this.state.recommendedBook){
      return ;
     }
     
     saveRecommendedBook(this.state.recommendedBook, this.state.eBookFile)
      .then(data =>{
       this.loadAllRecommendedBooks();
      })
      .catch(error =>{
       this.setState({isError:true,message:"Error while saving previous year paper."});
      });
    }
    onDeleteStudyMatrial = ( id , type)=>{
     deleteStudyMatrial(id)
      .then(data =>{
       if('previous_year_paper' === type){
        this.loadAllPreviousYearPapers();
       }else if('recommended_book' === type){
        this.loadAllRecommendedBooks();
       }else{
        this.loadAllHandWrittenNotes();
       }
      })
      .catch(error =>{
       this.setState({isError:true, message:'Error while deleting.'});
      });
    }

    onPreviousYearPaperFileChangeChange = (file)=>{
     this.setState({previousYearPaperfile:file});
    }
    onPreviousYearPaperChange = (fieldName , fieldValue)=>{
     this.setState({previousYearPaper:{...this.state.previousYearPaper,[fieldName]:fieldValue}});
    }

    onHandWrittenNoteFileChangeChange = (file)=>{
     this.setState({handWrittenNotesFile:file});
    }

    onEBookFileChangeChange = (file)=>{
     this.setState({eBookFile:file});
    }

    
    onHandWrittenNoteChange = (fieldName , fieldValue)=>{
     this.setState({handWrittenNote:{...this.state.handWrittenNote,[fieldName]:fieldValue}});
    }

    onRecommendedBookChange = (fieldName , fieldValue)=>{
     this.setState({recommendedBook:{...this.state.recommendedBook,[fieldName]:fieldValue}});
    }


    render(){
     return <div className=" study-matrial-component ">
      <div className="row heading-row text-center ">
       <div className=" heading-col ">
                           Study Matrial Editor                 
       </div>   
      </div>
      <div className="container">   
       <hr className="divider" />
       <div className="row study-matrial-table">
        <div className="container">
         <div className="row justify-content-center">
          <div>Previous Year Papers</div>
         </div>
         <div className="row">
          <div className="table-responsive">
           <table className=" table flex-grow-1">
            <thead>
             <tr>
              <th>Year</th>
              <th>Resource Name</th>         
              <th>Resource</th>
              <th>Subject</th>
             </tr>
            </thead>
            <tbody>
             {this.state.previousYearPapers && Array.isArray(this.state.previousYearPapers)?
              this.state.previousYearPapers.map((paper,index)=>{
               return  <tr key={index}>
                <td>{paper.year}</td>
                <td>{paper.title}</td>
                <td>{paper.fileName}</td>
                <td>{paper.subjectName}</td>
                <td><span onClick={()=>this.onDeleteStudyMatrial(paper.id,'previous_year_paper')}>X</span></td>
               </tr>;
              })
              :''}             
            </tbody>
           </table>
          </div>
         </div> 
         <div className="row ">
          <form className="flex-grow-1">
           <div className="form-row ">
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Year</label>
              <select name="year" className="custom-select"
               value={this.state.previousYearPaper && this.state.previousYearPaper.year?this.state.previousYearPaper.year:''}
               onChange={(e)=>this.onPreviousYearPaperChange("year",e.target.value)}
              >
               <option>Please Select</option>
               <option value={2018}>2018</option>
               <option value={2017}>2017</option>
               <option value={2016}>2016</option>
               <option value={2015}>2015</option>
               <option value={2014}>2014</option>
               <option value={2013}>2013</option>
               <option value={2012}>2012</option>
               <option value={2011}>2011</option>
               <option value={2010}>2010</option>
               <option value={2009}>2009</option>
               <option value={2009}>2008</option>
               <option value={2007}>2007</option>
               <option value={2006}>2006</option>
               <option value={2005}>2005</option>
               <option value={2004}>2004</option>
               <option value={2003}>2003</option>
               <option value={2002}>2002</option>
               <option value={2001}>2001</option>
               <option value={2000}>2000</option>
              </select> 
             </div>        
            </div>
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Title</label>
              <input className="form-control"
               name="title" 
               value={this.state.previousYearPaper && this.state.previousYearPaper.title?this.state.previousYearPaper.title:''}
               onChange={(e)=>this.onPreviousYearPaperChange("title",e.target.value)}
              />
             </div>        
            </div>
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Resource</label>
              <input type="file" className="form-control"              
               onChange={(e)=>this.onPreviousYearPaperFileChangeChange(e.target)}
              />
             </div>        
            </div>
            <div className="form-group mr-2 flex-grow-1">         
             <label>Subject</label>
             <select name="subjectId" className="custom-select"
              value={this.state.previousYearPaper && this.state.previousYearPaper.subjectId?this.state.previousYearPaper.subjectId:''}
              onChange={(e)=>this.onPreviousYearPaperChange("subjectId",e.target.value)}
             >
              <option>Please Select</option>
              {this.state.subjects && Array.isArray(this.state.subjects)?
               this.state.subjects.map((subject,index)=>{
                return <option key={index} value={subject.id}>{subject.name}</option>;
               })
               :''}
             </select>             
            </div>
            <div className="form-group flex-grow-1 pt-4">                  
             <button type="button" className="btn btn-primary form-control"
              onClick = {this.savePreviousYearPaper}
             >Save</button>
            </div>          
           </div>
          </form>
         </div> 
        </div>
       </div>
      </div>
      <div className="container">
       <div className="row study-matrial-table">
        <div className="container">
         <div className="row justify-content-center">
          <div>Recomended Books</div>
         </div>
         <div className="row">
          <div className="table-responsive">
           <table className=" table flex-grow-1">
            <thead>
             <tr>
              <th>Subject</th>
              <th>Book Name</th>         
              <th>Author</th>
             </tr>
            </thead>
            <tbody>
             {this.state.recommendedBooks && Array.isArray(this.state.recommendedBooks)?
              this.state.recommendedBooks.map((book,index)=>{
               return  <tr key={index}>
                <td>{book.subjectName}</td>
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                <td><span onClick={()=>this.onDeleteStudyMatrial(book.id,'recommended_book')}>X</span></td>
               </tr>;
              })
              :''}              
            </tbody>
           </table>
          </div>
         </div> 
         <div className="row ">
          <form className="flex-grow-1">
           <div className="form-row ">
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Subject</label>
              <select name="subjectId" className="custom-select"
               value={this.state.recommendedBook && this.state.recommendedBook.subjectId?this.state.recommendedBook.subjectId:''}
               onChange={(e)=>this.onRecommendedBookChange("subjectId",e.target.value)}
              >
               <option>Please Select</option>
               {this.state.subjects && Array.isArray(this.state.subjects)?
                this.state.subjects.map((subject,index)=>{
                 return <option key={index} value={subject.id}>{subject.name}</option>;
                })
                :''}
              </select> 
             </div>        
            </div>
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Book Name</label>
              <input className="form-control"
               name="title" 
               value={this.state.recommendedBook && this.state.recommendedBook.title?this.state.recommendedBook.title:''}
               onChange={(e)=>this.onRecommendedBookChange("title",e.target.value)}
              />
             </div>        
            </div>
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Author Name</label>
              <input  className="form-control"
               name="authorName"
               value={this.state.recommendedBook && this.state.recommendedBook.authorName?this.state.recommendedBook.authorName:''}
               onChange={(e)=>this.onRecommendedBookChange("authorName",e.target.value)}
              />
             </div>        
            </div>
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Upload Book</label>
              <input type="file"               
               onChange={(e)=>this.onEBookFileChangeChange(e.target)}
               className="form-control"/>
             </div>        
            </div> 
            <div className="form-group flex-grow-1 pt-4">                  
             <button 
              type="button"
              onClick={this.saveRecommendedBook}
              className="btn btn-primary form-control">Save</button>
            </div>
           </div>
          </form>
         </div> 
        </div>
       </div>
      </div>
      <div className="container">
       <div className="row study-matrial-table">
        <div className="container">
         <div className="row justify-content-center">
          <div>Hand-Written Notes</div>
         </div>
         <div className="row">
          <div className="table-responsive">
           <table className=" table flex-grow-1">
            <thead>
             <tr>
              <th>Subject</th>
              <th>Name</th>     
              <th>Resource</th>
             </tr>
            </thead>
            <tbody>
             {this.state.handWrittenNotes && Array.isArray(this.state.handWrittenNotes)?
              this.state.handWrittenNotes.map((note,index)=>{
               return  <tr key={index}>
                <td>{note.subjectName}</td>
                <td>{note.title}</td>
                <td>{note.fileName}</td>
                <td><span onClick={()=>this.onDeleteStudyMatrial(note.id,'hand_written_notes')}>X</span></td>
               </tr>;
              })
              :''}  
            </tbody>
           </table>
          </div>
         </div> 
         <div className="row ">
          <form className="flex-grow-1">
           <div className="form-row ">
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Subject</label>
              <select name="subjectId" className="custom-select"
               value={this.state.handWrittenNote && this.state.handWrittenNote.subjectId?this.state.handWrittenNote.subjectId:''}
               onChange={(e)=>this.onHandWrittenNoteChange("subjectId",e.target.value)}
              >
               <option>Please Select</option>
               {this.state.subjects && Array.isArray(this.state.subjects)?
                this.state.subjects.map((subject,index)=>{
                 return <option key={index} value={subject.id}>{subject.name}</option>;
                })
                :''}
              </select> 
              
             </div>        
            </div>
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Notes Name</label>
              <input name="title" className="form-control"
               value={this.state.handWrittenNote && this.state.handWrittenNote.title?this.state.handWrittenNote.title:''}
               onChange={(e)=>this.onHandWrittenNoteChange("title",e.target.value)}
              />
             </div>        
            </div>
            <div className="form-group mr-2 flex-grow-1">
             <div>
              <label>Resource</label>
              <input type="file"               
               onChange={(e)=>this.onHandWrittenNoteFileChangeChange(e.target)}
               className="form-control"/>
             </div>        
            </div> 
            <div className="form-group flex-grow-1 pt-4">                  
             <button type="button"
              className="btn btn-primary form-control"
              onClick={this.saveHandWrittenNote}
             >Save</button>
            </div>            
           </div>
          </form>
         </div> 
        </div>
       </div>
      </div>
     </div>;
    }
} 