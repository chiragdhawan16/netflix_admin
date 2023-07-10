import React, { useEffect, useState  } from 'react'
import './newlist.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import {storage} from "../../firebase"
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { CircularProgress } from '@mui/material';


const NewList = () => {
  const[noimage,setNoimage]=useState("https://firebasestorage.googleapis.com/v0/b/netflix-f3af8.appspot.com/o/users%2Fno_image.png?alt=media&token=f8044609-d880-4171-b9fc-dc32e184a59c");
    const params = useParams();
    const[title,setTitle]=useState("")
    const[type,setType]=useState("0")
    const[genre,setGenre]=useState("0")
    const[content,setContent]=useState([])
    const [list,setList]=useState({})
    const navigate =useNavigate() 
    const[movietitles,setMovieTitles]=useState([])
    const [movies,setMovies]=useState([])
    const [progressbar,setProgreesBar]=useState("false")
    
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
    


    const createlist=async(e)=>{
      e.preventDefault()
      if(title==="" )
      { 
        return(alert("Enter Title"))
        
      }
      else if(title.length<5){
        return(alert("Title should contain atleast 5 character"))
      }
      
      if(genre==="0" ) 
      {
        return(alert("Select any genre "))
      }
      if(type==="0" ) 
      {
        return(alert("Select Type of list "))
      }
       if(content.length<10)   {
        return(alert("Please Select atleast 10 Movies "))
       }   
       try {
       setProgreesBar("true")
        const res = await axios.post(`${process.env.REACT_APP_API}/api/lists/`,{title,type,genre,content}, {
          headers: {
           
            token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
          },
        });
        
        if(res.data.success){
        setList(res.data.savedList)
        setProgreesBar("false")
         alert(res.data.message) 
          navigate("/lists") 
        }
        else{
          setProgreesBar("false")
           alert(res.data.message) 
        }
      } catch (error) {
        console.log(error)
        setProgreesBar("false")
        alert("Issue in creating list")
      }
  
    }

    const handleselect=(e)=>{

       let value=Array.from(e.target.selectedOptions, (option)=>option.value);
      setContent(value)
      let value1=Array.from(e.target.selectedOptions, (option)=>option.label);
      setMovieTitles(value1)

    }



    
    return (
      <div className={`newlist ${progressbar}`}>
        <CircularProgress className={progressbar} disableShrink/>
        <Sidebar/>
        <div className='newmoviecontainer'>
          <Navbar/>
          <div className='top'>
            <div className='left'>
              <div className='lefttitle'>Movies Selected</div>
              <div  className='leftitem'>
              {movietitles.map((movie,index)=>(
                    <label key={index} >{index+1}. {movie}</label>
                  ))}
              </div>
            
                    
                    
            </div>
           
            <div className='right'>
             
              <div className='rightinfo'>
                <div className='title'>Add New List</div>
                <form>
                 
                 <div className='forminput' >
                    <label>Title</label>
                    <input type="text" placeholder="Enter Title"  name="Title" className='input' value={title} onChange={e=>setTitle(e.target.value)} />
                  </div>
                  
                  <div className='forminput'>
                  <label>Genre</label>
                  <select
                    className="input"
                    name='genre'
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <option value="0">Select Genre</option>
                    <option value="comedy">comedy</option>
                    <option value="serious">serious</option>
                  </select>
                  </div>

                  <div className='forminput'>
                  <label>Type</label>
                  <select
                    className="input"
                    name='type'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="0">Select type</option>
                    <option value="movie">Movie</option>
                    <option value="series">series</option>
                  </select>
                  </div>

                  <div className='selectmovies'>
                  <label>Select Movies</label>
                  <select
                    className="input"
                    multiple={true}
                    name='movies'
                    // value={content}
                     onChange={(e) => handleselect(e)}
                  >
                  {movies.map((movie)=>(
                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                  ))}
                    
                    
                  </select>
                  </div>

                  
                  
                    
                  <button type='submit' onClick={createlist}  >Create</button>
                 </form>  
                  
          
          {/* <div className='bottom'>
            <h1 className='tittle'> Movie List</h1>
            <List userColumns={userColumns} userRows={movies}/>
          </div> */}
        </div>
            </div>
          </div>
        </div>
      </div>
    )
  
}



export default NewList