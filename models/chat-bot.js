const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
   title: String,
   nodes: Array,
   author: {
       id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
       },
       username: String
   } 
});

const Bot = mongoose.model('Bot', botSchema);
module.exports = Bot;