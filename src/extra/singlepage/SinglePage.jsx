import React from 'react'
import './singlepage.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from '../../components/list/List';

const SinglePage = () => {
  return (
    <div className='single'>
      <Sidebar/>
      <div className='singlecontainer'>
        <Navbar/>
        <div className='top'>
          <div className='left'>
            <div className='editbutton'>Edit</div>
            <h1 className='title'>information</h1>
            <div className='item'>
              <img src="https://m.media-amazon.com/images/M/MV5BZDk1ZmU0NGYtMzQ2Yi00N2NjLTkyNWEtZWE2NTU4NTJiZGUzXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_.jpg" alt="item" className='itemimg'/>
              
              <div className='details'>
                  <h1 className='itemtitle'>chirag</h1>
                  <div className='detailitem'>
                    <span className='itemkey'>Email:</span>
                    <span className='itemvalue'>chiragdhawan16@gmailcom</span>
                  </div>
                  <div className='detailitem'>
                    <span className='itemkey'>phone:</span>
                    <span className='itemvalue'>9546546546</span>
                  </div>
                  <div className='detailitem'>
                    <span className='itemkey'>Address:</span>
                    <span className='itemvalue'>212121@gmailcom</span>
                  </div>
                  <div className='detailitem'>
                    <span className='itemkey'>Country:</span>
                    <span className='itemvalue'>India@gmailcom</span>
                  </div>
              </div>
              
            </div>
          </div>
          <div className='right'>
            <Chart aspect={3/1} title={"USer Spending (Last 6 Months)"}/>
          </div>
        </div>
        
        <div className='bottom'>
          <h1 className='tittle'> Last Transaction</h1>
          <List/>
        </div>
      </div>
    </div>
  )
}

export default SinglePage