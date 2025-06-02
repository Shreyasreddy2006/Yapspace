const chat = require('ws');
const express = require('express');
const http = require('http');

const port = process.env.PORT || 1021;

const app = express();

const server = http.createServer(app);
const wss = new chat.Server({server});

const mem = new Set();
wss.on('connection' , (ws) => {
   mem.add(ws);

   ws.on('message' , (msg) => {
      mem.forEach((me) => {
        if(me !== ws){
           me.send(`${msg}`)
        }
      })
      console.log(msg);
   })
   
   ws.on('error' , (err) => {
     console.log(err);
   })

   ws.on('close' , () => {
     console.log("client disconnected");
   })
})

app.get('/' , (req , res) => {
   res.send('websocket server is running')
})

server.listen(port , () => {
   console.log(`server is running on port 1021`);
})