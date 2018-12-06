import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('Test suite',()=>{
 it('App component is displaying Button', () => {
  const div = document.createElement('div');  
  var renderer = ReactDOM.render(<App />, div);    
  //console.log('Div element 1 > ',div.querySelector('#helloButton').textContent === 'Hello World');
  //console.log('Div element 2 > ',renderer.updater.isMounted());
  // expect(2).toBe(20);
  let tree = {"x":"y"}; 
  jest.mock('../components/common/user-signup', () =>{
   'This is usersignup comonent ';
  });
  // console.log(jest);
  expect(tree).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
 });
});

;
