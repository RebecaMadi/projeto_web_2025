import { Request, Response, NextFunction } from 'express';
import { getGameSessionById } from '../services/gameSession';
import { sessionDuration } from '../utils/config';
import fs from 'fs';
import path from 'path';

export function logger(format: 'simples' | 'completo') {
  const logDir = process.env.LOGS_PATH || 'logs';

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  const logFile = path.join(logDir, 'access.log');

  return (req: Request, res: Response, next: NextFunction) => {
    const now = new Date().toISOString();
    let logLine = '';

    if (format === 'simples') {
      logLine = `${now} ${req.url} ${req.method}\n`;
    } else {
      logLine = `${now} ${req.url} ${req.method} HTTP/${req.httpVersion} ${req.get('User-Agent')}\n`;
    }

    fs.appendFile(logFile, logLine, err => {
      if (err) {
        console.error('Erro ao escrever log:', err);
      }
    });

    next();
  };
}


// function to check time diff to see of the session is still valid
export function isSessionValid(sessionStartTime: Date, sessionDuration: number): boolean {
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - sessionStartTime.getTime();
  return timeDiff < sessionDuration;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Auth Middleware:');
  console.log('Session ID:', req.session.uid);
  const session = await getGameSessionById(req.session.uid || "");
  console.log('Session111:', session, req.session.uid);
  if (session && session.userId && isSessionValid(session.createdAt, sessionDuration)) {
     next();
     return
  }
  res.redirect('/');
}
