"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validateEnv = () => {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)(),
        LOGS_PATH: (0, envalid_1.str)({
            default: 'logs'
        }),
        DATABASE_URL: (0, envalid_1.str)({
            desc: 'Database connection string'
        }),
    });
};
exports.default = validateEnv;
