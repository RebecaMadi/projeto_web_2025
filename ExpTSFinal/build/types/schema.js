"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.majorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.majorSchema = joi_1.default.object({
    code: joi_1.default.string().max(4).required(),
    name: joi_1.default.string().max(100).required(),
    description: joi_1.default.string().allow('').optional(),
});
exports.userSchema = joi_1.default.object({
    name: joi_1.default.string().max(100).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    repeatPassword: joi_1.default.any().valid(joi_1.default.ref('password')).required().messages({
        'any.only': 'As senhas não coincidem.'
    }),
    majorId: joi_1.default.string().max(40).required(),
});
