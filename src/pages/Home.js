import React, {  useEffect, useState } from 'react'
import  { server} from '../index'
import toast from 'react-hot-toast'
import axios from 'axios'
import Taskfetch from './Taskfetch'

const Home = () => {

  const [title,setTitle]=useState("");
  const[task,setTask]=useState("");
  const [loading,setLoading]=useState(false);
  //const{isAuthenticated,setIsAuthenticated}=useContext(Context)
  const [alltask, setAlltask] = useState([]);
  const[refresh,setRefresh]=useState(false);
  
  useEffect(() => {
     axios.get(`${server}/app/v1/alltask`,{
      withCredentials:true,
    })
    .then((res)=>{
      setAlltask(res.data.allwork)
      setRefresh((prev)=>!prev)
    })
    .catch(()=>{
      toast.error("some error")
    })
  
   
  }, [refresh])
  
  const  HandleSubmit=async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
    const {data}=await axios.post(`${server}/app/v1/newtask`,{
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
  catch(error){
    toast.error("some error")
    setLoading(false)
    
  }
}
  
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
       
     alltask ? alltask.map((i)=>(
        <Taskfetch title={i.title} task={i.task}/>
      )):null
     }
    </>
    
  )
  
}

export default Home