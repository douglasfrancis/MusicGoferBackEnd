const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistSchema = new Schema({
    _id: String,
    img: String,
    name:  String, 
    category: String,
    number: String,
    email: String,
    youtube: String,
    role: String,
    
  }, {timestamps: true});

  const Artists = mongoose.model('Artists', artistSchema);

  module.exports = Artists