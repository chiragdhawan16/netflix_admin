import React from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import BorderAllIcon from '@mui/icons-material/BorderAll';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';


const Sidebar = () => {
    const[auth,setAuth]=useAuth();
    const logout=(e)=>{
        e.preventDefault()
        setAuth({
          ...auth,
          user:null,
          token:''
      })
      localStorage.removeItem('netflixauthadmin')
    
      }
  return (
    <div className='sidebar'>
        <div className='top'>
            <Link to="/" style={{textDecoration:"none"}}>
            <span className='logo'>Chirag Admin</span>
            </Link>
        </div>
        {/* <hr/> */}
        <div className='center'>
            <ul>
                <Link to="/" style={{textDecoration:"none"}}>
                <li>
                    <DashboardIcon className='icon'/>
                    <span>Dashborad</span>
                </li>
                </Link>
                <p className='title'>USERS</p>
                <Link to="/users" style={{textDecoration:"none"}}>
                <li>
                    <PeopleOutlineOutlinedIcon className='icon'/>
                    <span>All Users</span>
                </li>
                </Link>
                <Link to="/users/new" style={{textDecoration:"none"}}>
                <li>
                    <InventoryIcon className='icon'/>
                    <span>Add New User</span>
                </li>
                </Link>
               
                <p className='title'>Movies</p>
                <Link to="/movies" style={{textDecoration:"none"}}>
                <li>
                    <BorderAllIcon className='icon'/>
                    <span>All Movies</span>
                </li>
                </Link>
                <Link to="/movies/new" style={{textDecoration:"none"}}>
                <li>
                    <InventoryIcon className='icon'/>
                    <span>Add  Movie</span>
                </li>
                </Link>
                <p className='title'>MOVIES LIST</p>
                <Link to="/lists" style={{textDecoration:"none"}}>
                <li>
                    <BorderAllIcon className='icon'/>
                    <span>All Lists</span>
                </li>
                </Link>
                <Link to="/lists/new" style={{textDecoration:"none"}}>
                <li>
                    <InventoryIcon className='icon'/>
                    <span>Add  New List</span>
                </li>
                </Link>
                
                <p className='title'>USER</p>
                <li>
                    <AccountCircleIcon className='icon'/>
                    <span>Profile</span>
                </li>
                <li onClick={e=>(logout(e))}>
                    <LogoutIcon className='icon'/>
                    <span >Logout</span>
                </li>
            </ul>
        </div>
        {/* <div className='bottom'>
            <div className='coloroptions'></div>
            <div className='coloroptions'></div>
            
        </div> */}
    </div>
  )
}

export default Sidebar