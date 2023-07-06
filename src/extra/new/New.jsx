import React, { useState } from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './new.scss'
import FileUploadIcon from '@mui/icons-material/FileUpload';

const New = ({inputs,title}) => {
  
  const [file,setFile]=useState("");
  
  return (
    <div className='new'>
      <Sidebar/>
      <div className='newcontainer'>
        <Navbar/>
        <div className='top'> 
            <h1 className='title'>{title}</h1>
        </div>
        <div className='bottom'> 
            <div className='left'>
              <img src={file? URL.createObjectURL(file):'https://th.bing.com/th/id/OIP.vDf037OKUo0H03weRxdWuAHaHa?pid=ImgDet&rs=1'} alt='no'/>
            </div>
            <div className='right'>
              <form>
                <div className='forminput'>
                  <label htmlFor='file'>
                    Image<FileUploadIcon className='icon'/>
                  </label>
                  <input type='file'  id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/>
                </div>
                {inputs.map((input)=>(
                <div className='forminput' key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder}/>
                </div>
                ))}
                <button>Send</button>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default New