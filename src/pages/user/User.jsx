import React, { useEffect, useState } from 'react'
import './user.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from '../../components/list/List';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import {storage} from "../../firebase"
import {getDownloadURL, ref,uploadBytes, uploadBytesResumable} from 'firebase/storage'
import { CircularProgress } from '@mui/material';

const User = () => {
  const [file,setFile]=useState(null);
  const params = useParams();
  const[user,setUser]=useState({})
  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[isAdmin,setisAdmin]=useState("0")
  const[profilePic,setProfilePic]=useState("")
  
  const [users,setUsers]=useState([])
  const navigate =useNavigate()
  const [progressbar,setProgreesBar]=useState("false")

    

const profilePicUpload=(e)=>{
  e.preventDefault()
  setFile(e.target.files[0])
  
  if(e.target.files[0]!==null){
   
    const imageRef=ref(storage,`users/${e.target.files[0].name}`)
    const uploadtask=uploadBytesResumable(imageRef,e.target.files[0])
    
    uploadtask.on("state_changed",
                  (snapshot)=>{},
                  (err)=>alert("error in uploading image"),
                  ()=>{
                    getDownloadURL(uploadtask.snapshot.ref).then((url)=>{
                      setProfilePic(url)
                      
                    })
                     
                  });
   
                             
  }

}



  const updateuser=async(e)=>{
    e.preventDefault()

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(username==="")
      { 
        return(alert("Enter Username"))
      }
      else if(username.length<5){
        return(alert("Name should contain atleast 5 character"))
      }
      if(email==="")
      { 
        return(alert("Enter email"))
      }
      else if(email.length<5){
        
        return(alert("Email should contain atleast 5 character"))
      }
      else if(!mailformat.test(email)){
        return(alert("Email is not valid"))
      }
      
      
      if(isAdmin==="0")
      { 
        return(alert("Select Role for this user"))
      }
      
      if(profilePic==="") 
      {
        setProfilePic("https://firebasestorage.googleapis.com/v0/b/netflix-f3af8.appspot.com/o/noimage.png?alt=media&token=29505b09-340e-4977-a49a-f33cd01402b3")
      }
    
    try {
      setProgreesBar("true")
      const res = await axios.put(`${process.env.REACT_APP_API}/api/users/${params.userid}`,{username,email,profilePic,isAdmin}, {
        headers: {
          
          token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
        },
      });

      
      if(res.data.success){
      setUser({username:username,
              email:email,
              profilePic:profilePic,
              isAdmin:JSON.parse(isAdmin),})
              setProgreesBar("false")
              alert(res.data.message)     
      }
      else{
        setProgreesBar("false")
        alert(res.data.message)
      }
    } catch (error) {
      setProgreesBar("false")
      alert("Error in updating user")
    }

    
  }
  const getuser=async()=>{

    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/users/find/${params.userid}`, {
          headers: {
           
            token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
          },
        });
          setUser(res.data.user);
          setUsername(res.data.user.username)
          setEmail(res.data.user.email)
          setisAdmin(res.data.user.isAdmin)
          setProfilePic(res.data.user.profilePic)
          
      } catch (err) {
        console.log(err);
      }   
}

useEffect(() => {
  getuser();
}, []);


  return (
    <div className={`user ${progressbar}`}>
      
      {
        progressbar==="true"?<CircularProgress className={progressbar} disableShrink/>:
        <>
         <Sidebar/>
      <div className='usercontainer'>
        <Navbar/>
        <div className='top'>
          <div className='left'>
            
            <h1 className='title'>Information</h1>
            <div className='item'>
              <img src={user.profilePic? user.profilePic : "https://firebasestorage.googleapis.com/v0/b/netflix-f3af8.appspot.com/o/noimage.png?alt=media&token=29505b09-340e-4977-a49a-f33cd01402b3"} alt="item" className='itemimg'/>
              
              <div className='details'>
                  <h1 className='itemtitle'>{user.username}</h1>
                  <div className='detailitem'>
                    <span className='itemkey'>Email:</span>
                    <span className='itemvalue'>{user.email}</span>
                  </div>
                  <div className='detailitem'>
                    <span className='itemkey'>Admin:</span>
                    <span className='itemvalue'>{user.isAdmin ? "True" : "False" }</span>
                  </div>
                  
              </div>
              
            </div>
          </div>
          <div className='right'>
            <div className='leftimg'>
              <img src={profilePic? profilePic :"https://firebasestorage.googleapis.com/v0/b/netflix-f3af8.appspot.com/o/users%2Fno_image.png?alt=media&token=f8044609-d880-4171-b9fc-dc32e184a59c" } alt='no'/>`
              
            </div>
            <div className='rightinfo'>
              <div className='title'>Update information</div>
              <form >
                <div className='formfileuploadinput'>
                  <label htmlFor='file' className='uploadicon'>
                    {file ? "Upload" : "Upload New Image"}
                    
                    {/* URL.createObjectURL    */}
                  </label>
                  <input type='file'  id="file" onChange={e=>(profilePicUpload(e))}  required style={{display:"none"}}/>
                  
                </div>
                
                <div className='forminput' >
                  <label>User Name</label>
                  <input type="text" placeholder="Enter User Name" className='input' value={username} onChange={e=>setUsername(e.target.value)} required />
                </div>
                <div className='forminput' >
                  <label>Email</label>
                  <input type="text" placeholder="Enter Email" className='input' value={email} onChange={e=>setEmail(e.target.value.toLocaleLowerCase())} required/>
                </div>
                
               
                
                <div className='forminput'>
                <label>Admin Role</label>
                <select
                  className="input"
                  value={isAdmin}
                  onChange={(e) => setisAdmin(e.target.value)}
                >
                  <option value="0">Select Role</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                </div>
                
                <button type='submit' onClick={e=>updateuser(e)}>Update</button>
              </form>
            </div>
          </div>
        </div>
        
        {/* <div className='bottom'>
          <h1 className='tittle'> Users List</h1>
          <List userColumns={userColumns} userRows={users}/>
        </div> */}
      </div>
        </>
      }
     
    </div>
  )
}

export default User