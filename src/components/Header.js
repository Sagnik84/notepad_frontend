import React, { useContext, useEffect, useState } from 'react'
import "./style.css";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from '../index';
import { Link  } from 'react-router-dom';
import { Context } from '../index';


const Header = () => {
  const { isAuthenticated, setIsAuthenticated,loading,setLoading,setUser } = useContext(Context)
  const [refresh,setRefresh]=useState(false)
  
  useEffect(() => {
    axios.get(`${server}/myProfile`,{
      withCredentials:true ,
    })
    .then((res)=>{
      const userprofile=res.data.user;
      //console.log(res)
      setUser(res.data.user)
      if(userprofile){
      setIsAuthenticated(true)
      setRefresh((prev)=>!prev)
      }
      
    })
  .catch((error)=>{
    toast.error(error)
    setUser({})
    setIsAuthenticated(false)
  })

  
    
  }, [refresh])
  
  const LogoutHandeler = async (e) => {
    
    e.preventDefault();
    try {
      setLoading(true)
     const {data}=await axios.get(`${server}/logout`, {
        headers: { 
          "Content-Type": "application/json" 
        },
      withCredentials:true,
      },
    )
      toast.success(data.message)
      setIsAuthenticated(false)
      setLoading(false)
    } catch (error) {
      toast.error("some error")
      setIsAuthenticated(true)
      setLoading(false)
    }
  
  }
 
  return (
    <div className='header'>
      <h2>Todo App.</h2>
      <div className='nav'>
        <Link to={"/"} className='profile'>Home</Link>
        <Link to={"/profile"} className='profile'>Profile</Link>
        {
          isAuthenticated ? <button disabled={loading}  onClick={LogoutHandeler} to={"/logout"} className='logout'>Logout</button> : <Link to={"/login"} className='login'>Login</Link>
        }
        {isAuthenticated ? null : <Link to={"/register"} className='register'>Register</Link>
        }
     

      </div>
    </div>
  )
}

export default Header