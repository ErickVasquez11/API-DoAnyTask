// Contendra los metodos que tenemos en un endpoint
// asi como obtener todos los usuarios, crear un usuario

//importamos el modelo creado
import { Request, Response } from 'express';
// importando la interface 
import { ICreateEventRequest } from '@interfaces/event.interfaces';
import eventModel from '@models/event.model';
import { brotliCompress } from 'zlib';

interface IError {
    message: string;
}
//creamos las funciones
export const createEvent = async (req: ICreateEventRequest, res: Response) => {
    const { body } = req;
    try{
// Crearemos un nuevo usuario con el body 
//logica de negocio
const existingEvent = await eventModel.findOne({name: body.name })
//fail fast 
    if(existingEvent)
    throw { message : 'error prueba task'};


    const newEvent = new eventModel(body);
    //guardaremos el nuevo usuario que crearemos
    await newEvent.save();

    // Nos retornara la informacion que acabamos de crear
    return res.status(201).json(newEvent);
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(404).json(err);
    }
}

export const getEvent = async (req: Request, res: Response) => {

    //Extraemos la query
    const { params } = req;

    try {
    const event = await eventModel.findOne({name: params.name});
    return res.status(event ? 200 : 404).json(event);
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
} 

export const deleteEvent = async (req: Request, res: Response) => {

    //Extraemos la query
    const { params } = req;

    try {
    const event = await eventModel.findOne({name: params.name});
    await eventModel.deleteOne({name: params.name })
    return res.status(event ? 200 : 404).json(event)
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(400).json(err);
    }
} 

export const getAllEvents = async (req: Request, res: Response) => {

    //Extraemos la query
    const { query } = req;
    const { page, limit } = query;
    //Castear a number
    let [ nPage, nLimit ] = [ +page!, +limit! ]

    const count = await eventModel.countDocuments();
    const totalPages = Math.ceil(count / nLimit);
    const hasPrev = !(nPage <= 1);
    const hasNext = nPage < totalPages;
    const nextPage = hasNext ?
    `${process.env.HOST}/events?page=${(nPage) + 1}&limit=${limit}` : null;
    const prevPage = hasPrev ?
    `${process.env.HOST}/events?page=${(nPage) - 1}&limit=${limit}` : null;

    const tasks = await eventModel
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

export const updateEvent = async (req: ICreateEventRequest, res: Response) => {
    const { body } = req;
    try{
// Crearemos un nuevo usuario con el body 
//logica de negocio
const existingEvent = await eventModel.findOne({name: body.name })
//fail fast 
    if(!existingEvent)
    
    throw { message : 'The event does\'nt exist'};
    await eventModel.updateOne({name: body.name}, body);  

    // Nos retornara la informacion que acabamos de crear
    return res.status(201).json();
    }
    catch(err: any) {
        //logica personalizada para los errores
        
        return res.status(404).json(err);
    }
}