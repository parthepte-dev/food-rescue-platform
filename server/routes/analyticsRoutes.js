const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Requirement = require('../models/Requirement');
const Match = require('../models/Match');
const Delivery = require('../models/Delivery');

router.get('/', async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalRequirements = await Requirement.countDocuments();
    const totalMatches = await Match.countDocuments();
    const totalDelivered = await Delivery.countDocuments({ status: 'delivered' });

    const totalFoodDonated = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);

    res.json({
      totalDonations,
      totalRequirements,
      totalMatches,
      totalDelivered,
      totalFoodDonatedKg: totalFoodDonated[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;