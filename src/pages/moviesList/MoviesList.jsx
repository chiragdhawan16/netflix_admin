import React, { useEffect, useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from '../../components/datatable/Datatable';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./movielist.scss"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const MoviesList = () => {
    
    const [movies,setMovies]=useState([])
    
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
          }   
    }
    
    useEffect(() => {
        getmovies();
      }, []);
    
    const deleteMovie=async(e,id)=>{
          e.preventDefault()
          
          try {
            const confirmation= window.confirm("Are you sure you want to delete this Movie?")
             if(confirmation===true){
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/movies/${id}`, {
              headers: {
               
                token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
              },
            });
            
            getmovies()
           }
           
            
          } catch (err) {
            console.log(err);
          }
    
    }
    
      const Columns=[
        //  { field: '_id', headerName: 'ID', width: 200, visibility:"hidden"},
        { field: 'movie',headerName: 'Movie',width: 230,
          renderCell:(params)=>{
              return(
                  <div className="cellwithimg">
                    <img className="cellimg" src={params.row.img ? params.row.img :"https://www.allianceplast.com/wp-content/uploads/no-image-1024x1024.png"} alt="avatar"/>
                    {params.row.title}
                  </div>
              )
          }
        },
        { field: 'desc', headerName: 'Description', width: 230 },
        { field: 'year', headerName: 'Year', width: 70 },
        { field: 'limit', headerName: 'Age', width: 70 },
        { field: 'genre', headerName: 'Genre', width: 100 },
        { field: 'isSeries', headerName: 'Movie/Series', width: 100 },
        {field: 'action', headerName: 'Action', width: 170,renderCell:(params)=>{
            return(
                <div className='cellaction'>
                  <Link to={`/movies/${params.row._id}`} style={{textDecoration:"none"}}>
                   <div className='viewbutton'><EditIcon/></div>
                   </Link>
                   <div className='deletebutton' onClick={e=>(deleteMovie(e,params.row._id))}><DeleteForeverIcon/></div>
                   
                </div>
            )
        }}
    ];
    
    
      return (
        <div className='movielist'>
          <Sidebar/>
          <div className='movielistcontainer'>
            <Navbar/>
            <Datatable Columns={Columns} Rows={movies} title={"Add New Movie"} page={"movies"}/>
          </div>
        </div>
      )
    
    
}

export default MoviesList