import React, { useState } from 'react'
import Joi from 'joi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookies from 'react-cookies';
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    let navigate = useNavigate();
  let [errors,setErrors] = useState([]);
  let[user,setUser] = useState({
    email:'',
    password:'',
  })
   const onChange = (e)=>{
    // setUser({...user,[e.target.name]:e.target.value})
    let myUser =user;
    myUser[e.target.name]= e.target.value;
     setUser(myUser);
   }
    const onSubmit = async(e)=>{
        e.preventDefault();
        let errorList=[];
        let validationResult =validationRegisterUser(user);
        if(validationResult.error){
           validationResult.error.details.map((err)=>{
            errorList.push(err.message);
             
           }
            )
           setErrors(errorList);
        }else{
             
            let {data}= await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",user);
            //  console.log(data);
             if (data.message ==='success') {
                // console.log(data.token);
                // cookies.save("token",data.token);
                localStorage.setItem("token",data.token);
                props.getUserData();
                navigate('/myProfile');
            }
             else if (data.message === 'invalid account'){
                   console.log("data.token");
                    errorList.push("your email or your password is incorrect");
                     setErrors(errorList);
             }
            
 

        }

    }
  function validationRegisterUser(user){
     let schema =Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:Joi.string().pattern(/^[A-Z][a-z]{2,8}$/),
      
      });
   
      return schema.validate(user,{abortEarly:false});

     }
  
  return (
    <div>
   <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Log In</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    <form onSubmit={onSubmit}>
     {   errors.map((err, index)=>
                <div class="alert alert-danger" role="alert" key={index}>
                   {err}
               </div>
        )}
      <input className="form-control" placeholder="Enter your email" type="text" name="email" onChange={onChange}/>
      <input className="form-control my-4 " placeholder="Enter your Password" type="password" name="password"  onChange={onChange}/>
      <button className="btn btn-default-outline my-4 w-100 rounded">Log In</button>
      <p><Link className="text-muted forgot btn" to='/forgetPassword'>I Forgot My Password</Link></p>
      <a className="btn btn-default-outline" href="register.html">Register</a>
    </form>
  </div>
</div>

  </div>
  )
}
