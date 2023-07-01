import express from 'express';
import mongoose from 'mongoose';
// import user from '../models/user.model.js';

const User = mongoose.model("User");


async function addUserService(userData){
    const modelData = await User.findOne({email: userData.email})
    if(modelData){
        return {
            success:false,
            message:"User Already exist",
            data:modelData
        }
    }
    else {
        userData = new User({
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

async function fetchAllUserService(){
    const usersData = await User.find({});
    if(usersData){
        return {
            success:true,
            message:"All User Detail",
            data: usersData
        }
    }
    else {
        return {
            success:false,
            error:"Error Occure"
        }
    }
}

async function fetchOneUserService(_id){
    const userData = await User.findOne({_id});
    if(userData){
        return {
            success:true,
            message:"User detail",
            data: userData
        }
    }
    else {
        return {
            success:false,
            error:"user not found"
        }
    }
}

async function updateUserService(_id, inputData){
    const userData = await User.findByIdAndUpdate(_id, inputData, {new:true});
    if(userData){
        return {
            success:true,
            message:"User Updated",
            data: userData
        }
    }
    else {
        return {
            success:false,
            error:"user not found"
        }
    }
}

async function deleteUserService(_id){
    const userData = await User.deleteOne({_id});
    if(userData){
        return {
            success:true,
            message:"User deleted",
            data: userData
        }
    }
    else {
        return {
            success:false,
            error:"Error Occure in deletion"
        }
    }

}

async function loginUserService(email){
    const userData = await User.findOne({email});
    if(userData){
        return {
            success:true,
            message:"User found",
            data:userData
        }
    }
    else {
        return {
            success:false,
            error:"User not found"
            
        }
    }
}

export {addUserService, fetchAllUserService, fetchOneUserService, updateUserService, deleteUserService, loginUserService};