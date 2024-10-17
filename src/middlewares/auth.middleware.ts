import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../config/config';
const JWT_SECRET = config.jwtSecret as string;

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  if (!token) {
     res.status(401).json({ message: 'Access denied' });
     return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as any;
    next();
  } catch (err) {
     res.status(401).json({ message: 'Invalid token' });
     return;
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'You do not have permission for this action' });
      return ;
    }
    next();
  };
};
