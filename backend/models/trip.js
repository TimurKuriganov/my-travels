const mongoose = require('mongoose');


const tripSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  images: [String],
  location: {
    type: String,
    required: true
  },
  places: {
    type: [String],
    required: true
  },
  tags: [String],
  travelStart: Date,
  travelEnd: Date,
  createdAt: {
    type: Date,
    default: new Date()
  }
})
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
