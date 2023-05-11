import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
export default function ProtectedRouter() {
 if(!localStorage.getItem("token")){
   return < Navigate to='/login' />
 }else
 {
    return <Outlet />
 }
}