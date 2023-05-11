import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function ResetPassword() {
  let navigate = useNavigate ();
  let[user,setUser]=useState({
    code :" ",
    newPassword:' ',
  });
  let params= useParams();
  let email=params.email;
  const onChange =(e)=>{
   let myUser =user;
   myUser [e.target.name]=e.target.value;
   setUser(myUser);
  }
  const onSubmit = async(e)=>{
    e.preventDefault();
   
         let{data}= await axios.patch("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword",{...user,email});
         console.log(data);
         navigate(`/login`) 
      
  }
  return (
  <div>
         <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Reset Password</h4>
   </div>
   <div className="card p-5 w-50 m-auto">
     <form onSubmit={onSubmit}>
     
      <input className="form-control" placeholder="Enter your code" type="text" name="code" onChange={onChange}/>     
       <input className="form-control my-4 " placeholder="Enter your new Password" type="password" name="newPassword"  onChange={onChange}/>
      <button className="btn btn-default-outline my-4 w-100 rounded">Reset Password</button>
      
     
    </form>
  </div>
</div>
      </div>
  )
}
