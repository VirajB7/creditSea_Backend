import express from 'express';
import {Loan} from '../models/loan.model';
import {User} from '../models/user.model';
import type { ILoan } from '../models/loan.model';
import type { Request, Response } from 'express';


export const createLoan = async (req: Request, res: Response) => {
    try {
        const loanData: ILoan = req.body;

        const verifiers = await User.find({ role: 'verifier' }).select('name email') as any;
        if (verifiers.length > 0) {
          loanData.assignedVerifier = verifiers[0]._id;
        }
        loanData.user = req.user.id;
        loanData.status = 'pending';
        const newLoan = new Loan(loanData);
        await newLoan.save();
        res.status(201).json(newLoan);
    } catch (error) {
        console.error('Error creating loan:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const getLoans = async (req: Request, res: Response): Promise<void> => {
    try {

      const loans = await Loan.find({ user: req.user.id }).populate('assignedVerifier', 'name email phone');
      res.status(200).json(loans);
    } catch (error) {
      console.error(error);
       res.status(500).json({ message: 'Failed to retrieve loans' });
    }
  }
