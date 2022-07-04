import { Router } from 'express';
import { createUser , getAllUsers, getById } from 'src/controllers/user.controller';

const userRouter = Router();

//Crearemos un usuario 
userRouter.post('/create', createUser);

userRouter.get('/:id', getById);
userRouter.get('/', getAllUsers);

export default userRouter;