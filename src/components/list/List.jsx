import React from 'react'
import './list.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const List = ({userColumns,userRows}) => {
  

  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow> 
        {/* {userColumns.map((column,index)=>(
            <TableCell className='tablecell'key={index} >{column}</TableCell>
           ))} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {userRows.map((row) => (
            <TableRow key={row._id}>
              
              <TableCell className='tablecell'>{row._id}</TableCell>
              <TableCell className='tablecell'>
                <div className='cellwrapper'>
                    <img src={row.profilePic} alt="" className='image'/>
                    {row.username}
                </div>
              </TableCell>
              <TableCell className='tablecell'>{row.email }</TableCell>
             
              <TableCell className='tablecell'>
                <span className={`status ${String(row.isAdmin)}`}>{String(row.isAdmin)}</span>
                
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default List