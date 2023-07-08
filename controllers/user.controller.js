import express from 'express';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';


import sendEmail from '../utils/email.js';
import {addUserService, fetchAllUserService, fetchOneUserService, updateUserService, deleteUserService, findByEmailService, forgetPasswordService, resetPasswordService} from '../services/user.service.js';

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
    const serviceData = await findByEmailService(email);
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

async function forgetPasswordController(req, res){
    const {email} = req.body;
    if(!email){
        return(
            res.status(httpStatus.BAD_REQUEST).json({
                message:"fill all the field"
            })
        )
    }
    const serviceData = await findByEmailService(email);
    if(!serviceData.success){
        return(
            res.status(httpStatus.UNAUTHORIZED).json({
                message:"User not found"
            })
        )
    }
    const otp = Math.floor(100000+Math.random()*99999);
    const otpExpire = new Date(Date.now() + (15 * 60 * 1000));
    const forgetServiceData = await forgetPasswordService(email, otp, otpExpire);
    if(forgetServiceData.success){
        const txt = `Your password reset OTP is ${otp} /nand it is expire at ${(otpExpire)}`
        sendEmail(email, "OTP for Password Reset", txt);
        res.status(200).json({
            message:forgetServiceData.message,
            data:forgetServiceData.data
        })
    }
    else {
        res.status(404).json({
            error:forgetServiceData.error
        })
    }

    
}

async function resetPasswordController(req, res){
    const {email, otp, password} = req.body;
    if(!email || !otp || !password){
        return(
            res.status(httpStatus.BAD_REQUEST).json({
                message:"fill all the field"
            })
        )
    }
    
    const newPassword = await bcrypt.hash(password, 10);
    const resetServiceData = await resetPasswordService(email, otp, newPassword);
    if(resetServiceData.success){
        const txt = `Your password have reseted if you did not do this then Immidiatly contact us`
        sendEmail(email, "Password Update", txt);
        res.status(200).json({
            message:resetServiceData.message,
            data:resetServiceData.data
        })
    }
    else {
        res.status(404).json({
            error:resetServiceData.error
        })
    }
}


export {addUserController, fetchAllUserController, fetchOneUserController, updateUserController, deleteUserController, loginUserController, forgetPasswordController, resetPasswordController};