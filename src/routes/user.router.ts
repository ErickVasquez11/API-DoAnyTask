import { Router } from 'express';
import { createUser , getAllUsers } from 'src/controllers/user.controller';

const userRouter = Router();

//Crearemos un usuario 
userRouter.post('/create', createUser);
userRouter.get('/', getAllUsers);

export default userRouter;