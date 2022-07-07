// Contendra los metodos que tenemos en un endpoint
// asi como obtener todos los usuarios, crear un usuario

//importamos el modelo creado
import { Request, Response } from 'express';
// importando la interface 
import { ICreateActivityRequest } from '@interfaces/activity.interfaces';
import activityModel from '@models/activity.model';
import { brotliCompress } from 'zlib';

interface IError {
    message: string;
}
//creamos las funciones
export const createActivity= async (req: ICreateActivityRequest, res: Response) => {
    const { body } = req;
    try{
// Crearemos un nuevo usuario con el body 
//logica de negocio
const existinActivity = await activityModel.findOne({name: body.name })
//fail fast 
    if(existinActivity)
    throw { message : 'error en actividad'};


    const newActivity = new activityModel(body);
    //guardaremos el nuevo usuario que crearemos
    await newActivity.save();

    // Nos retornara la informacion que acabamos de crear
    return res.status(201).json(newActivity);
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(404).json(err);
    }
}

export const getActivity = async (req: Request, res: Response) => {

    //Extraemos la query
    const { params } = req;

    try {
    const activity = await activityModel.findOne({name: params.name});
    return res.status(activity ? 200 : 404).json(activity);
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
} 

export const deleteActivity = async (req: Request, res: Response) => {

    //Extraemos la query
    const { params } = req;

    try {
    const activity = await activityModel.findOne({name: params.name});
    await activityModel.deleteOne({name: params.name })
    return res.status(activity ? 200 : 404).json(activity)
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
} 

export const getAllActivities = async (req: Request, res: Response) => {

    //Extraemos la query
    const { query } = req;
    const { page, limit } = query;
    //Castear a number
    let [ nPage, nLimit ] = [ +page!, +limit! ]

    const count = await activityModel.countDocuments();
    const totalPages = Math.ceil(count / nLimit);
    const hasPrev = !(nPage <= 1);
    const hasNext = nPage < totalPages;
    const nextPage = hasNext ?
    `${process.env.HOST}/activities?page=${(nPage) + 1}&limit=${limit}` : null;
    const prevPage = hasPrev ?
    `${process.env.HOST}/activities?page=${(nPage) - 1}&limit=${limit}` : null;

    const activities = await activityModel
        .find()
        .skip(((nPage)-1) * nLimit)
        .limit(+(limit as string));

    return res.status(200).json({
        count,
        hasNext,
        hasPrev,
        data: activities,
        nextPage,
        prevPage
    });
}

export const updateActivity = async (req: ICreateActivityRequest, res: Response) => {
    const { body } = req;
    try{
// Crearemos un nuevo usuario con el body 
//logica de negocio
const existinActivity = await activityModel.findOne({name: body.name })
//fail fast 
    if(!existinActivity)
    throw { message : 'no existe la tarea'};

    await activityModel.updateOne({name: body.name}, body);  

    // Nos retornara la informacion que acabamos de crear
    return res.status(201).json();
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(404).json(err);
    }
}