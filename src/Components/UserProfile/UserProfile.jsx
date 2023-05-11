import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import FindUser from '../Utils/FindUser';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
export default function UserProfile({users}) {
  let params= useParams();
  let[message,setMessage] = useState();
  const [user,setUser] =useState(FindUser(users,params.id));
  const onChange=(e)=>{
    setMessage(e.target.value);
    console.log(message);

  }
  const sendMessage=async(e)=>{
  e.preventDefault();
 
    console.log(message);
    let {data}= await axios.post(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${params.id}`,{message:message});
     if(data.message==='success'){
      toast.success('sent successfully!');
     }



  }
  const shareProfile = (e,url)=>{
    e.preventDefault();
     copy(url)
   }
  return (
   
    <div>
       {
      console.log(user)
    }
 <div className="container text-center py-5 my-5 text-center">
  <div className="card py-5 mb-5 w-75 m-auto">
    <a href data-toggle="modal" data-target="#profile">
      <img src="/images/avatar.png" className="avatar " alt />
    </a>
  
    <h3 className="py-2 "> {user.userName}</h3>
    <div className="container w-50 m-auto">
      <form onSubmit={sendMessage}>
        <textarea className="form-control" name id cols={10} rows={9} placeholder=" Write Your Message :)" defaultValue={""} onChange={onChange} />
        <button className="btn btn-outline-info mt-3"><i className="far fa-paper-plane" onClick={sendMessage} /> Send</button>
      </form>
    </div>
  </div>
  <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share " onClick={(e)=>shareProfile(e,`http://localhost:3000/user/${user._id}`)}><i className="fas fa-share-alt"  />  Share Profile</button>
</div>

    </div>
   
  )
}
