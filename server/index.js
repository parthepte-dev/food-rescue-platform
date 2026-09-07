const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/deliveries', require('./routes/deliveryRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Food Rescue Platform API is running 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});