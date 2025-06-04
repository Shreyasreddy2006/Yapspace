const WebSocket = require('ws');

const port = process.env.PORT || 1021;

const wss = new WebSocket.Server({port : port});

wss.on('connection' , (ws) => {
   console.log(`${ws}`);
   ws.on('message' , (msg) => {
      wss.clients.forEach((client) => {
         if(client !== ws && client.readyState === WebSocket.OPEN){
            client.send(`${msg}`);
         }
      });
   });

   ws.on('close', () => {
      ws.send(`${ws} Disconnected`);
   });
});
