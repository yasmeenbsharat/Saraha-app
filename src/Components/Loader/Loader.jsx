import React from 'react'
 import style from './Loader.module.css'
export default function Loader() {
  return (
    
        <div class={` d-flex justify-content-center align-items-center ${style.spinner}`}>
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
 
  )
}
