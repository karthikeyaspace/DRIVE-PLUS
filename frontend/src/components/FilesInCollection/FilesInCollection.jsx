import React, { useEffect, useContext, useState } from "react";
import './FilesInCollection.css';
import { useParams, Link } from "react-router-dom";
import { userContext } from '../../context-api/userContext';
import axios from "axios";

export default function FilesInCollection() {
    const { user } = useContext(userContext)
    const { collectionId } = useParams()
    const [files, setFiles] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:6969/api/${user}/collections/${collectionId}`)
            .then(res => {
                setFiles(res.data.collection.files)
            })
            .catch(err => {
                console.log("Error fetching files ", err)
            })
    }, [])

    return (
        <div className="outlet">
            <div className="top">
                <p>All Files</p>
            </div>
            <div className="content">
                <div className="new-fileBtn">
                    <Link to={`/api/collections/${collectionId}/upload`}>
                        <button>Add Files</button>
                    </Link>
                </div>
                <div className="files-header">
                    <div className="filetype">Type</div>
                    <div className="filename">Name</div>
                    <div className="fileuploaddata">Uploaded At</div>
                    <div className="filesize">Size</div>
                    <div className="collectionName">Location</div>
                </div>
                {
                    files.length === 0 ? <p style={{ color: "red" }}>No files present</p> :

                        <div className="home-files">

                            {
                                files.map((file, index) => (
                                    <div className="home-file" key={index}>
                                        <div className="filetype"> {file.mimetype.slice(-3)} </div>
                                        <div className="filename"> {file.filename} </div>
                                        <div className="fileuploaddata"> {file.uploadedAt.slice(0, 10)}</div>
                                        <div className="filesize">{(file.size / 1024).toString().slice(0, 3)} kb</div>
                                        <div className="collectionName"> {file.collection} </div>
                                        <Link to={`/api/collections/${collectionId}/${file.fileId}`}> <div className="fileView"> View file </div>  </Link>
                                        {/* css applied from home.css file */}
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    )
}