import { IUserModel } from "@models/user.model";

const repo = require('../repositories/user.repo');

exports.getByEmail = async (email: string) => {
    const user = await repo.get({ email})

    return user
}

exports.getById = async (id: number) => {
    const user = await repo.get({ _id: id})

    return user
}

exports.findByName = async (name: string) => {
    const users = await repo.find({ name: name.toLowerCase() });

    return users;
}

exports.createUser = async ({ name, lastName, email, password}: IUserModel) => {
    const isNew = await repo.get({ email }) == null;

    if(!isNew)
        return false;

    const newUser = await repo.create({ name, lastName, email, password});

    return newUser;
}