import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from '../../components/datatable/Datatable';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./listlist.scss"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CircularProgress } from '@mui/material';

const ListList = () => {
    const [lists,setLists]=useState([])
    const [progressbar,setProgreesBar]=useState("false")
    
    const getList=async()=>{

        try {
          setProgreesBar("true")
            const res = await axios.get(`${process.env.REACT_APP_API}/api/lists`, {
              headers: {                
                 token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
              },
            });
            
              setLists(res.data.lists);
               setProgreesBar("false")
             
          } catch (err) {
            console.log(err);
             setProgreesBar("false")
          }   
    }
    
    useEffect(() => {
        getList();
      }, []);
    
    const deleteList=async(e,id)=>{
          e.preventDefault()
          
          try {
            
            const confirmation= window.confirm("Are you sure you want to delete this List?")
           if(confirmation===true){
            setProgreesBar("true")
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/lists/${id}`, {
              headers: {
               
                token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
              },
            });
            
            getList()
            setProgreesBar("false")
           }
           
          
            
          } catch (err) {
            console.log(err);
            setProgreesBar("false")
          }
    
    }
    
      const Columns=[
        //   { field: '_id', headerName: 'ID', width: 200, visibility:"hidden"},
        { field: 'title',headerName: 'Title',width: 230},
        { field: 'type', headerName: 'Type', width: 230 },
        { field: 'genre', headerName: 'Genre', width: 100 },
        {field: 'action', headerName: 'Delete List', width: 170,renderCell:(params)=>{
            return(
                <div className='cellaction'>
                  {/* <Link to={`/lists/${params.row._id}`} style={{textDecoration:"none"}}>
                   <div className='viewbutton'>View</div>
                   </Link> */}
                   <div className='deletebutton' onClick={e=>(deleteList(e,params.row._id))}><DeleteForeverIcon/></div>
                   
                </div>
            )
        }}
    ];
    
    
      return (
        <div className={`listlist ${progressbar}`}>
          
          {progressbar==="true"? <CircularProgress className={progressbar} disableShrink/>:
          <>
          <Sidebar/>
          <div className='listlistcontainer'>
            <Navbar/>
            <Datatable Columns={Columns} Rows={lists} title={"Add New Movie"} page={"lists"}/>
          </div>
          </>}
          
        </div>
      )
    
    
}


export default ListList