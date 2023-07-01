import express from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import 'dotenv/config';
import jwt from 'jsonwebtoken';



const authorization = (role) => async (req, res, next)=> {
    let token = req.headers.authorization;
    if(!token){
        return (
            res.status(httpStatus.UNAUTHORIZED).json({
                error:"You must be logged in"
            })
        )
    }
    try {
        const payload = await jwt.verify(token, process.env.JSON_SECRET_KEY);
        console.log(payload);
        if(role === "" || payload.role === role){
            req._id = payload._id;
            req.email = payload.email;
            req.role = payload.role;
            next();
        }
        else if(payload.role !== role){
            return(
                res.status(httpStatus.UNAUTHORIZED).json({
                    message:"user access restricted"
                })
            )
        }
        // req._id = payload._id;
        // req.email = payload.email;
        // next();
    }
    catch(err){
        return (
            res.status(httpStatus.BAD_REQUEST).json({
                success:false,
                error:err.message
            })
        );
    }
}

export default authorization;