const jwt = require('jsonwebtoken')
import userModel from '@models/user.model';
import { Request, Response } from 'express';
import { ICreateUserRequest } from '@interfaces/user.interfaces';
import {mailer} from '@utils/mailer'

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
    
        return res.status(200).json({ token});

    }   
    catch(err){
        return res.status(err.status ?? 400).send(err);
    }   
}


exports.register = async (req: Request, res: Response) => {
    const { name, lastName, email, password, dateofbirth } = req.body;

    try {
        const isEmailAvailable = await userModel.findOne({ email });
        
        if(isEmailAvailable)
            throw { status: 400, message:  'Email already in use'}
        
        const newUser = new userModel({
            name,
            lastName,
            email,
            password,
            dateofbirth
        });
        await newUser.save();
        
        const mssg = {
            to: email,
            subject: "Welcome",
            text: "Welcome to Do Any Task"
        }
        const u = await mailer(mssg);

        return res.status(200).json( "User created");
    }
    catch(err) {
        return res.status(err.status ?? 400).send(err)
    }
}

exports.requestPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;

        const user = await userModel.findOne( {email});

        if(!user)
            throw { status: 404, message: 'Could\'nt find user with that email '};

        const payload = { _id: user._id };

        const token = jwt.sign(payload, process.env.JWT_RECOVERY_SECRET);

        user.recovery = {
            token: token,
            url: `${process.env.HOST}/auth/reset/${token}`
        }

        await user.save();

        const mssg = {
            to: email,
            subject: 'Password recovery',
            text: `To recovery your password, please visit the following link: ${user.recovery.url}`
        }

        await mailer(mssg);

        return res.status(200).json({
            url: user.recovery.url
        })
    }
    catch(err) {
        return res.status(err.status ?? 400).send(err)
    }
}

exports.resetPassword = async  (req: Request, res: Response) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await userModel.findOne({ "recovery.token": token });

        if(!user)
            throw { status: 404, message: 'Could\'nt find a user with that token'};

        user.password = password;
        user.recovery = null;
        await user.save();

        return res.status(200).json({ message: 'Password updated' })
    }
    catch(err) {
        return res.status(err.status ?? 400).send(err);
    }
}