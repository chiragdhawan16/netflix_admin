import React, { useEffect, useState } from 'react'
import './userslist.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from '../../components/datatable/Datatable';
import axios from "axios";
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


const UsersList = () => {
    const [users,setUsers]=useState([])

const getusers=async()=>{
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/users`, {
          headers: {
            // token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTEyOTNmY2RkZDkyNDRkYTgxZTQxOSIsImlhdCI6MTY4ODI4NDE1MiwiZXhwIjoxNjg4NzE2MTUyfQ.l6iAaha0ipUT2DGevHipaASorgi8lnKHgYZ1HWxyPr0",
            
             token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
          },
        });
         setUsers(res.data.users);
         
      } catch (err) {
        console.log(err);
      }   
}

useEffect(() => {
    getusers();
  }, []);

const deleteuser=async(e,id)=>{
      e.preventDefault()
      
      try {
        const confirmation= window.confirm("Are you sure you want to delete this user?")
       if(confirmation===true){
        const res = await axios.delete(`${process.env.REACT_APP_API}/api/users/${id}`, {
          headers: {
          
            token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
          },
        });
        
        getusers()
       }
       
        
      } catch (err) {
        console.log(err);
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
    <div className='userlist'>
      <Sidebar/>
      <div className='userlistcontainer'>
        <Navbar/>
        <Datatable Columns={Columns} Rows={users} title={"Add New User"} page={"users"}/>
      </div>
    </div>
  )
}

export default UsersList