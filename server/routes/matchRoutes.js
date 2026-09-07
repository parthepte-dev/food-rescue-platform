const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Donation = require('../models/Donation');
const Requirement = require('../models/Requirement');

// Scoring function: higher score = better match
function calculateScore(donation, requirement) {
  let score = 0;

  // Food type match (most important)
  if (donation.foodType.toLowerCase() === requirement.foodType.toLowerCase()) {
    score += 50;
  }

  // Location match (simple text match for now)
  if (donation.location.toLowerCase().includes(requirement.location.toLowerCase()) ||
      requirement.location.toLowerCase().includes(donation.location.toLowerCase())) {
    score += 30;
  }

  // Quantity fit (donation should cover or be close to what's needed)
  if (donation.quantity >= requirement.quantityNeeded) {
    score += 15;
  } else {
    score += 5; // partial fit still counts a little
  }

  // Urgency boost
  if (requirement.urgency === 'emergency') {
    score += 20;
  }

  // Expiry urgency boost (less time left = higher priority)
  const hoursLeft = (new Date(donation.expiryTime) - new Date()) / (1000 * 60 * 60);
  if (hoursLeft < 6) {
    score += 15;
  } else if (hoursLeft < 24) {
    score += 5;
  }

  return score;
}

// GET best matches for a specific donation
router.get('/for-donation/:donationId', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.donationId);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });

    const requirements = await Requirement.find({ status: 'open' });

    const scoredMatches = requirements.map(req => ({
      requirement: req,
      score: calculateScore(donation, req)
    })).sort((a, b) => b.score - a.score);

    res.json(scoredMatches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a confirmed match (donor/NGO accepts a suggested match)
router.post('/', async (req, res) => {
  try {
    const { donationId, requirementId, matchScore } = req.body;
    const match = new Match({ donationId, requirementId, matchScore });
    await match.save();

    // Update statuses
    await Donation.findByIdAndUpdate(donationId, { status: 'matched' });
    await Requirement.findByIdAndUpdate(requirementId, { status: 'fulfilled' });

    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('donationId')
      .populate('requirementId');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;