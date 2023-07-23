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
    
    if(req.files){
        let arr = [];
        
        for(const data of req.files){
            arr.push(data.location);
        }
        newProduct.imageUrl = arr;
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
            error:serviceData.message
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
    const productData = req.body;
    
    

    if(req.files){
        let arr = [];

        for(const data of req.files){
            arr.push(data.location);
        }
        productData.imageUrl = arr;
    }

    const serviceData = await updateProductService(id, productData);
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