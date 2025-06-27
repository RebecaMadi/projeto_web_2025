import { Request, Response } from 'express'
import { createUser, getAllUsers, deleteUser, updateUser, getUserById } from '../services/user'
import { userSchema } from '../types/schema';
import { getAllMajors, getMajorById } from '../services/major';

const index = async (req: Request, res: Response) => {
    try {
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
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message); 
            return;
        }
        try {
            await createUser(value)
            res.redirect('/user')
        } catch (err) {
            res.status(500).send(err)
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

    const { error, value } = userSchema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    try {
        await updateUser(id, value);
        res.redirect('/user');
    } catch (err) {
        res.status(500).send(err);
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

export default { index, create, read, update, remove };