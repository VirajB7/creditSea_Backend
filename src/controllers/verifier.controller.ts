import type { Request, Response } from 'express';
import {Loan} from '../models/loan.model';
export const getLoans = async (req: Request, res: Response)=> {
  try {
    const loans = await Loan.find({ assignedVerifier: req.user.id }).populate('assignedVerifier', 'name email phone').populate('user', 'name email phone');
     res.status(200).json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve loans' });
  }
}
export const updateLoanStatus = async (req:Request, res:Response) => {
    const { loanId, status } = req.body;

    if (!['pending', 'approved', 'rejected','verified'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
    }

    try {
      const loan = await Loan.findByIdAndUpdate(
        loanId,
        { status },
        { new: true }
      );

      if (!loan) {
        res.status(404).json({ message: 'Loan not found' });
      }

      res.json({ message: 'Loan status updated', loan });
    } catch (error) {
      console.error('Error updating loan status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
