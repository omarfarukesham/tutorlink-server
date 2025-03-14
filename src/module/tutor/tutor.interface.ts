import { Types } from "mongoose";

export interface ITutor {
  user: Types.ObjectId; // Reference to the User document
  bio: string; // Tutor's bio
  subjects: Types.ObjectId[]; 
  availability: {
    day: string; // Day of the week (e.g., "Monday")
    startTime: string; // Start time (e.g., "09:00")
    endTime: string; // End time (e.g., "17:00")
  }[];
  profileImg?: string; // Profile image URL
  hourlyRate: number; // Hourly rate
  earnings: number; // Total earnings
  createdAt: Date;
  updatedAt: Date;
}