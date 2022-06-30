// Creacion de un router, distintos endpoint, funcion a ejecutar
import { Router } from 'express';

//Importamos el userRouter
import  userRouter  from './user.router';


const baseRouter = Router();

//1. El baseRouter estara escuchando el usuario, todos los endpoint de userRouter
baseRouter.use('/users', userRouter);

export default baseRouter;

