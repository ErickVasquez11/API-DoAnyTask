const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model');
import { Request, Response } from 'express';
import { ICreateUserRequest } from '@interfaces/user.interfaces';

//Proceso de creacion de un token
exports.login = async (req: ICreateUserRequest, res: Response) => {
    try{
    const {name, password} = req.body
    const user = await userModel.findOne({name});

    if (!user)
        throw {status: 404, message: 'User not found'};
        
    let validPass = password === user.password;

    if(!validPass)
            throw{ status: 401, message: 'Invalid password' };
    let payload = { _id: user._id};

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    
    return res.status(200).json({token});
    }   
    catch(err){
        return res.status(err.status ?? 400).send(err);
    }   
}


exports.register = async (req: Request, res: Response) => {
    const { name, lastName, email, password } = req.body;

    try {
        const isEmailAvailable = (await userModel.findOne({ email }));

        if(!isEmailAvailable)
            throw { status: 400, message:  'Email already in use'}
        
        const newUser = new userModel({
            name,
            lastName,
            email,
            password
        });
        await newUser.save();

        return res.status(200).json( "User created");
    }
    catch(err) {
        return res.status(err.status ?? 400).send(err)
    }
}