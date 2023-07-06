import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from '../../components/datatable/Datatable';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./listlist.scss"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ListList = () => {
    const [lists,setLists]=useState([])
    
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
    
    const deleteList=async(e,id)=>{
          e.preventDefault()
          
          try {
            const confirmation= window.confirm("Are you sure you want to delete this List?")
           if(confirmation===true){
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/lists/${id}`, {
              headers: {
               
                token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
              },
            });
            
            getList()
           }
           
            
          } catch (err) {
            console.log(err);
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
        <div className='listlist'>
          <Sidebar/>
          <div className='listlistcontainer'>
            <Navbar/>
            <Datatable Columns={Columns} Rows={lists} title={"Add New Movie"} page={"lists"}/>
          </div>
        </div>
      )
    
    
}


export default ListList