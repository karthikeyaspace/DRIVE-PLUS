import React, {useState, useEffect, useContext} from 'react'
import './FileView.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../../context-api/userContext'


export default function FileView (){
  const { collectionId } = useParams()
  const { fileId } = useParams()
  const { user } = useContext(userContext)


  const [file, setFile] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:6969/api/${user}/collections/${collectionId}/${fileId}`)
      .then(res => {
        const filePath = res.data.filePath.replace(/\\/g, '/');
        setFile({...res.data, filePath})
      })
      .catch(err => {
        console.log("Error fetching file ", err)
      })
  }
  , [collectionId, fileId, user])


  console.log(file)
  const renderFile = () => {
    if(file){
      let {mimetype, filePath} = file
      console.log(mimetype, filePath)

      //format file path
      filePath = '../../../backend/'+filePath
      console.log(filePath)
      switch(mimetype){
        case 'application/pdf':
          return <iframe src={filePath} title='pdf viewer' width="80%" height="500px" frameborder="0"></iframe>
        case 'image/jpeg':
        case 'image/png':
        case 'image/jpg':
          return <img src={filePath} alt="file" width="80%" height="500px"/>
        case 'video/mp4':
          return <video src={filePath} width="80%" height="500px" controls></video>
        case 'audio/mpeg':
          return <audio src={filePath} controls></audio>
        default:
          return <p>File type not supported</p>
      }
    }
    else{
      return <p>File not found</p>
    }

  }


  return (
    <div className="outlet">
      <div className="top">
        File
      </div>
      <div className="content">
        <div className="content-top">
            {file.filename}
        </div>

        <div className="fileview">
            {/* {renderFile()} */}
            <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' width="30%" alt="" />
        </div>  
        
      </div>
      {file.filePath}
    </div>
  )
}
