import React, { useState } from 'react'
import './login.scss'
import { useNavigate } from "react-router-dom";
 import axios from 'axios'
 import { useAuth } from '../../context/auth';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usenavigate = useNavigate();
  const[auth,setAuth]=useAuth();

  const handleLogin = async(e) => {
    
    e.preventDefault()
    try {
      
       const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, {email,password});
       
        
        if(res.data.success){
          
            
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            })
            
             localStorage.setItem('netflixauthadmin',JSON.stringify(res.data));
             
             usenavigate("/");
        }
        else{
          alert(res.data.message)
        }
        
    } catch (error) {
      alert("Issue in Login")
      
        
    }
     };
  return (
    <div className='login'>
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