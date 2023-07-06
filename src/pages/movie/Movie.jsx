import React, { useEffect, useState  } from 'react'
import "./movie.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from '../../components/list/List';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import {storage} from "../../firebase"
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { create } from '@mui/material/styles/createTransitions';
import { CircularProgress } from '@mui/material';
const Movie = () => {
        const[noimage,setNoimage]=useState("https://firebasestorage.googleapis.com/v0/b/netflix-f3af8.appspot.com/o/users%2Fno_image.png?alt=media&token=f8044609-d880-4171-b9fc-dc32e184a59c");
        const params = useParams();
        const[title,setTitle]=useState("")
        const[desc,setDesc]=useState("")
        const[img,setImg]=useState("")
        const[imgTitle,setImgTitle]=useState("")
        const[imgSm,setImgSm]=useState("")
        const[trailer,setTrailer]=useState("")
        const[video,setVideo]=useState("")
        const[year,setYear]=useState(0)
        const[limit,setLimit]=useState(0)
        const[genre,setGenre]=useState("0")
        const[isSeries,setIsSeries]=useState("0")
        const[uploading,setUploading]=useState(false)
        const[imgFile,setImgFile]=useState(null)
        const[imgTitleFile,setImgTitleFile]=useState(null)
        const[imgSmFile,setImgSmFile]=useState(null)
        const[trailerFile,setTrailerFile]=useState(null)
        const[videoFile,setVideoFile]=useState(null)
        const [trailerprogress,setTrailerProgress]=useState(0);
    const [videoprogress,setVideoProgress]=useState(0);
    const [imgprogress,setImgProgress]=useState(0);
    const [imgSmprogress,setImgSmProgress]=useState(0);
    const [imgTitleprogress,setImgTitleProgress]=useState(0);


        const [movie,setMovie]=useState({})
        const [movies,setMovies]=useState([])
        const navigate =useNavigate() 

    
      const setinput=(e)=>{
        e.preventDefault()
        if(e.target.value<0){e.target.value=0}
        if(e.target.name==="limit") setLimit(e.target.value)
        if(e.target.name==="year") setYear(e.target.value)
      }
      

    const profilePicUpload=(e,filetype)=>{
        e.preventDefault()
        setUploading(true)
        
        let today=new Date();
          const time=today.toString().split(" ")
          let date=time[0]+ "-" + time[1]+"-"+time[2]+"-"+time[3]+"-"+time[4]
          let path
        if(title!=="")
        {
           path='/movie/' + title + "/" 
        }
        else{
          return(alert("first Select Title"))
        }
        
        
        if(e.target.files[0]!==null){
          
          if(filetype==="mainimage"){
              setImgFile(e.target.files[0])

          }
          if(filetype==="thumbnail"){
              setImgSmFile(e.target.files[0])
          }
          if(filetype==="titleimage"){
              setImgTitleFile(e.target.files[0])
          }
          if(filetype==="video"){
              setVideoFile(e.target.files[0])
              
          }
          if(filetype==="trailer"){
              setTrailerFile(e.target.files[0])
              
          }
          
        
         const filepath=path + filetype+"-" + date +"-"+ e.target.files[0].name
          // const imageRef=ref(storage,`${path +date +"-"+ e.target.files[0].name}`)
          const imageRef=ref(storage,filepath)
          const uploadtask=uploadBytesResumable(imageRef,e.target.files[0])
          
          uploadtask.on("state_changed",
                        (snapshot)=>{
                          const prog=(snapshot.bytesTransferred/snapshot.totalBytes)*100
                          if(filetype==="video") setVideoProgress(prog)
                          if(filetype==="trailer") setTrailerProgress(prog)
                          if(filetype==="mainimage") setImgProgress(prog)
                          if(filetype==="thumbnail") setImgSmProgress(prog)
                          if(filetype==="titleimage") setImgTitleProgress(prog)
                        },
                        (err)=>console.log("error in uploading image"),
                        ()=>{
                          getDownloadURL(uploadtask.snapshot.ref).then((url)=>{
                            
                          if(filetype==="mainimage"){
                              setImg(url)
                              
                
                          }
                          if(filetype==="thumbnail"){
                              setImgSm(url)
                              
                          }
                          if(filetype==="titleimage"){
                              setImgTitle(url)
                              
                          }
                          if(filetype==="video"){
                              setVideo(url)
                              
                              
                          }
                          if(filetype==="trailer"){
                              setTrailer(url)
                              
                              
                          }
                            
                          setUploading(false)
                          })
                           
                        }); 
                        
                        
        }       
      }
      
      
        

        const updatemovie=async(e)=>{
          e.preventDefault()
          if(title==="" )
          { 
            return(alert("Enter Title"))
            
          }
          else if(title.length<5){
            return(alert("Title should contain atleast 5 character"))
          }
          if(desc==="" )
          { 
            return(alert("Enter Description" ))
          }
          else if(desc.length<5){
            return(alert("Description should contain atleast 5 character" ))
          }
          if(year===0 ||year==="") 
          {
            return(alert("Enter Year"))
          }
          else if(year<1900||year>new Date().getFullYear()){
            return(alert(`Enter valid Year between 1900-${new Date().getFullYear()}`))
            
          }
          if(limit===0 ||limit==="") 
          {
            return(alert("Enter Age limit "))
          }
          else if(limit>110||limit<1){
            return(alert("Enter valid Age limit"))
          }

          if(genre==="0") 
          {
            return(alert("Enter genre"))
          }
          
          if(isSeries==="0")
          { 
            return(alert("select Type of movie"))
          }
          if(img==="") 
          {
            alert(img)
            return(alert("Upload Main Image"))
          }
          if(imgSm==="") 
          {
            return(alert("Upload Thumbnail Image"))
          }
          if(imgTitle==="") 
          {
            return(alert("Upload Title Image"))
          }
          if(video==="") 
          {
            return(alert("Upload Video"))
          }
          if(trailer==="") 
          {
            return(alert("Upload Trailer"))
          }
          
         
           try {

            const res = await axios.put(`${process.env.REACT_APP_API}/api/movies/${params.movieid }`,{title,desc,img,imgSm,imgTitle,video,trailer,year,limit,genre,isSeries}, {
              headers: {
               
                token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
              },
            });
      
            
            if(res.data.success){
            setMovie(res.data.savedMovie)
            alert(res.data.message)
              navigate("/movies") 
            }
            else{
              alert(res.data.message)
            }
          } catch (error) {
            console.log(error)
          }
      
        }


        const getmovie=async()=>{
      
          try {
              const res = await axios.get(`${process.env.REACT_APP_API}/api/movies/find/${params.movieid}`, {
                headers: {
                
                  token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
                },
              });
                setTitle(res.data.movie.title);
                setDesc(res.data.movie.desc)
                setGenre(res.data.movie.genre);
                setImg(res.data.movie.img)
                setImgSm(res.data.movie.imgSm);
                setImgTitle(res.data.movie.imgTitle)
                setIsSeries(res.data.movie.isSeries);
                setLimit(res.data.movie.limit)
                setTrailer(res.data.movie.trailer);
                setVideo(res.data.movie.video)
                setYear(res.data.movie.year)
                
                
            } catch (err) {
              console.log(err);
            }   
      }
      
      useEffect(() => {
        getmovie();
      }, []);
      
      
        return (
          <div className='movie'>
            <Sidebar/>
            <div className='moviecontainer'> 
              <Navbar/>
              <div className='top'>
                <div className='left'>
                  <div className='leftitem'>
                    <p className='leftitemheading'>Main image</p>
                    <img  className='leftitemimage' src={img}/>
                  </div>
                  <div className='leftitem'>
                    <p className='leftitemheading'>Small image</p>
                    <img  className='leftitemimage' src={imgSm}/>
                  </div>
                  <div className='leftitem'>
                    <p className='leftitemheading'>Title image</p>
                    <img  className='leftitemimage' src={imgTitle}/>
                  </div>
                  
                  <div className='leftitem'>
                    <p className='leftitemheading'>Traile Video</p>
                    <video  className='leftitemimage' src={trailer}/>
                  </div>
                  <div className='leftitem'>
                    <p className='leftitemheading'>Video</p>
                    <video  className='leftitemimage' src={video}/>
                  </div>
                </div>
               
                <div className='right'>
                 
                  <div className='rightinfo'>
                    <div className='title'> Update Information</div>
                    <form >
                     
                     <div className='forminput' >
                        <label>Title</label>
                        <input type="text" placeholder="Enter Title"  name="Title" className='input' value={title} onChange={e=>setTitle(e.target.value)} />
                      </div>

                      <div className='forminput' >
                        <label>description</label>
                        <input type="text" placeholder="Enter Descreption" className='input' value={desc} onChange={e=>setDesc(e.target.value)} />
                      </div>


                      <div className='forminput' >
                        <label>Year</label>
                        <input type="number"  name='year' className='input' value={year} onChange={e=>setinput(e)} />
                      </div>
                      
                      <div className='forminput' >
                        <label>Age Limit</label>
                        <input type="number" name='limit' className='input' value={limit} onChange={e=>setinput(e)} />
                      </div>
                      
                      <div className='forminput'>
                      <label>Genre</label>
                      <select
                        className="input"
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
                        value={isSeries}
                        onChange={(e) => setIsSeries(e.target.value)}
                      >
                        <option value="0">Select type</option>
                        <option value="true">Movie</option>
                        <option value="false">series</option>
                      </select>
                      </div>

                        <label htmlFor='mainImage' className='uploadicon'>
                          {imgFile ? imgFile.name : "Upload Main Image"}
                          <CircularProgress className='progressbar' variant='determinate' value={imgprogress}/>
                        </label>
                        <input type='file'  id="mainImage" onChange={e=>(profilePicUpload(e,"mainimage"))}  accept='image/*'  style={{display:"none"}}/>
                        
                     
                     
                        <label htmlFor='imageSmall' className='uploadicon'>
                          {imgSmFile ? imgSmFile.name : "Upload Small Icon Image"} 
                          <CircularProgress className='progressbar' variant='determinate' value={imgSmprogress}/>
                        </label>
                        <input type='file'  id="imageSmall" onChange={e=>(profilePicUpload(e,"thumbnail"))} accept='image/*'  style={{display:"none"}}/>
                        
                      
                      
                        <label htmlFor='imageTitle' className='uploadicon'>
                          {imgTitleFile ? imgTitleFile.name : "Upload title Image"}
                          <CircularProgress className='progressbar' variant='determinate' value={imgTitleprogress}/>
                          </label>
                        <input type='file'  id="imageTitle" onChange={e=>(profilePicUpload(e,"titleimage"))} accept='image/*'  style={{display:"none"}}/>
                        
                      
                        <label htmlFor='trailer' className='uploadicon'>
                          {trailerFile ? trailerFile.name : "Upload Trailer"}
                          <CircularProgress className='progressbar' variant='determinate' value={trailerprogress}/>
                         </label>
                        <input type='file'  id="trailer" onChange={e=>(profilePicUpload(e,"trailer"))} accept='video/*'  style={{display:"none"}}/>
                        
                     
                        <label htmlFor='video' className='uploadicon' >
                          {videoFile ? videoFile.name : "Upload Video"}
                          <CircularProgress className='progressbar' variant='determinate' value={videoprogress}/>
                        </label>
                        <input type='file'  id="video" onChange={e=>(profilePicUpload(e,"video"))}  accept='video/*'   style={{display:"none"}}/>
                        
                      
                      
                      <button type='submit' className={uploading} disabled={uploading} onClick={e=>updatemovie(e)}>{uploading? "Uploading...":"Update"} </button>
                     
                     
                     
                    </form>
                  </div>
                </div>
              </div>
              
              {/* <div className='bottom'>
                <h1 className='tittle'> Movie List</h1>
                <List userColumns={userColumns} userRows={movies}/>
              </div> */}
            </div>
          </div>
        )
      
}

export default Movie

