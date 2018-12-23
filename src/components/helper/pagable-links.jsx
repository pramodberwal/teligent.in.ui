import React from 'react';

export let PageLinks = (props) =>{
 let startPage = (props.pagable.pageNumber - 3) >= 0?(props.pagable.pageNumber - 3):0;
 let endPage = (props.pagable.pageNumber + 3) <= props.pagable.totalPages ?(props.pagable.pageNumber + 3):props.pagable.totalPages;
      
 let children = [];
 for (let j = startPage; j < endPage; j++) {
  children.push(
   <li key={j} className={"page-item "+ (Number(props.page) === Number(j) ? ' active ':'')}>
    {/* <Link className="page-link" to={`${props.match.url}/`+j}>{j}</Link> */}
   </li>
  );
 }
 return  children;
};
 