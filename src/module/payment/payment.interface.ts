import { Types } from "mongoose";

export interface IPayment {
  booking: Types.ObjectId; 
  amount: number; 
  paymentMethod: string; 
  transactionId: string; 
  status: "pending" | "completed" | "failed"; 
  createdAt: Date;
  updatedAt: Date;
}