// src/Layout.jsx
import React from 'react';
import {
  FiArchive,
  FiBook,
  FiUsers,
  FiGlobe,
  FiDatabase,
  FiBarChart2,
  FiList
} from 'react-icons/fi';
import { IoHomeOutline,IoAnalytics } from "react-icons/io5";
import { CgInsights } from "react-icons/cg";
import { NavLink, Outlet } from 'react-router-dom';
import './css/global.css'; 
import Footer from '../components/Footer'; 

export default function Layout() {
  return (
    <div className="layout-wrapper">
      <header className="navbar">
        
        <div className="logo">
          <CgInsights style={{ marginRight: 7, fontSize: "1.15em", verticalAlign: "middle" }} />
          EP-MOOCX
        </div>
        
        
        <ul className="nav-links">
          <li><NavLink to="/" end><IoHomeOutline /> Trang chủ</NavLink></li>
          <li>
            <NavLink to="/dataset" className={({isActive})=>isActive?'active':''}>
              <IoAnalytics /> Dashboard
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/dashboard" className={({isActive})=>isActive?'active':''}>
              <FiList /> Dashboard dataset
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/results" className={({isActive})=>isActive?'active':''}>
              <FiBarChart2 /> Mô hình
            </NavLink>
          </li>
          <li>
            <NavLink to="/detail" className={({isActive})=>isActive?'active':''}>
              <FiList /> Chi tiết Khóa học
            </NavLink>
          </li>
        </ul>
        
      </header>

      <main className="container">
        {/* React Router sẽ render trang con ở đây */}
        <Outlet />
      </main>
      <Footer />
     </div>
  );
}
