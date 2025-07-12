import type { Session } from 'express-session';

export interface CustomSession extends Session {
  userId?: string;
  score?: number;
  createdAt?: Date; 
  updatedAt?: Date;
}