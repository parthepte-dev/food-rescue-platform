const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/deliveries', require('./routes/deliveryRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Food Rescue Platform API is running 🚀');
});

// Start server
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('sendLocation', (data) => {
    // Broadcast this volunteer's location to everyone watching
    io.emit('receiveLocation', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});