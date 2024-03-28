const express = require('express');
const api = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


let users;       //to get users, collections, files from mongodb - middleware
let collections;

api.use((req, res, next) => {
    users = req.app.get('users')
    collections = req.app.get('collections')
    next()
})

//new user
api.post('/register', async (req, res) => {
    const user = req.body;
    let userOb = await users.findOne({ username: user.username });
    if (userOb !== null) {
        return res.send({ message: "User already exists" });
    }
    else {
        //password hashing
        const hashedpassword = await bcrypt.hash(user.password, 6);     //put salt in .env file
        user.password = hashedpassword;
        await users.insertOne(user)
        res.send({ message: "User Created" })
        fs.mkdirSync(`data/${user.username}`, { recursive: true });  //create folder for user
    }

})

//login
api.post('/login', async (req, res) => {

    //check username
    const user = req.body;
    let userOb = await users.findOne({ username: user.username });
    if (userOb === null)
        return res.send({ message: "Invalid username" });
    else {
        //verify password
        let isMatch = await bcrypt.compare(user.password, userOb.password)
        if (isMatch === false) {
            return res.send({ message: "Invalid password" })
        }
        else {
            //generate token
            const token = jwt.sign({ username: userOb.username }, "secretkey", { expiresIn: "1d" });   //put secret key in .env file
            delete userOb.password;
            res.send({ message: "login success", token: token, user: userOb })

        }
    }

})


//get all collections of user
api.get('/:username/collections', async (req, res) => {
    //if user selects a list of collections, page is redirected to /:username/:collectionId
    //show all collections of user

    const username = req.params.username;
    const collectionsOb = await collections.find({ username: username }).toArray();
    if (collectionsOb === null)
        return res.send({ message: "No collections found" });
    return res.send(collectionsOb)

})


//create collection
api.post('/:username/collections', async (req, res) => {
    //create collection
    const collection = req.body;
    username = req.params.username;
    await collections.insertOne({ username: username, collection: collection })
    res.send({ message: "New Collection Created" })

})


//get collection
api.get('/:username/collections/:collectionId', async (req, res) => {
    //show all multimedia of that collection 
    //show public qr code of that collection

    const username = req.params.username;
    const collectionId = req.params.collectionId;

    const collectionOb = await collections.findOne({ "collection.collectionId": collectionId });
    if (collectionOb === null)
        return res.send({ message: "No collection found" });

    
    return res.send(collectionOb)

    //only collection ob is sent, files are extracted in frontend and shown from the collection ob


})


///get files of collection
api.get(':username/collections/:collectionId', async(req,res)=>{
    const username = req.params.username;
    const collectionId = req.params.collectionId;
    const collection = await collections.findOne({"collection.collectionId":collectionId});
    if(collection === null)
        return res.send({message:"No collection found"});
    return res.send(collection.collection.files)

})


//delete collection
api.delete('/:username/collections/:collectionId', async(req, res) => {
    //first remove files and then remove colleciton
    const username = req.params.username;
    const collectionId = req.params.collectionId;
    try{
        let collection = await collections.findOne({"collection.collectionId":collectionId});
        console.log(collection)
        collection.collection.files.forEach(file => {
            fs.unlinkSync(file.filePath);
        })
        fs.rmdirSync(`data/${username}/${collectionId}`, { recursive: true });
    }
    catch(err){
        console.log("Error deleting files ", err)
    }
    
    collections.deleteOne({ username: username, "collection.collectionId": collectionId })
    res.send({ message: "Collection Deleted" })
})


//multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const username = req.params.username;
        const collectionId = req.params.collectionId;
        const dir = `data/${username}/${collectionId}/`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueFileName = uuidv4();
        const extension = path.extname(file.originalname);
        cb(null, uniqueFileName + extension);
    }
});

const upload = multer({ storage: storage });

api.post('/:username/collections/:collectionId/upload', upload.single('file'), async (req, res) => {
    //file params - filename, fileid, mimetype, filepath
    //upload file to server - presently in folder
    //add file to collection
    //add file to user's files
    //return fileid
    try {
        const collectionId = req.params.collectionId;
        const file = req.file;
        const fileData = {
            filename: file.originalname,
            fileId: file.filename,
            mimetype: file.mimetype,
            filePath: file.path,
            size: file.size,
            uploadedAt: new Date().toISOString(),
            collection: collectionId,
        };
        await collections.updateOne({ "collection.collectionId": collectionId }, { $push: { "collection.files": fileData } });
        res.send({ message: "File uploaded successfully." });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

api.use('/uploads', express.static('uploads'));


//delete files using file id from collection
api.delete('/:username/collections/:collectionId/:fileId', async (req, res) => {
    try {
        const username = req.params.username;
        const collectionId = req.params.collectionId;
        const fileId = req.params.fileId

        let collection = await collections.findOne({ "collection.collectionId": collectionId })
        let file = collection.collection.files.find(file => file.fileId === fileId)
        fs.unlinkSync(file.filePath)
        await collections.updateOne({ "collection.collectionId": collectionId }, { $pull: { "collection.files": { fileId: fileId } } })
        res.send({ message: "File Deleted" })
    }
    catch {
        (err) => {
            console.log("Error Uploading a file ", err)
        }
    }
})


module.exports = api;
