const userModel = require('../model/user.model')

exports.get = async ( searchCriteria: any) => {
    return await userModel.findOne({ searchCriteria});
}

exports.find = async ( findCriteria: any) => {
    return await userModel.find({ findCriteria});
}

exports.create = async(user: any) => {
    return new userModel(user).save();
}
