
import { Request } from 'express';
import { IEventModel } from '@models/event.model';

//Exportamos la interface
export interface ICreateEventRequest extends Request {
    body: IEventModel;
}