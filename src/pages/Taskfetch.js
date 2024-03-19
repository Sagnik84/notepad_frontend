import React from 'react'

const Taskfetch = ({title,task}) => {
  return (
    <>
    <div className='container' style={{backgroundColor: '#f8f9fa',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',}}>
    <h2 className='title' style={{fontSize: '24px',
    marginBottom: '10px',
    color: '#212529',}}>{title}</h2>
    <p className='task' style={{fontSize: '16px',
    color: '#495057',}}>{task}</p>
    </div>
    </>
  )
}

export default Taskfetch