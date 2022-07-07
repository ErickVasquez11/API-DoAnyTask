// Creacion de un router, distintos endpoint, funcion a ejecutar
import { Router } from 'express';
//Importamos el userRouter
import  userRouter  from './user.router';
import  taskRouter  from './task.router';
import  activityRouter  from './activity.router';

const  authRouter  = require ('./auth.router');


const baseRouter = Router();

//1. El baseRouter estara escuchando el usuario, todos los endpoint de userRouter
baseRouter.use('/users', userRouter);
baseRouter.use('/auth', authRouter);
baseRouter.use('/tasks', taskRouter);
baseRouter.use('/activities', activityRouter);

export default baseRouter;

