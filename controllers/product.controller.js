import httpStatus from 'http-status';
import {addProductService, fetchAllProductServices, fetchOneProductServices, updateProductService, deleteProductService} from '../services/product.service.js';
import { json } from 'express';


async function addProductController(req, res) {
    const newProduct = req.body;
    if(!newProduct.name  && !newProduct.productId && !newProduct.price && !newProduct.quantity){
        return (
            res.status(httpStatus.BAD_REQUEST).json({
                message:"Please fill all mandory fields"
            })
        )
    }
    if(req.file){
        console.log(req.file.location);
        newProduct.imageUrl = req.file.location;
    }
    if(newProduct.tag){
        newProduct.tag = JSON.parse(newProduct.tag); // start from here, parse method not working
    }
    if(newProduct.catogory){
        newProduct.tag = JSON.parse(newProduct.catogory);
    }

    const serviceData = await addProductService(newProduct)
    
    if(serviceData.success){
        res.status(200).send({
            message:serviceData.message,
            data:serviceData.data
        })
    }
    else {
        res.status(500).send({
            error:serviceData.message
        })
    }
}


async function fetchAllProductController(req, res) {

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
            error: serviceData.message
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