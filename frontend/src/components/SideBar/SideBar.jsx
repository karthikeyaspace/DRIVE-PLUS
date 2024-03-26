import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'

export default function SideBar() {


  return (
    <div className="sidebar">
      <div className="sidebardiv">

        <div className="dropdown">
          <button className='dropbtn'>+ New</button>
          <div className="dropdown-content">

            <div className="dropdown-content">
              <div className="askBar-item">
                <Link to='/api/collections'><h4>New Collection</h4></Link>
              </div>
              <div className="askBar-item">
                <Link to='/api/collections/none/upload'><h4>New File</h4></Link>
              </div>
            </div>

          </div>
        </div>
        <div className="sidebar-contents">
          <div className="sidebar-item">
            <Link to='/'><h4>Home</h4></Link>
          </div>
          <div className="sidebar-item">
            <Link to='/api/collections'><h4>My Collections</h4></Link>
          </div>
          <div className="sidebar-item">
            <Link to='/'><h4>Trash</h4></Link>
          </div>
          <div className="sidebar-item">
            <Link to='/'><h4>Storage</h4></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
