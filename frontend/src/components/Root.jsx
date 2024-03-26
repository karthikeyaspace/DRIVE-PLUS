import React, {useContext, useState} from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from './SideBar/SideBar'
import { userContext } from "../context-api/userContext";

export default function Root(){
    const [user, setUser] = useState("karthikeya")

    return(
        <div className="root-div">
            <userContext.Provider value={{user,setUser}}>
                <Navbar className="navbar"/>
                <Sidebar className="sidebar"/>
                <Outlet className="outlet"/>
            </userContext.Provider>
        </div>
    )
}
