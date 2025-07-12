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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lorem_1 = require("../utils/lorem");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../services/user");
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_1.getUserByEmail)(email);
    if (!user) {
        return res.render('main/login', { error: 'Usuário não encontrado.' });
    }
    const valid = yield bcryptjs_1.default.compare(password, user.password);
    if (!valid) {
        return res.render('main/login', { error: 'Senha inválida.' });
    }
    req.session.userId = user.id;
    res.redirect('/user');
});
const index2 = (req, res) => {
    res.render('main/index2');
};
const login = (req, res) => {
    res.render('main/login');
};
const about = (req, res) => {
    res.render('main/about', {
        title: 'Sobre o Space Shooter',
        description: 'Space Shooter é um jogo arcade onde você controla uma nave espacial com visão 2D. Seu objetivo é sobreviver a discos voadores e asteroides.',
        images: [
            { url: '/img/about1.jpeg', alt: 'Imagem 1 do jogo Space Shooter' },
            { url: '/img/about2.png', alt: 'Imagem 2 do jogo Space Shooter' },
            { url: '/img/about3.png', alt: 'Imagem 3 do jogo Space Shooter' },
            { url: '/img/about4.png', alt: 'Imagem 4 do jogo Space Shooter' }
        ]
    });
};
const lorem = (req, res) => {
    const qtd = parseInt(req.params.num, 10);
    if (isNaN(qtd) || qtd < 1) {
        res.status(400).send('Parâmetro inválido');
        return;
    }
    let p = (0, lorem_1.generateLorem)(qtd);
    res.send(`<html><body>${p}</body></html>`);
};
const hb1 = (req, res) => {
    res.render('main/hb1', {
        mensagem: 'Universidade Federal do Amazonas',
    });
};
const hb2 = (req, res) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
};
const hb3 = (req, res) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes, layout: false });
};
const hb4 = (req, res) => {
    const technologies = [
        { nome: 'Express', tipo: 'Framework', poweredByNodejs: true },
        { nome: 'Laravel', tipo: 'Framework', poweredByNodejs: false },
        { nome: 'React', tipo: 'Library', poweredByNodejs: true },
        { nome: 'Handlebars', tipo: 'Engine View', poweredByNodejs: true },
        { nome: 'Django', tipo: 'Framework', poweredByNodejs: false },
        { nome: 'Docker', tipo: 'Virtualization', poweredByNodejs: false },
        { nome: 'Sequelize', tipo: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('main/hb4', {
        techs: technologies,
        layout: false,
    });
};
exports.default = { loginPost, index2, login, about, hb1, hb2, hb3, hb4, lorem };
