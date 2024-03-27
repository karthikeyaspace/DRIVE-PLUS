import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate()
  let { collectionId } = useParams()
  console.log(collectionId)


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


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
    if(collectionId === "choose"){
      var selectOb = document.getElementById('collection');
      collectionId = Number(selectOb.value);
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
      <div className="content">

        <form action="" onSubmit={handlesubmit}>

          {
            collectionId === "choose" && (
              <div className="select">
                <label htmlFor="collection">Choose a collection</label>
                <select name="collection" id="collection">
                  <option value="1711289476">Collection 1</option>
                  <option value="1711290103">Collection 2</option>
                  <option value="1711290109">Collection 3</option>
                </select>
              </div>
            )
          }
          <div className="fileinput-box">
            <label htmlFor="file">Choose a file:</label>
            <input type="file" onChange={handleFileChange} />
            <button type='submit'>Upload</button>
          </div>
        </form>


      </ div>
    </div>
  );
}

