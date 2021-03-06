// Contendra los metodos que tenemos en un endpoint
// asi como obtener todos los usuarios, crear un usuario

//importamos el modelo creado
import { Request, Response } from 'express';
// importando la interface 
import { ICreateUserRequest } from '@interfaces/user.interfaces';
import userModel from '@models/user.model';

interface IError {
    message: string;
}
//creamos las funciones
export const createUser = async (req: ICreateUserRequest, res: Response) => {
    const { body } = req;
    try{
// Crearemos un nuevo usuario con el body 
//logica de negocio
const existinUser = await userModel.findOne({email: body.email })
//fail fast 
    if(existinUser)
    throw { message : 'User already exist'};


    const newUser = new userModel(body);
    //guardaremos el nuevo usuario que crearemos
    await newUser.save();

    // Nos retornara la informacion que acabamos de crear
    return res.status(201).json(newUser);
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
}

export const getById = async (req: Request, res: Response) => {

    //Extraemos la query
    const { params } = req;

    try {
    const user = await userModel.findOne({_id: params.id});
    return res.status(user ? 200 : 404).json(user);
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
} 

export const findByName = async (req: Request, res: Response) => {

    //Extraemos la query
    const { query } = req;

    try {
    const users = await userModel.find({ name: query.name});
    return res.status(users ? 200 : 404).json(users);
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
} 

export const getAllUsers = async (req: Request, res: Response) => {

    //Extraemos la query
    const { query } = req;
    const { page, limit } = query;
    //Castear a number
    let [ nPage, nLimit ] = [ +page!, +limit! ]

    const count = await userModel.countDocuments();
    const totalPages = Math.ceil(count / nLimit);
    const hasPrev = !(nPage <= 1);
    const hasNext = nPage < totalPages;
    const nextPage = hasNext ?
    `${process.env.HOST}/users?page=${(nPage) + 1}&limit=${limit}` : null;
    const prevPage = hasPrev ?
    `${process.env.HOST}/users?page=${(nPage) - 1}&limit=${limit}` : null;

    const users = await userModel
        .find()
        .skip(((nPage)-1) * nLimit)
        .limit(+(limit as string));

    return res.status(200).json({
        count,
        hasNext,
        hasPrev,
        data: users,
        nextPage,
        prevPage
    });
}

export const deleteUser = async (req: Request, res: Response) => {

    //Extraemos la query
    const { params } = req;

    try {
    const user = await userModel.findOne({name: params.name});
    await userModel.deleteOne({name: params.name })
    return res.status(user ? 200 : 404).json(user)
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
} 

export const updateUser = async (req: ICreateUserRequest, res: Response) => {
    const { body } = req;
    try{
// Crearemos un nuevo usuario con el body 
//logica de negocio
const doesUserExists = await userModel.findOne({name: body.name })
//fail fast 
    if(!doesUserExists)
    throw { message : 'no existe el usuario'};

    await userModel.updateOne({name: body.name}, body);  

    // Nos retornara la informacion que acabamos de crear
    return res.status(201).json();
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(404).json(err);
    }
}