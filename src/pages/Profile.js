import React from 'react'
import { Context } from '../index';
import { useContext } from 'react'
const Profile = () => {
  const {user}= useContext(Context)
  return (
    <>
    <h2>{user?.name}</h2>
    <h3>{user?.email}</h3>
    
    </>
  )
}

export default Profile