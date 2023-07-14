import React, { useEffect, useState } from 'react'
import './userslist.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from '../../components/datatable/Datatable';
import axios from "axios";
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from '@mui/material';


const UsersList = () => {
    const [users,setUsers]=useState([])
    const [progressbar,setProgreesBar]=useState("false")

const getusers=async()=>{
    try {
      setProgreesBar("true")
        const res = await axios.get(`${process.env.REACT_APP_API}/api/users`, {
          headers: {
             token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
          },
        });
         setUsers(res.data.users);
         setProgreesBar("false")
         
      } catch (err) {
        console.log(err);
        setProgreesBar("false")
      }   
}

useEffect(() => {
    getusers();
  }, []);

const deleteuser=async(e,id)=>{
      e.preventDefault()
      
      try {
        const confirmation= window.confirm("Are you sure you want to delete this user?")
       if(confirmation==="true"){
        setProgreesBar("true")
        const res = await axios.delete(`${process.env.REACT_APP_API}/api/users/${id}`, {
          headers: {
          
            token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
          },
        });
        
        getusers()
        setProgreesBar("false")
       }
       
        
      } catch (err) {
        console.log(err);
        setProgreesBar("false")
      }

}

  const Columns=[
    // { field: '_id', headerName: 'ID', width: 270 },
    { field: 'username',headerName: 'User',width: 230,
      renderCell:(params)=>{
          return(
              <div className="cellwithimg">
                <img className="cellimg" src={params.row.profilePic ? params.row.profilePic :"https://www.allianceplast.com/wp-content/uploads/no-image-1024x1024.png"} alt="avatar"/>
                {params.row.username}
              </div>
          )
      }
    },
    { field: 'email', headerName: 'Email', width: 230 },
    {field: 'action', headerName: 'Action', width: 170,renderCell:(params)=>{
        return(
            <div className='cellaction'>
              <Link to={`/users/${params.row._id}`} style={{textDecoration:"none"}}>
               <div className='viewbutton'><EditIcon/></div>
               </Link>
               <div className='deletebutton' onClick={e=>(deleteuser(e,params.row._id))}><DeleteForeverIcon/></div>
               
            </div>
        )
    }}
];


  return (
    <div className={`userlist ${progressbar}`}>
      {progressbar==="true"?<CircularProgress className={progressbar} disableShrink/>:
      <>
      <Sidebar/>
      <div className='userlistcontainer'>
        <Navbar/>
        <Datatable Columns={Columns} Rows={users} title={"Add New User"} page={"users"}/>
      </div>
      </>
      }
      
    </div>
  )
}

export default UsersList