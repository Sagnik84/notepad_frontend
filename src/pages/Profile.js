import React from 'react'
import { Context } from '../index';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const {user}= useContext(Context)
  const{isAuthenticated}=useContext(Context)

  if(!isAuthenticated) return <Navigate to={'/login'}></Navigate>
  return (
    <>
    <h2>{user?.name}</h2>
    <h3>{user?.email}</h3>
    
    </>
  )
  
}

export default Profile