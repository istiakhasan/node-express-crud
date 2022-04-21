const express=require('express')
const app=express()
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
//get object id 
const ObjectId=require('mongodb').ObjectId
//use  middleware
app.use(cors())
app.use(express.json())

//user1:-dbuser1
//password:-9NHmowLlLNAAN1Mq


const uri = "mongodb+srv://dbuser1:9NHmowLlLNAAN1Mq@cluster0.ln10s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run=async ()=>{
 try{
        await client.connect();
        const userCollection=client.db("foodExpress").collection("user")


        //get user from database
        app.get('/user',async (req,res)=>{
        
            const query={}
            const cursor= userCollection.find(query)
            const users=await cursor.toArray()
            res.send(users)
            
        })
        //add a newUser
        app.post('/user',async (req,res)=>{
         const newUser=req.body
         const result=await userCollection.insertOne(newUser)
         console.log('adding new user',result)
         res.send(result)
        })

        //delete a user
        app.delete('/user/:id',async(req,res)=>{
            const id=req.params.id;
            console.log(id)
            const query={_id:ObjectId(id)}
            const result=await userCollection.deleteOne(query)
            res.send(result)
        })


        //get single item
        app.get('/user/:id',async(req,res)=>{
            const id=req.params.id 
            const query={_id:ObjectId(id)};
            const result=await userCollection.findOne(query)
            res.send(result)
        })

        //update user
        app.put('/user/:id',async(req,res)=>{
            const id=req.params.id
            const updatedUser=req.body
            const filter={_id:ObjectId(id)}
            const result=   userCollection.updateOne({_id:ObjectId(id)},{$set:updatedUser})
            console.log("||",id,updatedUser)
            res.send(result)
        })
      

 }
 finally{
    //  client.close()
 }  
}

 run().catch(console.dir)



app.listen(4000,()=>console.log('started successfully'))