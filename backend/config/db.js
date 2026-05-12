import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/task-manager');

  console.log('MongoDB connected');
};