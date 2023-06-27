
import express from 'express';
import {addProductService, fetchAllProductServices, fetchOneProductServices, updateProductService, deleteProductService} from '../services/product.service.js';


async function addProductController(req, res) {
    const newProduct = req.body;
    const serviceData = await addProductService(newProduct)
    // .then((serviceData)=> { // when i try to use it as promise it give me error that success property undifine
    //     if(serviceData.success){
    //         res.status(200).send({
    //             message:serviceData.message,
    //             data:serviceData.data
    //         })
    //     }
    //     else {
    //         res.status(500).send({
    //             message:serviceData.message
    //         })
    //     }    
    // })

    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }
    else {
        res.status(500).send({
            message:serviceData.message
        })
    }
}


async function fetchAllProductController(req, res) {
    // const newProduct = req.body;
    const serviceData = await fetchAllProductServices();
    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }
    else {
        res.status(500).send({
            message:serviceData.message
        })
    }
}

async function fetchOneProductController(req, res){
    const id = req.params.id;
    const serviceData = await fetchOneProductServices(id);
    if(serviceData.success) {
        res.status(200).json({
            message:serviceData.message,
            data:serviceData.data
        })
    }
    else {
        res.send(500).json({
            message: serviceData.message,
        })
    }
}

async function updateProductController(req, res) {
    const {id} = req.params;
    const userData = req.body;

    const serviceData = await updateProductService(id, userData);

    if(serviceData.success) {
        res.status(200).json({
            message: serviceData.message,
            data: serviceData.data
        })
    }
    else {
        res.status(500).json({
            message: serviceData.message
        })
    }
}

async function deleteProductController(req, res){
    const {id} = req.params;
    const serviceData = await deleteProductService(id);
    if(serviceData){
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

export {addProductController, fetchAllProductController, fetchOneProductController, updateProductController, deleteProductController};