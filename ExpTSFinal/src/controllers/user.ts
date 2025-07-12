import { Request, Response } from 'express'
import { createUser, getAllUsers, deleteUser, updateUser, getUserById, updateUserPass } from '../services/user'
import { userSchema, userUpdateSchema } from '../types/schema';
import { getAllMajors, getMajorById } from '../services/major';
import { requireAuth } from '../services/gameSession';

const index = async (req: Request, res: Response) => {
    try {
        const auth = await requireAuth(req, res);
        if(auth) {
            return res.redirect('/');
        }

        const users = await getAllUsers();
        const majors = await getAllMajors();

        const usersWithMajors = users.map(user => ({
            user,
            major: majors.find(m => m.id === user.majorId)
        }));
        res.render('user/index', { users: usersWithMajors });
    } catch (err) {
        res.status(500).send(err);
    }
};

const create = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        const majors = await getAllMajors();
        res.render('user/create', { majors });
    } else {
        // Validate the request body against the user schema
        console.log('Dados recebidos:', req.body);
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message); 
            return;
        }
        try {
            const { repeatPassword, ...userData } = value;
            await createUser(userData);
            res.redirect('/user');
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

const read = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await getUserById(id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const major = await getMajorById(user.majorId);
        res.render('user/info', { user, major });
    } catch (err) {
        res.status(500).send(err);
    }
};

const update = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (req.method === 'GET') {
        const user = await getUserById(id);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const majors = await getAllMajors();
        res.render('user/update', { user, majors });
        return;
    }
    console.log('Dados recebidos para atualização:', req.body);
    const { error, value } = userUpdateSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    try {
        await updateUser(id, value);
        res.redirect('/home');
    } catch (err) {
        res.status(500).send(err);
    }
}

const updatePassword = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    if (req.method === 'GET') {
        res.render('user/updatePass', { user: user });
        return;
    }
    console.log('Dados recebidos para atualização de senha:', req.body);
    const { currentPassword, newPassword, repeatNewPassword } = req.body;
    if (newPassword !== repeatNewPassword) {
        res.status(400).send('Passwords do not match');
        return;
    }
    try {
        console.log('Senha recebida para atualização:', newPassword);
        const updatedUser = await updateUserPass(id, newPassword); 
        console.log('Senha atualizada com sucesso:', updatedUser);
        res.redirect('/home');
    } catch (err) {
        console.error('Erro ao atualizar senha:', err);
        res.status(500).send('Erro ao atualizar senha');
    }
}   

const remove = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await deleteUser(id);
        res.redirect('/user');
    } catch (err) {
        res.status(500).send(err);
    }
}

export default { updatePassword, index, create, read, update, remove };