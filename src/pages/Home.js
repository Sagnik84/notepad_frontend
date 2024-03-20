import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../index'
import toast from 'react-hot-toast'
import axios from 'axios'
import Taskfetch from './Taskfetch'
import { Navigate } from 'react-router-dom';


const Home = () => {

  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const{isAuthenticated}=useContext(Context)
  const [alltask, setAlltask] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const UpdateTask = (id) => {
    try {
       axios.put(`${server}/update/${id}`,{},
        {
          withCredentials: true,
        })
      toast.success("task Updated")
      //console.log(data)
    } catch (error) {
      toast.error("task not updated")
    }
  }
  const DeleteTask = (id) => {
    try {
       axios.delete(`${server}/delete/${id}`,
        {
          withCredentials: true,
        })
      toast.success("task deleted")
      //console.log(data)
    } catch (error) {
      toast.error("task not deleted")
    }

  }

  useEffect(() => {
    const alltask = () => {
      axios.get(`${server}/app/v1/alltask`, {
        withCredentials: true,
      })
      .then((res) => {
        setAlltask(res.data.allwork)
        setRefresh((prev) => !prev)
      })
      .catch(() => {
        toast.error("some error")
      })
    }

    alltask();

  }, [refresh])

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios.post(`${server}/app/v1/newtask`, {
        title, task

      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      },
      )
      toast.success(data.message)
      setTask("")
      setTitle("")
      setLoading(false)
    }
    catch (error) {
      toast.error("some error")
      setLoading(false)

    }
  }

  if (!isAuthenticated) return <Navigate to={"/login"}></Navigate> 
  return (
    <>
      <div>
        <form onSubmit={HandleSubmit}>
          <input placeholder='Title' type='text' value={title} onChange={(e) => { setTitle(e.target.value) }}></input>
          <input placeholder='Description' type='text' value={task} onChange={(e) => { setTask(e.target.value) }}></input>
          <button disabled={loading} type='submit'>Add Task</button>
        </form>
      </div>
      {

        alltask ? alltask.map((i) => (
          <Taskfetch key={i._id} title={i.title} task={i.task} id={i._id} done={i.done} UpdateTask={UpdateTask} DeleteTask={DeleteTask} />
        )) : null
      }
    </>

  )

}

export default Home