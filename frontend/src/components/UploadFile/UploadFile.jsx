import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate()
  const id = useParams()

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (id) => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:6969/api/karthikeya/collections/${id}/upload`,
        formData
      );
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='outlet'>
      <div className="top">
        <p>Upload File</p>
      </div>
      <div className="content">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </ div>
    </div>
  );
}

