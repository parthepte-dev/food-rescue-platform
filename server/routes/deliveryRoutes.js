const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Delivery = require('../models/Delivery');
const Volunteer = require('../models/Volunteer');

// CREATE a delivery (assign volunteer to a match)
router.post('/', async (req, res) => {
  try {
    const { matchId, volunteerId } = req.body;

    const pickupCode = crypto.randomBytes(4).toString('hex');
    const deliveryCode = crypto.randomBytes(4).toString('hex');

    const delivery = new Delivery({ matchId, volunteerId, pickupCode, deliveryCode });
    await delivery.save();

    await Volunteer.findByIdAndUpdate(volunteerId, { availability: 'busy' });

    res.status(201).json(delivery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE delivery status (simulates QR scan)
router.patch('/:id/status', async (req, res) => {
  try {
    const { code, newStatus } = req.body;
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });

    if (newStatus === 'picked_up' && code !== delivery.pickupCode) {
      return res.status(400).json({ error: 'Invalid pickup code' });
    }
    if (newStatus === 'delivered' && code !== delivery.deliveryCode) {
      return res.status(400).json({ error: 'Invalid delivery code' });
    }

    delivery.status = newStatus;
    await delivery.save();

    if (newStatus === 'delivered') {
      await Volunteer.findByIdAndUpdate(delivery.volunteerId, { availability: 'available' });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all deliveries
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('matchId').populate('volunteerId');
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;