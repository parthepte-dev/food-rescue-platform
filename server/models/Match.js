const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
    required: true
  },
  requirementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Requirement',
    required: true
  },
  matchScore: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['proposed', 'accepted', 'rejected'],
    default: 'proposed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Match', matchSchema);