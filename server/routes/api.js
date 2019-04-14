const express=require('express')
const router= express.Router()
const mongoose=require('mongoose')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bca:mca@cluster0-zl569.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

router.get('/',(req,res)=>{
    res.send('From API route')
})


module.exports = router