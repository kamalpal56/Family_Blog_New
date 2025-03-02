import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/post.js'; // Ensure correct path
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();



app.use(cors());
app.use(express.json());


// ✅ Check if this logs correctly
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// ✅ Correct endpoint paths
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
