import type { Request, Response } from 'express';
import {User} from '../models/user.model';
import {Loan} from '../models/loan.model';
export const getVerifiers = async (req: Request, res: Response) => {
  try {
    const verifiers = await User.find({role: 'verifier'});
    console.log(verifiers)
    res.status(200).json(verifiers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve verifiers' });
  }
}
export const getLoans = async (req: Request, res: Response) => {
  try {

    const loans = await Loan.find().populate('assignedVerifier', 'name email phone');
     res.status(200).json(loans);
  } catch (error) {
    console.error(error);
   res.status(500).json({ message: 'Failed to retrieve loans' });
  }
}
export const getUsers = async (req: Request, res: Response) => {
  try {

    const users = await User.find({role:'user'})
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
}
