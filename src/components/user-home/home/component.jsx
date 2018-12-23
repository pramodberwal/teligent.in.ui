import React from 'react';

export default class UserHomeComponent extends React.Component{
    state={
     isError:false,
     message:'Please wait while we are loading data...',
     user:{},
    }
    render(){
     return <div className="container-fluid user-home-container">
            

     </div>;
    }
}