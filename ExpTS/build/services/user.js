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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findMany({
        include: {
            major: true // Include the related major data
        }
    });
});
exports.getAllUsers = getAllUsers;
// create a new user
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.create({ data: newUser });
});
exports.createUser = createUser;
// get user by id
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { id },
        include: {
            major: true // Include the related major data
        }
    });
});
exports.getUserById = getUserById;
// update user
const updateUser = (id, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: { id },
        data: updatedUser
    });
});
exports.updateUser = updateUser;
// delete user
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.delete({ where: { id } });
});
exports.deleteUser = deleteUser;
