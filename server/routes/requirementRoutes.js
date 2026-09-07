const express = require('express');
const router = express.Router();
const Requirement = require('../models/Requirement');

// CREATE a new requirement
router.post('/', async (req, res) => {
  try {
    const requirement = new Requirement(req.body);
    await requirement.save();
    res.status(201).json(requirement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all requirements
router.get('/', async (req, res) => {
  try {
    const requirements = await Requirement.find();
    res.json(requirements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;