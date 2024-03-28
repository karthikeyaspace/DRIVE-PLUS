import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SideBar.css'
import { userContext } from '../../context-api/userContext'
import axios from 'axios'
import uniqueId from './uniqueId'

export default function SideBar() {

  const {user} = useContext(userContext)
  const navigate = useNavigate()
  const inputfield = document.querySelector('.popup-input');

  const handleClick = async(e) => {
    e.preventDefault();
    const collectionName = inputfield.value;
    const collectionData = {
      collectionName: collectionName,
      collectionId: uniqueId(),
      username: user,
      isPublic: false,
      files: []
    }

    

    await axios.post(`http://localhost:6969/api/${user}/collections/`, collectionData)
    .then(res => {
      console.log(res.data)
      inputfield.value = ""
      document.querySelector('.close').click()
      navigate(`/api/collections/`)
    })
    .catch(err => {
      console.log(err)
    })

  }

  const handleOverlayClick = (e) => {
    if(e.target.id === 'popup-collection'){
      document.querySelector('.close').click()
    }
  }


  return (
    <div className="sidebar">
      <div className="sidebardiv">

        <div className="dropdown">
          <button className='dropbtn'>+ New</button>
          <div className="dropdown-content">

            <div className="dropdown-content">
              <div className="askBar-item">
                <a href="#popup-collection"><h4>New Collection</h4></a>
              </div>
              <div className="askBar-item">
                <Link to='/api/collections/choose/upload'><h4>New File</h4></Link>
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
        {/* https://codepen.io/sahil4test/pen/xERYvX */}
        <div id="popup-collection" className='overlay' onClick={handleOverlayClick}>
          <div className="popup">
            <h2>Create a new collection</h2>
            <a className="close" href="#">&times;</a>
            <form className='content'>
              <input type="text" name="name" className='popup-input' placeholder="Collection Name" required />
              <button type='submit' onClick={handleClick} className='popup-btn'>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
