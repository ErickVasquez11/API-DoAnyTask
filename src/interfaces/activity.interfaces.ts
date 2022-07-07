
import { Request } from 'express';
import { IActivityModel } from '@models/activity.model';

//Exportamos la interface
export interface ICreateActivityRequest extends Request {
    body: IActivityModel;
}