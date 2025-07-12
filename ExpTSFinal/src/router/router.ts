import { Router } from 'express';
import  mainController  from '../controllers/main';
import majorController from '../controllers/major';
import userController from '../controllers/user';
import { authMiddleware } from '../middlewares/middlewares';

const router = Router();

router.get('/', mainController.login);
router.post('/', mainController.loginPost);
router.get('/home', authMiddleware, mainController.home);
router.get('/index2', mainController.index2);
router.get('/about', mainController.about);
router.get('/lorem/:num', mainController.lorem);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

router.get('/major', authMiddleware,  majorController.index)
router.all('/major/create', authMiddleware, majorController.create)
router.get('/major/read/:id',  authMiddleware, majorController.read)
router.all('/major/update/:id', authMiddleware, majorController.update)
router.post('/major/remove/:id', authMiddleware, majorController.remove)

router.get('/user', authMiddleware, userController.index)
router.all('/user/create',  userController.create)
router.get('/user/read/:id',  authMiddleware, userController.read)
router.all('/user/update/:id',  authMiddleware, userController.update)
router.post('/user/remove/:id',  authMiddleware, userController.remove)
router.all('/user/updatePass/:id', authMiddleware, userController.updatePassword);

router.get('/game', authMiddleware, mainController.game);
router.post('/game/update-score', authMiddleware, mainController.updateGameSessionScore);
router.get('/logout', authMiddleware, mainController.logout);
export default router;