require('dotenv').config();
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

   ws.on('message' , (msg) => {
       people.forEach((mem) => {
          if(mem !== ws && mem.readyState === webSocket.OPEN){
             ws.send(`${msg}`);
          }
       });
   });

   ws.on('close', () => {
      ws.send(`${ws} Disconnected`);
   });
});

const port = process.env.PORT || 1021;

server.listen(port);