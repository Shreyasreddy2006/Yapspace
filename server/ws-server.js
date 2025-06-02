const chat = require('ws');

const wss = new chat.Server({port : 1021});

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