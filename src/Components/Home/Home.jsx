import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <div>
      
    <div className="container text-center my-5">
  <h4>Sarahah allows you to receive constructive feedback from your friends and co-workers</h4>
  <div className="buttons d-flex justify-content-center align-items-center  flex-column">
  <Link className="btn btn-default-outline my-4"  to="/register">Register</Link>
  <Link  className="btn btn-default-outline" to="/login">Log In</Link>

  </div>
</div>


    </div>
  )
}
