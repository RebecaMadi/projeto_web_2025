"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.majorByCode = exports.deleteMajor = exports.updateMajor = exports.getMajorById = exports.createMajor = exports.getAllMajors = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllMajors = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.major.findMany();
});
exports.getAllMajors = getAllMajors;
const createMajor = (newMajor) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.major.create({ data: newMajor });
});
exports.createMajor = createMajor;
const getMajorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.major.findUnique({ where: { id } });
});
exports.getMajorById = getMajorById;
const updateMajor = (id, updatedMajor) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.major.update({
        where: { id },
        data: updatedMajor
    });
});
exports.updateMajor = updateMajor;
const deleteMajor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.major.delete({ where: { id } });
});
exports.deleteMajor = deleteMajor;
const majorByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.major.findUnique({ where: { code } });
});
exports.majorByCode = majorByCode;
