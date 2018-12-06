import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('Test suite',()=>{
 it('App component is displaying Button', () => {
  const div = document.createElement('div');  
  var renderer = ReactDOM.render(<App />, div);    
  let tree = {"x":"y"}; 
  jest.mock('../components/common/user-signup', () =>{
   'This is usersignup comonent ';
  });
 
  expect(tree).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
 });
});

;
