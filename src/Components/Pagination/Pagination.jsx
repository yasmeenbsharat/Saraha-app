import React from 'react'
import _ from 'lodash';
const Pagination=({users,pageNumber,pageSize,changePageNumber}) => {
    const pageCount = Math.ceil(users.length / pageSize);
    if(pageCount === 1) return <></>;
  const pages = _.range(0,pageCount);
  // console.log(pages);
  return (
 
        <nav aria-label="Page navigation example bg-dark">
       <ul className="pagination">
    {pages.map((page)=>{
      return(
        <li  className={page === pageNumber ? "page-item active " : "page-item"} onClick ={() => changePageNumber(page)}>
        <a  className="page-link colo" >{page + 1}</a></li>
      );
    }
       
    )}
  </ul>
</nav>
 



  );
};

export default Pagination;