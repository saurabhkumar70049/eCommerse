import express from 'express';
import mongoose from 'mongoose';
// import user from '../models/user.model.js';

const user = mongoose.model("User");


async function addUserService(userData){
    const modelData = await user.findOne({email: userData.email})
    if(modelData){
        return {
            success:false,
            message:"User Already exist",
            data:modelData
        }
    }
    else {
        userData = new user({
            ...userData
        })
        const saveData = await userData.save(); 
        if(saveData){
            return {
                success:true,
                message:"User is registered",
                data:saveData
            }
        }
        else {
            return {
                success:false,
                message:"error occure to register user"
            }
        }
    }
}

export default addUserService;