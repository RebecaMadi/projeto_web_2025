import { Request, Response } from 'express';
import { generateLorem } from '../utils/lorem';
import bcrypt from 'bcryptjs';
import { getUserByEmail, getUserById } from '../services/user';
import { CustomSession } from '../types/session';
import { getRecentGameSession, createGameSession, requireAuth, getGameSessionById, updateGameSession } from '../services/gameSession';
import { isSessionValid } from '../middlewares/middlewares';
import { sessionDuration } from '../utils/config';
import { v4 as uuidv4 } from 'uuid';

const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    res.render('main/login', { error: 'Usuário não encontrado.' });
    return
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.render('main/login', { error: 'Senha inválida.' });
    return
  }

  const mostRecentSession = await getRecentGameSession(user.id)
  console.log('Sessão mais recente:', mostRecentSession);
  if (mostRecentSession && isSessionValid(mostRecentSession.createdAt, sessionDuration)) {
    req.session.uid = mostRecentSession.id;
    res.cookie('uid', mostRecentSession.id, {
      maxAge: sessionDuration
    });
    res.redirect('/home');
    return 
  }

    const i = uuidv4();
    const n = await createGameSession(i, user.id, (mostRecentSession && mostRecentSession.score) || 0) as CustomSession;
    console.log('Sessão criada:', n);
    req.session.uid = i;
    res.cookie('uid', i, {
        maxAge: sessionDuration 
    });
    res.redirect('/home');
  return
};


export const home = async (req: Request, res: Response) => {
    const auth = await requireAuth(req, res);
    if ( auth == null ) {
        console.log('Usuário não autenticado, redirecionando para a página de login.');
        return res.redirect('/');
    }

    const user = await getUserById(auth.userId) || false;
    res.render('main/home', {
        user: user
    });
};

const index2 = async (req: Request, res: Response) => {
    const auth = await requireAuth(req, res);
    if(auth) {
        return res.redirect('/');
    }
    res.redirect('main/index2')
};

const login = (req: Request, res: Response) => {
    res.render('main/login')
}

const  game = async (req: Request, res: Response) => {
    const auth = await requireAuth(req, res);
    if ( auth == null ) {
        console.log('Usuário não autenticado, redirecionando para a página de login.');
        return res.redirect('/');
    }

    const user = await getUserById(auth.userId) || false;
    res.render('game/game', {
        user: user,
        sessionId: req.session.uid,
    });
}

export const updateGameSessionScore = async (req: Request, res: Response) => {
  console.log('Atualizando score da sessão de jogo', req.body);
  const { sessionId, score } = req.body;

  if (!sessionId || typeof score !== 'number') {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }
  try {
    const session = await getGameSessionById(sessionId);
    if (!session) return res.status(404).json({ error: 'Sessão não encontrada.' });

    const maxScore = Math.max(session.score, score);
    await updateGameSession(sessionId, maxScore);

    res.json({ success: true, maxScore });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar score.' });
  }
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

const logout = (req: Request, res: Response) => {
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid', { path: '/' }); 
    res.clearCookie('uid');

    if (err) res.send(err);
    else res.redirect('/');
  });
};

export default {logout, updateGameSessionScore, game, home, loginPost, index2, login, about, hb1, hb2, hb3, hb4, lorem };