import axios from 'axios';
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { userContext } from '../../context-api/userContext';
import './Collections.css'
import addIcon from '../../assets/add.svg'
import deleteIcon from '../../assets/delete.svg'

export default function Collections(){
    const { user } = useContext(userContext)
    const [collections, setCollections] = useState([]) 

    useEffect(()=>{
        axios.get(`http://localhost:6969/api/${user}/collections`)
        .then((res)=>{
            setCollections(res.data)
        })
        .catch(err=>{
            console.log("Error fetching collections ", err)
        })
    },[])

    const handleDelCol = (collectionId) => {
        axios.delete(`http://localhost:6969/api/${user}/collections/${collectionId}`)
        .then((res)=>{
            console.log(res)
            setCollections(collections.filter(collection=>collection.collection.collectionId !== collectionId))
        }
        )
        .catch(err=>{
            console.log("Error deleting collection ", err)
        })
    }


    console.log(collections)

    console.log(collections)
    return(
        <div className='outlet'>
            <div className="top">
                <p>Collections</p>
            </div>
            <div className="content"> 
                <div className="collections-header">
                    <div className="collName">Name</div>
                    <div className="collOwner">Owner</div>
                    <div className="visibility">Visibility</div>
                    <div className="collFiles">Files</div>
                </div>
                <div className="all-collections">
                    {
                        collections.map((collection, index)=>(
                            <div className="collection-row" key={index}>
                                <div className="collName"> {collection.collection.collectionName} </div>
                                <div className="collOwner"> {collection.collection.username} </div>
                                <div className="visibility"> {collection.collection.visibility ? "Public" : "Private"} </div>
                                <div className="collFiles"> {collection.collection.files.length} </div>
                                <Link to={`http://localhost:5173/api/collections/${collection.collection.collectionId   }`} className="view-files">View Files</Link>
                                <Link to={`http://localhost:5173/api/collections/${collection.collection.collectionId}/upload`}> <img src={addIcon} alt="add files" className='add-icon' /> </Link>
                                <img src={deleteIcon} alt="delete collection" onClick={() => handleDelCol(collection.collection.collectionId)} className="delete-icon"/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
