import { USER_ROLE } from "./user.constants";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user" | "tutor" | "student";
    profileImg?: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
export type TUserRole = keyof typeof USER_ROLE;