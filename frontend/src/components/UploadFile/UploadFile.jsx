import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UploadFile.css';
import { userContext } from '../../context-api/userContext';

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate()
  var { collectionId } = useParams()
  const { user } = useContext(userContext)
  const [collections, setCollections] = useState([]) 

  console.log(collectionId)
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  if(collectionId === "choose"){
    //get collections from the api
    useEffect(()=>{
        axios.get(`http://localhost:6969/api/${user}/collections`)
        .then((res)=>{
            setCollections(res.data)
        })
        .catch(err=>{
            console.log("Error fetching collections ", err)
        })
    },[])
    console.log(collections)
  }

  const handleUpload = async (collectionId) => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:6969/api/karthikeya/collections/${collectionId}/upload`,
        formData
      );
      console.log('File uploaded successfully:', response.data);
      navigate(`/api/collections/${collectionId}`)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (collectionId === "choose") {
      var selectOb = document.getElementById('collection');
      collectionId = selectOb.value;
    }
    console.log(collectionId);
    handleUpload(collectionId)
  }
  //form uplaod data take the id from the url and send it to the handleupload function


  return (
    <div className='outlet'>
      <div className="top">
        <p>Upload File</p>
      </div>
      <div className="content-u">

        <form action="" className='file-form' onSubmit={handlesubmit}>

          {
            collectionId === "choose" ? (
              <div className="select">
                <select name="collection" id="collection" defaultValue="choose">
                  <option value="choose" disabled >Choose a collection</option>
                  {
                    collections.map((collection, index) => {
                      return <option key={index} value={collection.collection.collectionId}>{collection.collection.collectionName}</option>
                    })
                  }
                </select>
              </div>
            ) : (
              <div>
                <p style={{fontSize:"2rem"}}>Select a File</p>
              </div>
            )
          }

          {/* <div className="drgdrp">
            <div className="file-upload">
              <label htmlFor="file"></label>
              <input className="file-input" onClick={handleFileChange} type="file" />
              <button type='submit' className='upload-button'>Upload</button>
              <div className="card-subtitle">Drag n Drop your file here</div>
            </div>
          </div> */}

          <div className="drgdrp">

            <div className="fileinput-box">
              <label htmlFor="file-input" >Select to choose a file or drag n drop here</label>
              <input type="file" id='file-input' multiple className='file-input' onChange={handleFileChange} />
            </div>
            <button type='submit' className='file-submit'>Upload</button>
          </div>

        </form>
      </ div>
    </div>
  );
}

