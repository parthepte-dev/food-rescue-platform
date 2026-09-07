const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true
  },
  pickupCode: {
    type: String,
    required: true
  },
  deliveryCode: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['assigned', 'picked_up', 'delivered'],
    default: 'assigned'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);