import {User} from '../models/user.model';
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {config} from '../config/config';
import { JwtPayload } from 'jsonwebtoken'; // or wherever you're defining the type for user


const JWT_SECRET = config.jwtSecret as string;

declare global {
  namespace Express {
    interface Request {
      user:{
        id:string;
        role: 'user'|'admin'|'verifier';
      };  
    }
  }
}

export const registerUser = async (req: Request, res: Response) => {
    const { email, password,fullName, phone, address } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        fullName,
        phone,
        address, password: hashedPassword, role: 'user' });
      await user.save().catch(err => {
        console.error('Error saving user:', err.message)});
     res.status(201).json({ message: 'User registered successfully' }).send();
    } catch (err: any) {
      res.status(500).json({ message: 'Error in registration', error: err.message }).send();
    }
  };
  
  // Admin registering Verifier
  export const registerVerifier = async (req: Request, res: Response): Promise<void> => {
    const { email, password, fullName, phone, address } = req.body;
    const { role } = req.user;
  
    if (role !== 'admin') {
      res.status(403).json({ message: 'Only admin can register verifiers' });
      return ;
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const verifier = new User({
        email,
        fullName,
        phone,
        address,
        password: hashedPassword,
        role: 'verifier',
      });
      await verifier.save().catch(err=>{
        console.error('Error saving verifier:',err.message)
      });
       res.status(201).json({ message: 'Verifier registered successfully' }).send();
       return;
    } catch (err: any) {
       res.status(500).json({ message: 'Error in registration', error: err.message }).send();
       return;
    }
  };
  
  // Login
  export const login = async (req: Request, res: Response):Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'User not found' }).send();
        return;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' }).send();
        return;
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, role: user.role });
    } catch (err: any) {
      res.status(500).json({ message: 'Login failed', error: err.message }).send();
    }
  };
  