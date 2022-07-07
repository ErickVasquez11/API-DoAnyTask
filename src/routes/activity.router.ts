import { Router } from 'express';
import { createActivity, getActivity, deleteActivity, getAllActivities, updateActivity } from 'src/controllers/activity.controller';

const activityRouter = Router();

//Crearemos un usuario 
activityRouter.post('/create', createActivity);
activityRouter.get('/get/:name', getActivity);
activityRouter.delete('/delete/:name', deleteActivity);
activityRouter.get('/', getAllActivities);
activityRouter.put('/update', updateActivity);
export default activityRouter;