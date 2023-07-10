import React, { useState } from 'react'
import './login.scss'
import { useNavigate } from "react-router-dom";
 import axios from 'axios'
 import { useAuth } from '../../context/auth';
 import { CircularProgress } from '@mui/material';



  const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const usenavigate = useNavigate();
  const[auth,setAuth]=useAuth();
  const [progressbar,setProgreesBar]=useState("false")

  
  const handleLogin = async(e) => {
    
    e.preventDefault()
    try {
      setProgreesBar("true")
       const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/adminlogin`, {email,password});
       
        
        if(res.data.success){
          
            
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            })
            
             localStorage.setItem('netflixauthadmin',JSON.stringify(res.data));
             setProgreesBar("false")
             usenavigate("/");
        }
        else{
          alert(res.data.message)
          setProgreesBar("false")
        }
        
    } catch (error) {
      alert("Issue in Login")
      setProgreesBar("false")
        
    }
     };
  return (
    <div className={`login ${progressbar}`}>
          <CircularProgress className={progressbar} disableShrink/>
          <div className='logincontainer'>
          <div className='inputfield'>
            <label className='label'>Email</label>
            <input type='text' className='input' onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}/>
          </div>
          
          <div className='inputfield'>
          <label className='label'>Password</label>
            <input type='password' className='input' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='inputfield'>
          <button className='button' onClick={handleLogin}>Login</button>
          </div>
      </div>
      
    </div>
  )
}

export default Login