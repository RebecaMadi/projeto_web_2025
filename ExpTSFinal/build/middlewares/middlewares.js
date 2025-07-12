"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function logger(format) {
    const logDir = process.env.LOGS_PATH || 'logs';
    if (!fs_1.default.existsSync(logDir)) {
        fs_1.default.mkdirSync(logDir, { recursive: true });
    }
    const logFile = path_1.default.join(logDir, 'access.log');
    return (req, res, next) => {
        const now = new Date().toISOString();
        let logLine = '';
        if (format === 'simples') {
            logLine = `${now} ${req.url} ${req.method}\n`;
        }
        else {
            logLine = `${now} ${req.url} ${req.method} HTTP/${req.httpVersion} ${req.get('User-Agent')}\n`;
        }
        fs_1.default.appendFile(logFile, logLine, err => {
            if (err) {
                console.error('Erro ao escrever log:', err);
            }
        });
        next();
    };
}
