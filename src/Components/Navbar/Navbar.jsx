import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
 console.log(props.user);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-custom">
        <div className="container">
    <a className="navbar-brand" href="index.html"><img src="/images/logo300.png" width={54} alt /> </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      Menu <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto ms-auto">
     {props.user ? <>  <li className="nav-item">
          <Link className="nav-link" to="/usersPage">Find-Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/myProfile'>My Messages</Link>
        </li>
        </>:null}

     

          {props.user==null? <> <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link" to="/login">Log In</Link>
        </li></>:null}

        {props.user ? <>  <li className="nav-item">
          <span className="nav-link" onClick={props.logout}>Log Out</span>
        </li>
        </>:null}
  
     
       

      </ul>
    </div>
  </div>
</nav>  
        
    </div>
  )
}
