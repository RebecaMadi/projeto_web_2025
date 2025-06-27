import { Request, Response, NextFunction } from 'express';
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