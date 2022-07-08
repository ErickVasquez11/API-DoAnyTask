import { Router } from 'express';
import { createEvent, getEvent, deleteEvent, getAllEvents, updateEvent } from 'src/controllers/event.controller';

const passport = require('passport'); 
const taskRouter = Router();

//Crearemos un usuario 
taskRouter.post('/create',createEvent);
taskRouter.get('/get/:name', getEvent);
taskRouter.delete('/delete/:name', deleteEvent);
taskRouter.get('/', passport.authenticate("jwt", { session: false}), getAllEvents);
taskRouter.put('/update', updateEvent);
export default taskRouter;