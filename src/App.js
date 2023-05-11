import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Loader from './Components/Loader/Loader';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import UserProfile from './Components/UserProfile/UserProfile';
import UsersPage from './Components/UsersPage/UsersPage';
import jwtDecode from  "jwt-decode";
import NotFound from './Components/NotFound/NotFound';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter';
import MyProfile from './Components/MyProfile/MyProfile';
import ForgetPassword from'./Components/ForgetPassword/ForgetPassword.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';
export default function App() {
  let navigate=useNavigate();
  let[users,setUsers]=useState({}); 
  let [userData,setUserData] = useState(null);
  
  const getUserData=()=>{
     let decoded = jwtDecode(localStorage.getItem("token"));
     setUserData(decoded);
     console.log(decoded);
  }
//   useEffect(()=>{
    
//     if(localStorage.getItem("token")){
//       getUserData();
//     }
 
//  },[userData]);

 useEffect(()=>{
    
  if(localStorage.getItem("token")){
    getUserData();
  }
  getUsersData();
       console.log(userData);
},[]);
  const logout=()=>{
    localStorage.removeItem("token");
    setUserData({});
    navigate('/login');
  }
  let[loading,setLoading] =useState(true); 

  const getUsersData= async ()=>{
       let {data}= await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers');
      setUsers(data);
      setLoading(false);

   }
  //  useEffect(()=>{
  
  //  },[])
  return (
    <div>
       <Navbar user ={userData} logout={logout} />
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />

       {loading ?(<Loader />):( 
       <Routes>
          <Route path='/'element={<Home />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login getUserData={getUserData}/>}></Route> 
        <Route path='/reset-code/:email' element={<ResetPassword/>}></Route>
        <Route path='/forgetPassword' element={<ForgetPassword/>}></Route>

        <Route element={<ProtectedRouter />}>
        <Route path='/myProfile' element={<MyProfile users={users}  user ={userData}/>}></Route>
        <Route path='/usersPage' element={<UsersPage users={users}/>}></Route>
        <Route path='/user/:id' element={<UserProfile users={users}/>}></Route>
        </Route>
      
        <Route path='*' element={<NotFound />}></Route>
      </Routes>) }
    
     

    </div>
  //    <div>
  //    <Navbar user ={user}  logout={logout} />

  //     {loading ?(<Loader />):( <Routes>

  //      { user ? <>
  //        <Route path='/user/:id' element={<UserProfile users={users}/>}></Route>
  //      <Route path='/usersPage' element={<UsersPage users={users}/>}></Route>
  //      </> :null}
  //      <Route path='/'  element={<Home />}></Route>
  //      <Route path='/register' element={<Register/>}></Route>
  //      <Route path='/login' element={<Login />}></Route> 
  //      <Route path='/login/home' element={<Home />}></Route>
  //      <Route path='*' element={<NotFound />}></Route>
  //    </Routes>) }
   
    

  //  </div>
  )} 
