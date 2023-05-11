import React, { useState } from "react";
import Joi, { object } from "joi";
import axios from "axios";
import cookies from "react-cookies";
import { Link, useNavigate } from "react-router-dom"; 
import CustomInput from '../CustomInput/CustomInput';
export default function Register() {
  let navigate = useNavigate();
  let [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });

  let [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });
  const schema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string()
      .required()
      .pattern(/^[A-Z][a-z]{2,8}$/),
    // cPassword: Joi.valid(Joi.ref("password")).required(),
    cPassword: Joi.string().required(),
  });

  function validationInput(input, inputSchema) {
    return inputSchema.validate(input);
  }

  const onChange = (e) => {
    // setUser({...user,[e.target.name]:e.target.value})
    let { name, value } = e.target;
    const myUser = user;
    let validationResult = validationInput(value, schema.extract(name));
    if (validationResult.error) {
      console.log(validationResult.error);
      setErrors({
        ...errors,
        [name]: validationResult.error.details[0].message,
      });
    } else {
      const err = { ...errors };
      delete err[name];
      setErrors({ ...err });
    }
    myUser[name] = value;
    setUser(myUser);
    console.log(user);
    console.log("done");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("sssss");
    console.log(user);
    if (Object.keys(errors).length === 0) {
      let { data } = await axios.post(
        "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup",
        user
      );
      console.log(data);
      if (data.message === "success") {
        console.log("okkk0000");
        navigate("/login");
      }
      console.log("okkk");
    }
  };

  return (
    <div>
      <div className="container text-center my-5">
        <div className="user my-3">
          <i className="fas fa-user-secret user-icon" />
          <h4 className="login">Register</h4>
        </div>
        <div className="card p-5 w-50 m-auto">
          <form onSubmit={onSubmit}>
           <CustomInput
               error={errors.email}
               message="Enter your email"
               type="text"
               name="email"
               onChange={onChange}
           />
            <CustomInput
               error={errors.name}
               message="Enter your name"
               type="text"
               name="name"
               onChange={onChange}
           />
           <CustomInput
               error={errors.password}
               message="Enter your password"
               type="password"
               name="password"
               onChange={onChange}
           />
         <CustomInput
               error={errors.cPassword}
               message="Confirm your Password"
               type="password"
               name="cPassword"
               onChange={onChange}
           />
           
            <button className="btn btn-default-outline my-4 me-2 rounded">
              Register
            </button>
            {/* <p><a className="text-muted forgot btn" href>I Forgot My Password</a></p> */}
            <Link className="btn btn-default-outline ms-2" to="/Login">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
