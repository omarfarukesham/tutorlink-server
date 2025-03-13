import { Types } from "mongoose";

export interface IBooking {
  student: Types.ObjectId; 
  tutor: Types.ObjectId; 
  subject: Types.ObjectId; 
  dateTime: Date; 
  duration: number; 
  price: number; 
  status: "pending" | "confirmed" | "completed" | "canceled"; 
  createdAt: Date;
  updatedAt: Date;
}