import React, { useEffect, useState } from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import ViewListIcon from '@mui/icons-material/ViewList';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Money } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Widget = ({type}) => {
    let data;
   
    const [users,setUsers]=useState([])
    const [movies,setMovies]=useState([])
    const [lists,setLists]=useState([])

    // alert(process.env)
    const getusers=async()=>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/users`, {
              headers: {
                // token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTEyOTNmY2RkZDkyNDRkYTgxZTQxOSIsImlhdCI6MTY4ODI4NDE1MiwiZXhwIjoxNjg4NzE2MTUyfQ.l6iAaha0ipUT2DGevHipaASorgi8lnKHgYZ1HWxyPr0",
                
                 token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
              },
            });
            console.log(res.data)
             setUsers(res.data.users);
             
          } catch (err) {
            console.log(err);
          }   
    }
    
    
    const getmovies=async()=>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/movies`, {
              headers: {                
                 token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
              },
            });
             setMovies(res.data.movies);
             
          } catch (err) {
            console.log(err);
          }   }

    
    
    const getList=async()=>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/lists`, {
              headers: {                
                 token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
              },
            });
            
              setLists(res.data.lists);
             
          } catch (err) {
            console.log(err);
          }   
    }
    
    useEffect(() => {
        getList();
      }, []);
   
    
    useEffect(() => {
        getmovies();
      }, []);
    
    useEffect(() => {
        getusers();
      }, []);

    switch(type){
        case "user":
            data={
                title:"USERS",
                total:users?.length? users?.length: "0" ,
                link:"See All Users",
                linkvalue:"/users/",
                diff:20,
                icons:(
                    <PersonOutlineIcon className='icon' style={{
                        color:"crimpson",
                        backgroundColor:"rgba(255, 0, 0, 0.378)",
                    }}/>
                )
            };
            break;
        case "lists":
            data={
                title:"LISTS",
                total:lists?.length ? lists?.length : "0",
                link:"See All Lists",
                linkvalue:"/lists/",
                diff:30,
                icons:(
                    <ViewListIcon className='icon' style={{
                        color:"goldenrod",
                        backgroundColor:"rgba(218, 165, 32, 0.533)",
                    }}/>
                )
            };
            break;
        case "movies":
            data={
                title:"MOVIES",
                total:movies?.length ? movies?.length : "0",
                link:"See All Movies",
                linkvalue:"/movies/",
                diff:40,
                icons:(
                    <LiveTvIcon className='icon' style={{
                        color:"green",
                        backgroundColor:"rgba(0, 128, 0, 0.412)",
                    }}/>
                )
            };
            break;
            
        
        default:
            break;
    
    }
  return (
    <div className='widget'>
        <div className='left'>
            <span className='title'>{data.title}</span>
            <span className='counter'>{data.total}</span>
            <span className='link'><Link to={data.linkvalue} style={{textDecoration:"none"}}>{data.link}</Link></span>
        </div>
        <div className='right'>
            <div className='percentage negative'>
                <KeyboardArrowUpIcon/>
                {data.diff}%
            </div>
            {data.icons}
        </div>
    </div>
  )
}

export default Widget