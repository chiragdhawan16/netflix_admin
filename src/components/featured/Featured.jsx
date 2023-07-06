import React from 'react'
import './featured.scss'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {CircularProgressbar} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Featured = () => {
  return (
    <div className='featured'>
      <div className="top">
        <h2 className="title">Total Revenue</h2>
        <MoreVertOutlinedIcon/>
      </div>
      <div className="bottom">
        <div className="featuredchart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
        </div>
        <p className='title'>Total Sales Made Today</p>
        <p className='amount'>$420</p>
        <p className='desc'>previou transaction dsfkds dsfksdnfx dsfkjnfa previou transaction dsfkds dsfksdnfx dsfkjnfa</p>
        <div className='summary'>
          <div className='item'>
            <div className='itemtitle'>traget</div>
            <div className='itemresult negative'>
              <KeyboardArrowUpOutlinedIcon fontSize='small'/>
              <div className='resultamount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemtitle'>Last Week</div>
            <div className='itemresult positive'>
              <KeyboardArrowDownOutlinedIcon fontSize='small'/>
              <div className='resultamount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemtitle'>Last Month</div>
            <div className='itemresult negative'>
              <KeyboardArrowDownOutlinedIcon fontSize='small'/>
              <div className='resultamount'>$12.4k</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Featured