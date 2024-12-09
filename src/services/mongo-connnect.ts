import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
      const uri = 'mongodb://localhost:27017/snappic';
      await mongoose.connect(uri);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit process with failure
    }
  };
  
  export default connectToDB;