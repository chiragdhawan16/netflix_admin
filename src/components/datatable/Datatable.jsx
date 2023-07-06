import React from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import {userRows} from '../../dataSource'
import { Link } from 'react-router-dom';





const Datatable = ({Columns,Rows,title,page}) => {
   
  return (
    <div className='datatable'>
      <div className='datatabletitle'>
        {title}
        <Link to={page?`/${page}/new`: ""} className='link'>Add New</Link>
        
      </div>
       <DataGrid
       getRowId={(row)=>row._id}
        rows={Rows}
        
        columns={Columns}
        initialState={{
          pagination:{
            paginationModel:{page:0,pageSize:9},
            
          },
        }}
        
         pageSizeOptions={[9,25,100]}
        
        checkboxSelection
      /> 
    </div>
  )
}

export default Datatable