const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
  ngoName: {
    type: String,
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  quantityNeeded: {
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
  urgency: {
    type: String,
    enum: ['normal', 'emergency'],
    default: 'normal'
  },
  status: {
    type: String,
    enum: ['open', 'fulfilled'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Requirement', requirementSchema);