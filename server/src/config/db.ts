import mongoose from 'mongoose';
import config from './config.js';

export const connectDb = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connection successful!');
  } catch (error) {
    console.log('Connection failed');
    console.error(error);
    process.exit(1);
  }
};
