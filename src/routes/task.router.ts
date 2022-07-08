import { Router } from 'express';
import { createTask, getTask, deleteTask, getAllTasks, updateTask } from 'src/controllers/task.controller';

const passport = require('passport'); 
const taskRouter = Router();

//Crearemos un usuario 
taskRouter.post('/create',createTask);
taskRouter.get('/get/:name', getTask);
taskRouter.delete('/delete/:name', deleteTask);
taskRouter.get('/', passport.authenticate("jwt", { session: false}), getAllTasks);
taskRouter.put('/update', updateTask);
export default taskRouter;