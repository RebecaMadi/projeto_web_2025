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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../services/user");
const schema_1 = require("../types/schema");
const major_1 = require("../services/major");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_1.getAllUsers)();
        const majors = yield (0, major_1.getAllMajors)();
        const usersWithMajors = users.map(user => ({
            user,
            major: majors.find(m => m.id === user.majorId)
        }));
        res.render('user/index', { users: usersWithMajors });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'GET') {
        const majors = yield (0, major_1.getAllMajors)();
        res.render('user/create', { majors });
    }
    else {
        // Validate the request body against the user schema
        console.log('Dados recebidos:', req.body);
        const { error, value } = schema_1.userSchema.validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        try {
            const { repeatPassword } = value, userData = __rest(value, ["repeatPassword"]);
            yield (0, user_1.createUser)(userData);
            res.redirect('/user');
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield (0, user_1.getUserById)(id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const major = yield (0, major_1.getMajorById)(user.majorId);
        res.render('user/info', { user, major });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.method === 'GET') {
        const user = yield (0, user_1.getUserById)(id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const majors = yield (0, major_1.getAllMajors)();
        res.render('user/update', { user, majors });
        return;
    }
    const { error, value } = schema_1.userSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        yield (0, user_1.updateUser)(id, value);
        res.redirect('/user');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield (0, user_1.deleteUser)(id);
        res.redirect('/user');
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.default = { index, create, read, update, remove };
