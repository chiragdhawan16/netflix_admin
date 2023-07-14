import React from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
// import Table from "../../components/list/List";
// import { useAuth } from "../../context/auth";





const Home = () => {
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user"/>
          <Widget type="lists"/>
          <Widget type="movies"/>
          {/* <Widget type="balance"/> */}
        </div>
        <div className="charts">
          <Featured/>
          <Chart aspect={2/1} title="User Joined in last 6 Month " />
        </div>
        
        
      </div>
    </div>
  );
};

export default Home;
