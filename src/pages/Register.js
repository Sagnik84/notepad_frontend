import React, { useContext, useState } from 'react'
import axios from "axios";
import { server } from "../index";
import toast from "react-hot-toast";
import { Context } from '../index';
import { Navigate } from 'react-router-dom';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  const HandleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      setLoading(true)
     const {data}= await axios.post(`${server}/register`, {
        name, email, password,
        
      }, {
        headers: { 
          "Content-Type": "application/json" 
        },
      withCredentials:true,
      },
    )
      toast.success(data.message)
      setEmail("")
      setName("")
      setPassword("")
      console.log(name,email,password)
      setIsAuthenticated(true)
      setLoading(false)
    } catch (error) {
      toast.error("some error")
      setIsAuthenticated(false)
      setLoading(false)
    }
  
  }
  if(isAuthenticated) return <Navigate to={"/"}></Navigate>
  return (
    <>
      <form onSubmit={HandleSubmit}>
        <input type='name' placeholder='name' value={name} onChange={(e) => { setName(e.target.value) }}></input>
        <input type='email' placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
        <input type='password' placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
        <input disabled={loading} type='submit'></input>
      </form>
    </>
  )
}

export default Register