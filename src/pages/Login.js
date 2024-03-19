import React, { useState } from 'react'
import axios from "axios";
import { server } from "../index";
import toast from "react-hot-toast";
import { Context } from '../index';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios.post(`${server}/login`, {
        email, password

      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      },
      )
      setIsAuthenticated(true)
      toast.success(data.message, data.name)
      setEmail("")
      setPassword("")
      console.log(email, password, isAuthenticated)
      setLoading(false)
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
      setIsAuthenticated(false)
      setLoading(false)
    }
  }
  if (isAuthenticated) return <Navigate to={"/profile"}></Navigate>
  return (<>
    <form onSubmit={HandleSubmit}>
      <input type='email' placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
      <input type='password' placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
      <input disabled={loading} type='submit'></input>
    </form>
  </>)
}

export default Login