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
const major_1 = require("../services/major");
const schema_1 = require("../types/schema");
const index = (req, res) => {
    // Handle GET request to list all majors
    if (req.method === 'GET') {
        (0, major_1.getAllMajors)()
            .then(majors => {
            res.render('major/index', { majors });
        })
            .catch(err => {
            res.status(500).send(err);
        });
    }
};
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'GET') {
        res.render('major/create');
    }
    else {
        const { error, value } = schema_1.majorSchema.validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        try {
            yield (0, major_1.createMajor)(value);
            res.redirect('/major');
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
});
const read = (req, res) => {
    // Handle GET request to read a specific major
    const id = req.params.id;
    (0, major_1.getMajorById)(id)
        .then(major => {
        if (!major) {
            res.status(404).send('Major not found');
            return;
        }
        res.render('major/info', { major });
    });
};
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (req.method === 'GET') {
        const major = yield (0, major_1.getMajorById)(id);
        if (!major) {
            res.status(404).send('Major não encontrado');
            return;
        }
        res.render('major/update', { major });
        return;
    }
    // POST: recebe dados do formulário e atualiza
    const { error, value } = schema_1.majorSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        yield (0, major_1.updateMajor)(id, value);
        res.redirect('/major');
    }
    catch (err) {
        res.status(400).send('Erro ao atualizar major');
    }
});
const remove = (req, res) => {
    const id = req.params.id;
    (0, major_1.getMajorById)(id)
        .then(major => {
        if (!major) {
            res.status(404).send('Major not found');
            return;
        }
    });
    (0, major_1.deleteMajor)(id)
        .then(() => {
        res.redirect('/major');
    })
        .catch(err => {
        res.status(500).send(err);
    });
};
exports.default = { index, read, create, update, remove };
