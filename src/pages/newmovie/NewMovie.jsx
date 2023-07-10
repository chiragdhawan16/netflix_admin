import React, {  useState  } from 'react'
import './newmovie.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {storage} from "../../firebase"
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { CircularProgress } from '@mui/material';

const NewMovie = () => {
    const[noimage,setNoimage]=useState("https://firebasestorage.googleapis.com/v0/b/netflix-f3af8.appspot.com/o/noimage.png?alt=media&token=29505b09-340e-4977-a49a-f33cd01402b3");
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
    const[uploading,setUploading]=useState(true)
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
    const [progressbar,setProgreesBar]=useState("false")

    const navigate =useNavigate() 


const profilePicUpload=(e,filetype)=>{
    e.preventDefault()
    
        
    let today=new Date();
      const time=today.toString().split(" ")
      let date=time[0]+ "-" + time[1]+"-"+time[2]+"-"+time[3]+"-"+time[4]
      let path
    if(title!=="")
    {
       path='/movie/' + title + "/" 
    }
    else{
      return(alert("First Select Title"))
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
                      
                      })
                       
                    });                                  
    }       
  }
  
  const setinput=(e)=>{
    e.preventDefault()
    
    if(e.target.value<0){e.target.value=0}
    if(e.target.name==="limit") setLimit(e.target.value)
    if(e.target.name==="year") setYear(e.target.value)
  }

    const uploadmovie=async(e)=>{
      e.preventDefault()

      if(title==="" )
      { 
        return(alert("Enter Title"))
        
      }
      else if(title.length<5){
        return(alert("Title should contain atleast 3 character"))
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
      else if(limit>120||limit<1){
        return(alert("Enter valid Age limit between 1-120"))
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
      
      setUploading(false)
      
    }


    const createmovie=async(e)=>{
      e.preventDefault()
       try {
        setProgreesBar("true")
        const res = await axios.post(`${process.env.REACT_APP_API}/api/movies/`,{title,desc,img,imgSm,imgTitle,video,trailer,year,limit,genre,isSeries}, {
          headers: {
           
            token: "Bearer "+ JSON.parse(localStorage.getItem("netflixauthadmin")).token,
          },
        });
  
        
        if(res.data.success){
          setProgreesBar("false")
        alert(res.data.message)
          navigate("/movies") 
        }
        else{
          setProgreesBar("false")
          alert(res.data.message)
        }
      } catch (error) {
        setProgreesBar("false")
        console.log(error)
        alert("Issue in creating movie")
      }
  
    }

    
    return (
      <div className={`newmovie ${progressbar}`}>
         <CircularProgress className={progressbar} disableShrink/>
        <Sidebar/>
        <div className='newmoviecontainer'>
          <Navbar/>
          <div className='top'>
          
          <div className='left'>
                  <div className='leftitem'>
                    <p className='leftitemheading'>Main image</p>
                    <img  className='leftitemimage' src={img ? img : noimage} />
                  </div>
                  <div className='leftitem'>
                    <p className='leftitemheading'>Small image</p>
                    <img  className='leftitemimage' src={imgSm ? imgSm : noimage}/>
                  </div>
                  <div className='leftitem'>
                    <p className='leftitemheading'>Title image</p>
                    <img  className='leftitemimage' src={imgTitle? imgTitle :noimage}/>
                  </div>
                 
                  <div className='leftitem '>
                    <p className='leftitemheading'>Traile Video</p>
                    {trailer?
                    <video  className='leftvideo' src={trailer}></video>
                    :<video  className='leftvideo'  src={trailer} poster={noimage}></video>
                    }
                    
                  </div>
                  <div className='leftitem'>
                    <p className='leftitemheading'>Video</p>
                    {video? <video  className='leftvideo' src={video}/>
                    :
                    <video  className='leftvideo' src={video} poster={noimage }/>
                    }
                    
                  </div>
                </div>
           
            <div className='right'>
             
              <div className='rightinfo'>
                <div className='title'> Create New Movie</div>
                <form >
                 
                 <div className='forminput' >
                    <label>Title</label>
                    <input type="text" placeholder="Enter Title"  name="title" className='input' value={title} onChange={e=>setTitle(e.target.value)} />
                  </div>

                  <div className='forminput' >
                    <label>description</label>
                    <input type="text" placeholder="Enter Descreption" name='descreption' className='input' value={desc} onChange={e=>setDesc(e.target.value)} />
                  </div>


                  <div className='forminput' >
                    <label>Year</label>
                    <input type="number" name='year'  className='input' value={year}  onChange={e=>setinput(e)}
                     />
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
                    
                  
                    <label htmlFor='video' className='uploadicon'>
                      {videoFile ? videoFile.name : "Upload Video"}
                      <CircularProgress className='progressbar' variant='determinate' value={videoprogress}/>
                    </label>
                    <input type='file'  id="video" onChange={e=>(profilePicUpload(e,"video"))}  accept='video/*'   style={{display:"none"}}/>
                    
                 
                  
                  {uploading ?
                  <button type='submit' className='button' onClick={e=>uploadmovie(e)}>Upload</button>
                  
                    :
                    <button type='submit' className='button' onClick={e=>createmovie(e)}>Create </button>
                    
                }
                 
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



export default NewMovie