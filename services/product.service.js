import express from 'express';
import mongoose from 'mongoose';

const product = mongoose.model("Product");


async function addProductService(productData) {
    const {name, price, quantity} = productData;
    if(!name || !price){
        return {
            success:false,
            message:"Fill all the field"
        }
    }
    const productFind = await product.findOne({pid:productData.pid});
    if(productFind) {
        return {
            success:false,
            message:"This product is already exist"
        }
    }
    productData = new product({
        ...productData
    })
    const saveProduct = await productData.save();
    if(!saveProduct){
        return {
            success: false,
            message:"Product is not Added"
        }
    }else{
        return {
            success:true,
            message:"Product Added",
            data:saveProduct
        }
    }
    // const result = await product.create(productData);
    // if(result){
    //     return {
    //         success:true,
    //         message:"Product Added",
    //         data:result
    //     }
    // } 
    // else {
    //     return {
    //         success: false,
    //         message:"Product is not Added"
    //     }
    // }

}

async function fetchAllProductServices(){
    const productFind = await product.find();
    if(productFind) {
        if(productFind.length === 0) {
            return {
                success:false,
                message:"Database is empty"
            }
        }
        return {
            success:true,
            message:"All Products Available",
            data:productFind
        }
    }
    else{
        return {
            success:false,
            message:"Data doens't find"
        }
    }
}

async function fetchOneProductServices(_id) {
    const productFind = await product.findOne({_id:_id});
    if(productFind){
        return {
            success: true,
            message: "Product Detail",
            data : productFind
        }
    }
    if(!productFind){
        return {
            success: false,
            message: "Product is not Available",
        }
    }
    else {
        return {
            success: false,
            message: "Error occure"
        }
        
    }
}


async function updateProductService(_id, updateData){
    const updatedData = await product.updateOne({_id:_id}, {$set:{name:updateData.name, price: updateData.price, qty: updateData.qty}});
    if(updatedData){
        return {
            success:true,
            message:"Product is updated",
            data : updatedData
        }
    }
    else {
        return {
            success: false,
            message:"error occure in updation"
        }
    }
}

async function deleteProductService(_id){
    const modelData = await product.deleteOne({_id});
    if(modelData){
        return {
            success:true,
            message:"Product is deleted",
            data:modelData
        }
    }
    else{
        return {
            success: true,
            message: "product not deleted"
        }
    }
}

export {addProductService, fetchAllProductServices, fetchOneProductServices, updateProductService, deleteProductService};