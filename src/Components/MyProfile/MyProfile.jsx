import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FindUser from '../Utils/FindUser';
import style from './MyProfile.module.css';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
export default function MyProfile(props) {
  const [user,setUser] =useState ({});
  let[messages,setMessages] =useState( []);

  let token =localStorage.getItem("token"); 
   console.log(token);
 let tokenApi =`tariq__${token}`
  const getMessages = async()=>{
   let {data} =await axios.get("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages",{headers:{token:tokenApi}});
    if(data.message=='success')
         setMessages(data.messages);

  }
  const deleteMessage = async(id)=>{
    let {data}=await axios.delete(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`,{headers:{token:tokenApi}});
     if(data.message==='success'){
      toast.success('delete successfully!');
     }

  }
  useEffect(()=>{
    setUser (FindUser(props.users,props.user.id));
    getMessages();
  },[])
 const shareProfile = (e,url)=>{
  e.preventDefault();
   copy(url)
 }
 
    return (

    <div>

          <div className="container text-center py-5 my-5 text-center">
            <div className="card pt-5 w-50 m-auto">
              <a href data-toggle="modal" data-target="#profile">
                <img src="images/avatar.png" className="avatar " alt />
              </a>
              <h3 className="py-4">{user.userName}</h3>
              <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share " onClick={(e)=>(shareProfile(e,window.location))}><i className="fas fa-share-alt" />  Share Profile</button>
            </div>
          </div>
          { messages.length ==0 ?  <div className="container text-center my-5 text-center">
          <div className="row">
            <div className="col-md-12">
              <div className="card py-4">
                <p>You don't have any messages... </p>
              </div>
            </div>
          </div>
        </div>: <>
           { messages.map ((message,index) =>
            <div className="container text-center my-5 text-center" key={index}>
          <div className="row">
            <div className="col-md-12">
              <div className="card py-4 position-relative w-50 m-auto">
                <p>{message.text}</p>
                <span className = {style.icon} onClick={()=>deleteMessage(message._id)} ><i className="fa-solid fa-trash text-danger" /> </span>
              </div>
            </div>
          </div>
        </div>
            )}
          </>
          
       



          }
             


    </div>
  )
}
