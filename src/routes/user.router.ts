import { Router } from 'express';
import { createUser , findByName, getAllUsers, getById } from 'src/controllers/user.controller';

const userRouter = Router();

//Crearemos un usuario 
userRouter.post('/create', createUser);

userRouter.get('/search', findByName);

userRouter.get('/:id', getById);

userRouter.get('/', getAllUsers);

export default userRouter;