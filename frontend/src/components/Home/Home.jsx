import React, { useState, useContext, useEffect } from "react";
import './Home.css';
import { userContext } from '../../context-api/userContext';
import axios from "axios";

export default function Home() {
    const { user } = useContext(userContext)
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:6969/api/${user}/collections`)
            .then(res => {
                const allFiles = []
                res.data.forEach((collection) => {
                    allFiles.push(...collection.collection.files)
                })
                setFiles(allFiles)
            })
            .catch(err => {
                console.log("Error fetching files ", err);
            })
    }, []);
    console.log(files)

    return (
        <div className="outlet">
            <div className="top">
                <p>Home</p>
            </div>
            <div className="content">
                <div className="files-header">
                    <div className="filetype">Type</div>
                    <div className="filename">Name</div>
                    <div className="fileuploaddata">Uploaded At</div>
                    <div className="filesize">Size</div>
                    <div className="collectionName">Location</div>
                </div>
                <div className="home-files">
                    {
                        files.map((file, index) => (
                            <div className="home-file" key={index}>
                                <div className="filetype"> {file.mimetype.slice(-3)} </div>
                                <div className="filename"> {file.filename} </div>
                                <div className="fileuploaddata"> {file.uploadedAt.slice(0, 10)}</div>
                                <div className="filesize">{(file.size / 1024).toString().slice(0, 3)} kb</div>
                                <div className="collectionName"> {file.collection} </div>
                                {/* <div className="fileDownload"> ⬇️ </div> */}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}