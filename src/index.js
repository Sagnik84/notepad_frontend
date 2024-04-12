import React, {  useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createContext } from 'react';
const root = ReactDOM.createRoot(document.getElementById('root'));

export const server = "https://mern-web-ldis.onrender.com"   //https://mern-web-ldis.onrender.com

export const Context = createContext({isAuthenticated:false})
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading,setLoading]=useState(false)
  const [user,setUser]=useState({})
  return (
  <>
<Context.Provider value={{isAuthenticated, setIsAuthenticated,loading,setLoading,user,setUser}}>
  <App/>
</Context.Provider>
  </>)
}

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

