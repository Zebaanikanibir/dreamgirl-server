const { MongoClient } = require('mongodb');
const express = require('express')
const objectId = require('mongodb').ObjectID
const cors = require('cors');
const app = express()
require('dotenv').config();
const port = 5011



app.use(cors())
app.use(express.json())


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x4chh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("dream").collection("dreamProducts");
  const registerCollection = client.db("dream").collection("register");
const orderCollection  = client.db("dream").collection("order");

  

app.get('/products',(reg,res)=>{

    productsCollection.find({})
    .toArray((err, documents)=>{
        res.send(documents);
        console.log(documents)
    })
})

app.post('/registered', (req,res)=>{
      
  //     const password = req.body.password
  //     const email = req.body.email
  //    console.log(email, password)
  const newEvent = req.body;
        console.log('adding', newEvent)
       
     
     registerCollection.insertOne(newEvent)
                 .then(result => {
                    
                    res.send(result.insertedCount > 0);
                    
                     
                 })
     
      })

      app.get('/product/:id', (req, res) => {


        productsCollection.find({ _id: objectId(req.params.id) })
    
          .toArray((err, documents) => {
            res.send(documents[0])
          })
      })

      app.post('/addOrder', (req, res) => {

        const order = req.body
      console.log(order)
        orderCollection.insertOne(order)
          .then(result => {
    
            console.log(result.insertedCount)
            res.send(result.insertedCount > 0)
    
          })
    
    
    })
    

});
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  
  
  
  
  app.listen(process.env.PORT || port)