import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
  let navigate = useNavigate();
  let[email,setEmail]=useState();
  const onChange =(e)=>{
    setEmail(e.target.value);
  }
  const onSubmit = async(e)=>{
    e.preventDefault();
    if(!email || email.length<8){
      console.log("Please enter your email");
       return;} 
       else{ 
         let{data}= await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode',{email});
         console.log(data);
         console.log("Please check your email");
         navigate(`/reset-code/${email}`) 
       }
    
  }
  return (
    <div>
           <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Forget Password </h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    <form onSubmit={onSubmit}>
 
      <input className="form-control" placeholder="Enter your email" type="text" name="email" onChange={onChange}/>
      
      <button className="btn btn-default-outline my-4 w-100 rounded">Reset Password</button>
      
  
    </form>
  </div>
</div>


    </div>
  )
}
