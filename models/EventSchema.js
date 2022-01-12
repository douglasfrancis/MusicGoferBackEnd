const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    title:  String, 
    artist: String,
    venueName: String,
    venueId: String,
    date: Date,
    setTimes: Array,
    notes: String,
    artistFee: Number,
    venueFee: Number,
    status: String,
    backgroundColor: String,
    borderColor: String,
    allDay: Boolean,
    display: String
    
  }, {timestamps: true});

  const Events = mongoose.model('Events', eventSchema);

  module.exports = Events