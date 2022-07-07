
import { Request } from 'express';
import { ITaskUserModel } from '@models/task.model';

//Exportamos la interface
export interface ICreateTaskRequest extends Request {
    body: ITaskUserModel;
}