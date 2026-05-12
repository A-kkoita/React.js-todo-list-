import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://aishakhaitoukoita_db_user:XjXL0njpdUayI6Ep@cluster0.5ywiv4i.mongodb.net/task-manager');

  console.log('MongoDB connected');
};