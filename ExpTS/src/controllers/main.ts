import { Request, Response } from 'express';
import { generateLorem } from '../utils/lorem';

const index = (req: Request, res: Response) => {
    res.render('main/index');
};

const about = (req: Request, res: Response) => {
    res.render('main/about', {
        title: 'Sobre o Space Shooter',
        description:
        'Space Shooter é um jogo arcade onde você controla uma nave espacial com visão 2D. Seu objetivo é sobreviver a discos voadores e asteroides.',
        images: [
            { url: '/img/about1.jpeg', alt: 'Imagem 1 do jogo Space Shooter' },
            { url: '/img/about2.png', alt: 'Imagem 2 do jogo Space Shooter' },
            { url: '/img/about3.png', alt: 'Imagem 3 do jogo Space Shooter' },
            { url: '/img/about4.png', alt: 'Imagem 4 do jogo Space Shooter' }
        ]
    });
}

const lorem = (req: Request<{ num: string }>, res: Response) => {
    const qtd = parseInt(req.params.num, 10);
    if (isNaN(qtd) || qtd < 1) {
        res.status(400).send('Parâmetro inválido');
        return;
    }
    let p = generateLorem(qtd);
    res.send(`<html><body>${p}</body></html>`);
}

const hb1 = (req: Request, res: Response) => {
    res.render('main/hb1', {
        mensagem: 'Universidade Federal do Amazonas',
    });
};


const hb2 = (req: Request, res: Response) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
};  

const hb3 = (req: Request, res: Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes, layout: false });
};  

const hb4 = (req: Request, res: Response) => {
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

export default { index, about, hb1, hb2, hb3, hb4, lorem };