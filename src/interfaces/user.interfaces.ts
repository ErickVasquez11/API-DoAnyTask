
import { Request } from 'express';
import { IUserModel } from '@models/user.model';

//Exportamos la interface
export interface ICreateUserRequest extends Request {
    body: IUserModel;
}