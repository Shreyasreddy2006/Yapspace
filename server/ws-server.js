const WebSocket = require('ws');
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const app = express();
const schema = require('./msgschema');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=Yapspace`;

const wss = new WebSocket.Server({server});

let message = 'Hi';
wss.on('connection' , (ws) => {
   console.log(`${ws}`);
   ws.on('message' , (msg) => {
      wss.clients.forEach((client) => {
         if(client !== ws && client.readyState === WebSocket.OPEN){
            client.send(`${msg}`);
         }
      });
      message = `${msg}`;
   });

   ws.on('close', () => {
      ws.send(`${ws} Disconnected`);
   });
});

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("connected to mongodb");
    }catch(err){
        console.log(err);
    }
}

app.post("/Messages" , async (req,res) => {
   try{
     const {user , message} = req.body;
     const newmsg = new schema({user , message});
     const saved = await newmsg.save();
     res.status(201).json(saved);
   }catch{
    res.status(500).json({error: 'failed to save message'});
   }
});

app.get("/Messages" , async (req , res) => {
   try{
     const msgs = await schema.find().sort({time: -1});
     res.json(msgs);
   }catch{
      res.status(500).json({err : 'failed to fetch messages'});
   }
});  

server.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
    connect();
})

module.exports = message;
