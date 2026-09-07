const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'kg'
  },
  location: {
    type: String,
    required: true
  },
  prepTime: {
    type: Date
  },
  expiryTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'matched', 'picked_up', 'delivered', 'expired'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);