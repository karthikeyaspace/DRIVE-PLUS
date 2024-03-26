const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const path = require('path');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoClient
  .connect('mongodb://127.0.0.1:27017')   //put url in .env file
  .then((client) => {
    const db = client.db("multimediaApp");

    const usersC = db.collection("users");
    const collectionsC = db.collection("collections");

    //share collection objs with APIs
    app.set("users", usersC);
    app.set("collections", collectionsC);
    console.log("DB connection success");
  })
  .catch((err) => {
    console.log("Err in DB connect", err);
  });


const api = require("./apis/api");
const public = require("./apis/public");

app.use("/api", api);
app.use("/public", public);



//synchronous error handle, express-async-handler for async errors
app.use((err, req, res, next)=>{
    res.send({message: err.message});
})


const port = 6969; // put this env variable in .env file
app.listen(port, ()=>console.log("server running on port ",port));