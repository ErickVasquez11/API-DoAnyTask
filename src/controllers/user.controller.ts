// Contendra los metodos que tenemos en un endpoint
// asi como obtener todos los usuarios, crear un usuario

//importamos el modelo creado
import { Request, Response } from 'express';

import userModel, { IUserModel } from '@models/user.model';

interface ICreateUserRequest extends Request {
    body: IUserModel;
}

//Lo que tendra la paginacion
interface IPaginate {
    limit: number;
    page: number;
    // Propiedad de ordenamiento
    sortBy: string;
    
    //tipo
    order: 'ASC' | 'DESC';
}
//para la paginacion

//creamos las funciones
export const createUser = async (req: ICreateUserRequest, res: Response) => {
    const { body } = req;

// Crearemos un nuevo usuario con el body 
    const newUser = new userModel(body);
    //guardaremos el nuevo usuario que crearemos
    await newUser.save();

    // Nos retornara la informacion que acabamos de crear
    return res.status(201).json(newUser);
}

export const getAllUsers = async (req: Request, res: Response) => {
   
    //Extraemos la query
    const { query } = req;
    
    const { page, limit } = query;
    
    const users = await userModel.find().limit(+(limit as string));

    return res.status(200).json(users);
}