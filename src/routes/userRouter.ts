import { Router } from 'express';

const userRouter = Router();

//GetAll
userRouter.get('/', (req, res) => {
    return res.status(200).json('a');
});

//GetById
userRouter.get('/:id', (req, res) => {
    return res.status(200).json(req.params.id);
});

//FindByUsername
userRouter.get('/find', (req, res) => {
    return res.status(200).json('a');
});

export default userRouter;