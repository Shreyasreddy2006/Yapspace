// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const schema = require('./msgschema');

// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?retryWrites=true&w=majority&appName=Yapspace`;

// async function connect(){
//     try{
//         await mongoose.connect(uri);
//         console.log("connected to mongodb");
//     }catch(err){
//         console.log(err);
//     }
// }

// app.post("/Messages" , async (req,res) => {
//    try{
//      const {user , message} = req.body;
//      const newmsg = new schema({user , message});
//      const saved = await newmsg.save();
//      res.status(201).json(saved);
//    }catch{
//     res.status(500).json({error: 'failed to save message'});
//    }
// });

// app.get("/Messages" , async (req , res) => {
//    try{
//      const msgs = await schema.find().sort({time: -1});
//      res.json(msgs);
//    }catch{
//       res.status(500).json({err : 'failed to fetch messages'});
//    }
// });  

// app.listen(3000 , () => {
//     console.log("server started");
//     connect();
// })