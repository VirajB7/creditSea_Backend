import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {User} from '../models/user.model';
import {config} from '../config/config';
export const createAdmin = async () => {
  const adminName = 'Viraj Busa'
  const adminEmail = 'busaviraj743@gmail.com';
  const adminPassword = 'Vb07042003@#';
  const adminPhone = 6353204483;
  const adminAddress = 'Mumbai, India';

  try {
    await mongoose.connect(config.mongo.url, {
    });

    const existingAdmin = await User.findOne({ email: adminEmail, role: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new User({
      fullName: adminName,
      email: adminEmail,
      password: hashedPassword,
      phone: adminPhone,
      address: adminAddress,
      role: 'admin',
    });

    await newAdmin.save();
    console.log('Admin created successfully');
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    mongoose.connection.close();
  }
};


