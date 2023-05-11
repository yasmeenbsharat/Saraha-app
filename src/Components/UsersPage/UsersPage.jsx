import React, { useState } from 'react';
import style from './UsersPage.module.css';
import'../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import pagination from '../Utils/pagination';
export default function UsersPage({users}) {
  let navigate = useNavigate();
  let [search,setSearch] = useState();
  let [result,setResult] = useState(users);
  let [pageInfo,setPageInfo]= useState({
    pageNumber:0,
    pagesize:12,
  });

  const changePageNumber=(page)=>{
    setPageInfo({ ...pageInfo, pageNumber: page});
  }
 console.log(users);
   
   
  const searchUser=(e)=>{
    setSearch(e.target.value);
    let arr=[];
    users.map((user)=>{
      if(user.userName.toLowerCase().includes(search)){
         arr.push(user);
  
      }

    });
          setResult(arr);
          setPageInfo({ ...pageInfo, pageNumber: 0});
    //.toLowerCase()
  }
    // const userProfile = (userId)=>{
    
    // }

  return (

    <div className='container'>
        <h2>UsersPage</h2>
        <input className="form-control my-3" type="search" placeholder="Search" aria-label="Search" onChange={searchUser} />
        <table class="table">
  <thead >
  
  <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Message </th>
       
      </tr>
  </thead>
  <tbody>
    {/* //props. {   pagination(result,pageInfo.pageNumber,pageInfo.pagesize).map((user,index)=>*/
    //  {  setResult( pagination(result,pageInfo.pageNumber,pageInfo.pagesize))}
    //  { console.log(result)}
    //  {  result.map((user,index)=>(
    //       <tr key={index}>
    //       <th scope="row">{1+index +(pageInfo.pageNumber *pageInfo.pagesize )}</th>
    //       <td>{user.userName}</td>
    //       <td><button className={`rounded-pill py-2 px-3 border-0  text-white ${style.message}`} onClick={()=>navigate(`/user/${user._id}`)}> Send Message <i class="fa-solid fa-paper-plane"></i> </button></td>
    //     </tr>
    //   ),
    //   )} 
    }

 
    {  pagination(result,pageInfo.pagesize,pageInfo.pageNumber).map((user,index)=>(
         <tr key={index}>
         <th scope="row">{1+index +(pageInfo.pageNumber * pageInfo.pagesize )}</th>
         <td>{user.userName}</td>
         <td><button className={`rounded-pill py-2 px-3 border-0  text-white ${style.message}`} onClick={()=>navigate(`/user/${user._id}`)}> Send Message <i class="fa-solid fa-paper-plane"></i> </button></td>
       </tr>
     ),
     )} 
   
   
  </tbody>
</table>
  <Pagination users={result} pageNumber= {pageInfo.pageNumber} pageSize={pageInfo.pagesize} changePageNumber={changePageNumber}  />

    </div>
  )
}
