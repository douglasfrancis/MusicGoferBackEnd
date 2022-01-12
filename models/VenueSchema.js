const mongoose = require('mongoose');
const { Schema } = mongoose;

const venueSchema = new Schema({
    name:  String, 
    address: String,
    setTimes: Array,
    artistFee: Number,
    venueFee: Number,
    equipment: String,
    contactEmail: String,
    contactName: String
    
  }, {timestamps: true});

  const Venues = mongoose.model('Venues', venueSchema);

  module.exports = Venues