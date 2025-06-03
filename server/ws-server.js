const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.get('/' , (req , res) => {
   res.send("Server initiated successfully")
});

const server = http.createServer(app);

const wss = new WebSocket.Server({server});

const people = new Set();

wss.on('connection' , (ws) => {
   people.add(ws);

//    console.log(ws);

   ws.on('message' , (msg) => {
       people.forEach((mem) => {
          if(mem != ws){
             ws.send(`${ws} ${msg}`);
          }
       });
       console.log(msg);
   });

   ws.on('close', () => {
      console.log(`${ws} disconnected`);
   });
});

const port = process.env.PORT || 1021;

server.listen(port , () => {
     console.log("server started on port " + port);
});