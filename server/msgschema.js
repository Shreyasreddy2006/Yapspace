const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   user: String,           
   message: String,   
   userId: {               
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false      
   },
   time: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Message', schema);