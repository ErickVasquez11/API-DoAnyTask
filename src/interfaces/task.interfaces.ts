
import { Request } from 'express';
import { ITaskModel } from '@models/task.model';

//Exportamos la interface
export interface ICreateTaskRequest extends Request {
    body: ITaskModel;
}