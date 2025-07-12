export type GameSession = {
  id: string;
  userId: string;
  score: number;
  createdAt: Date;
  updatedAt?: Date;
};