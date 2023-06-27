import express from 'express';

import addUserService from '../services/user.service.js';

async function addUserController(req, res){
    const userData = req.body;
    const serviceData = await addUserService(userData);
    if(serviceData.success){
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

export default addUserController;