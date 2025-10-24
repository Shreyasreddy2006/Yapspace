const mongoose = require('mongoose');

const schema = new mongoose.Schema({
   user: String,           // Display name for chat
   message: String,        // Message content
   userId: {               // Reference to user ID
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false      // Allow legacy messages without userId
   },
   time: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Message', schema);