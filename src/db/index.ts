import mongoose, { ConnectOptions } from 'mongoose';
import { DB_NAME } from '../constants';

const connectDB = async (): Promise<void> => {
  try {
    const connectionOptions: ConnectOptions = {
      dbName: DB_NAME,
      // Add other connection options as needed (e.g., useNewUrlParser, useUnifiedTopology)
    };

    const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, connectionOptions);
    console.log(`MONGODB connection successful! DB HOST: ${connection.connection.host}`);
  } catch (error) {
    console.error('MONGODB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;