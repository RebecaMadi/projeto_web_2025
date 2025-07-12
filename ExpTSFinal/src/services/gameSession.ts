import { Request, Response, NextFunction } from 'express';
import { GameSession } from '../types/gameSession';
import { PrismaClient } from '@prisma/client';
import { isSessionValid } from '../middlewares/middlewares';
import { sessionDuration } from '../utils/config';
const prisma = new PrismaClient();


export async function getRecentGameSession(userId: string) {
  return await prisma.game_session.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getGameSessionById(sessionId: string) {
  return await prisma.game_session.findUnique({
    where: { id: sessionId },
  });
}

export async function createGameSession(id: string, userId: string, score: number) {
  return await prisma.game_session.create({
    data: {
        id,
      userId,
      score,
    },
  });
}

export async function updateGameSession(sessionId: string, score: number) {
  return await prisma.game_session.update({
    where: { id: sessionId },
    data: { score, updatedAt: new Date() },
  });
}

export async function requireAuth(req: Request, res: Response) {
  const session = await getGameSessionById(req.session.uid || "") as GameSession;
  console.log('Session:', session);
  if (session && session.userId && isSessionValid(session.createdAt, sessionDuration)) {
    return session;
  }
  return null;
}