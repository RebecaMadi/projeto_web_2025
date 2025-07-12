import { Request, Response } from 'express'
import { createMajor, getAllMajors, deleteMajor, updateMajor, getMajorById } from '../services/major'
import { majorSchema } from '../types/schema';
import { requireAuth } from '../services/gameSession';

const index = async (req: Request, res: Response) => {
    // Handle GET request to list all majors
    const auth = await requireAuth(req, res);
    if(auth) {
        return res.redirect('/');
    }
    if (req.method === 'GET') {
        getAllMajors()
            .then(majors => {
                res.render('major/index', { majors })
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
}

const create = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        res.render('major/create')
    } else {
        const { error, value } = majorSchema.validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        try {
            await createMajor(value)
            res.redirect('/major')
        } catch (err) {
            res.status(500).send(err)
        }
    }
}

const read = (req: Request, res: Response) => {
    // Handle GET request to read a specific major
    const id = req.params.id
    getMajorById(id)
        .then(major => {
            if (!major) {
                res.status(404).send('Major not found')
                return;
            }
            res.render('major/info', { major })
        })
}

const update = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (req.method === 'GET') {
    const major = await getMajorById(id);
    if (!major){
        res.status(404).send('Major não encontrado');
        return;
    }
    res.render('major/update', { major });
    return;
  }

  // POST: recebe dados do formulário e atualiza
  const { error, value } = majorSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  try {
    await updateMajor(id, value);
    res.redirect('/major');
  } catch (err) {
    res.status(400).send('Erro ao atualizar major');
  }
};

const remove = (req: Request, res: Response) => {
    const id = req.params.id
    getMajorById(id)
        .then(major => {
            if (!major) {
                res.status(404).send('Major not found')
                return;
            }
        })
    deleteMajor(id)
        .then(() => {
            res.redirect('/major')
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

export default { index, read, create, update, remove }