const express = require('express')
const dotenv = require('dotenv')
const {MongoClient} = require('mongodb')
dotenv.config()
const url = 'mongodb://localhost:27017/'
const client = new MongoClient(url);
const bodyparser = require('body-parser')

//Database Name
const dbName = 'passop'
const app = express()
const port = 3000
app.use(bodyparser.json())


// client.connect();

app.get('/', async (req,res)=>{
  const db = client.db(dbName)
  const collection = db.collection('documents')
  const findResult = await collection.find({}).toArray();
  res.send({success: true, result: findResult});
})

app.post('/', async (req,res)=>{
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult});
})

app.listen(port,() => {
  console.log("server working on",port)
})