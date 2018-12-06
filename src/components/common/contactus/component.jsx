import React from 'react';

export default class ContactUsComponent extends React.Component{

 render(){
  return <div className="container contact-us-container">
   <div className="row heading-row justify-content-center">
    <div><button className="btn btn-primary" onClick={this.props.history.goBack}>Back</button></div>
               
    <div className="flex-grow-1 text-center">
    We are here to help you!
    </div>
   </div>
   <div className="row detail-row justify-content-center">
                For any technical dificulty please call us on +91 8806440503 or mail on pramodberwal@gmail.com
   </div>
  </div>;
 }
}