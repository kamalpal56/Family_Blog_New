// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const startServer = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(5000, () => console.log('Server running on port 5000'));
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

startServer();

// Sample Route
app.get('/', (req, res) => {
  res.send('Welcome to the Family Blog Backend!');
});
