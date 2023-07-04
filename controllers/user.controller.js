import express from 'express';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';


import sendEmail from '../utils/email.js';
import {addUserService, fetchAllUserService, fetchOneUserService, updateUserService, deleteUserService, loginUserService} from '../services/user.service.js';

async function addUserController(req, res){
    const {name, email, password, role, mobile} = req.body;
    if(!name || !email || !password || !role){
        res.status(500).json({
            success:false,
            error:"Please fill all the field"
        })
    }

    const newPassword = await bcrypt.hash(password, 10);
    const newUser = {name, email, role, password:newPassword};
    
    if(mobile){
        newUser.mobile = mobile;
    }
    const serviceData = await addUserService(newUser);
    if(serviceData.success){
        sendEmail(email, "You are registered successfully", `hello ${name} ! \n You are register succefully \n Thank you \n LPUKart `)
        res.status(200).json({
            message:serviceData.message,
            data:serviceData.data
        })
    }
    else {
        res.status(500).json({
            message:serviceData.message
        })
    }
}

async function fetchAllUserController(req, res){
    const serviceData = await fetchAllUserService();
    const authorizationData = {_id: req._id, email: req.email, role: req.role};
    if(serviceData.success){
        res.status(200).json({
            message:serviceData.message,
            data:serviceData.data,
            roleData: authorizationData
        })
    }
    else {
        res.status(500).json({
            error:serviceData.error
        })
    }
}

async function fetchOneUserController(req, res){
    const {id} = req.params;
    const serviceData = await fetchOneUserService(id);
    if(serviceData.success){
        res.status(200).json({
            message:serviceData.message,
            data:serviceData
        })
    }
    else {
        res.status(500).json({
            error:serviceData.error
        })
    }
}

async function updateUserController(req, res){
    const {id} = req.params;
    const inputData = req.body;
    const serviceData = await updateUserService(id, inputData);
    if(serviceData.success){
        res.status(200).json({
            message:serviceData.message,
            data:serviceData
        })
    }
    else {
        res.status(500).json({
            error:serviceData.error
        })
    }
    
}

async function deleteUserController(req, res){
    const {id} = req.params;
    const serviceData = await deleteUserService(id);
    if(serviceData.success){
        res.status(200).json({
            message:serviceData.message,
            data:serviceData
        })
    }
    else {
        res.status(500).json({
            error:serviceData.error
        })
    }
}

async function loginUserController(req, res){
    const {email, password} = req.body;
    if(!email || !password){
        return(
            res.status(httpStatus.BAD_REQUEST).json({
                message:"fill all the field"
            })
        )
    }
    const serviceData = await loginUserService(email);
    if(!serviceData.success){
        return(
            res.status(httpStatus.UNAUTHORIZED).json({
                message:"User not found"
            })
        )
    }
    const isPasswordMatch = await bcrypt.compare(password, serviceData.data.password);
    if(!isPasswordMatch){
        return(
            res.status(httpStatus.UNAUTHORIZED).json({
                message:"password doesn't match"
            })
        )
    }
    const jwtToken = jwt.sign({
        _id:serviceData.data._id,
        role: serviceData.data.role,
        email: serviceData.data.email
    }, process.env.JSON_SECRET_KEY)
    return (
        res.status(httpStatus.OK).json({
            token:jwtToken,
            message:"User authenticated successfully"
        })
    )
}


export {addUserController, fetchAllUserController, fetchOneUserController, updateUserController, deleteUserController, loginUserController};