import React, {useContext, useState} from "react";
import { userContext } from '../../context-api/userContext';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar(){
    const {user} = useContext(userContext)
    return(
        <div className="navbar">
            <div className="left">
                <h2>DRIVEPLUS</h2>
            </div>
            <div className="searchbar">
                <input type="text" placeholder='Search Files...' className='searchbar' />
            </div>
            <div className="right">
                <h3>hello, {user}</h3>
            </div>
            
        </div>
    )
}