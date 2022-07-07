// Contendra los metodos que tenemos en un endpoint
// asi como obtener todos los usuarios, crear un usuario

//importamos el modelo creado
import { Request, Response } from 'express';
// importando la interface 
import { ICreateTaskRequest } from '@interfaces/task.interfaces';
import taskModel from '@models/task.model';
import { brotliCompress } from 'zlib';

interface IError {
    message: string;
}
//creamos las funciones
export const createTask = async (req: ICreateTaskRequest, res: Response) => {
    const { body } = req;
    try{
// Crearemos un nuevo usuario con el body 
//logica de negocio
const existinTask = await taskModel.findOne({name: body.name })
//fail fast 
    if(existinTask)
    throw { message : 'error prueba task'};


    const newTask = new taskModel(body);
    //guardaremos el nuevo usuario que crearemos
    await newTask.save();

    // Nos retornara la informacion que acabamos de crear
    return res.status(201).json(newTask);
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(404).json(err);
    }
}

export const getTask = async (req: Request, res: Response) => {

    //Extraemos la query
    const { params } = req;

    try {
    const task = await taskModel.findOne({name: params.name});
    return res.status(task ? 200 : 404).json(task);
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
} 

export const deleteTask = async (req: Request, res: Response) => {

    //Extraemos la query
    const { params } = req;

    try {
    const task = await taskModel.findOne({name: params.name});
    await taskModel.deleteOne({name: params.name })
    return res.status(task ? 200 : 404).json(task)
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
} 

export const getAllTasks = async (req: Request, res: Response) => {

    //Extraemos la query
    const { query } = req;
    const { page, limit } = query;
    //Castear a number
    let [ nPage, nLimit ] = [ +page!, +limit! ]

    const count = await taskModel.countDocuments();
    const totalPages = Math.ceil(count / nLimit);
    const hasPrev = !(nPage <= 1);
    const hasNext = nPage < totalPages;
    const nextPage = hasNext ?
    `${process.env.HOST}/tasks?page=${(nPage) + 1}&limit=${limit}` : null;
    const prevPage = hasPrev ?
    `${process.env.HOST}/tasks?page=${(nPage) - 1}&limit=${limit}` : null;

    const tasks = await taskModel
        .find()
        .skip(((nPage)-1) * nLimit)
        .limit(+(limit as string));

    return res.status(200).json({
        count,
        hasNext,
        hasPrev,
        data: tasks,
        nextPage,
        prevPage
    });
}

export const updateTask = async (req: ICreateTaskRequest, res: Response) => {
    const { body } = req;
    try{
// Crearemos un nuevo usuario con el body 
//logica de negocio
const existinTask = await taskModel.findOne({name: body.name })
//fail fast 
    if(!existinTask)
    throw { message : 'no existe la tarea'};

    await taskModel.updateOne({name: body.name}, body);  

    // Nos retornara la informacion que acabamos de crear
    return res.status(201).json();
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(404).json(err);
    }
}