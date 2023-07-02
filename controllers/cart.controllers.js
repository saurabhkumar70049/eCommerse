import httpStatus from 'http-status';


import { addCartService, fetchAllCartService ,fetchUserCartService } from "../services/cart.service.js";


async function addCartController(req, res){
    const inputData = req.body;
    const serviceData = await addCartService(inputData);

    if(serviceData.success){
        return (
            res.status(httpStatus.OK).json({
                message: serviceData.message,
                data: serviceData.data
            })
        )
    }
    else {
        return (
            res.status(httpStatus['404_MESSAGE']).json({
                error:inputData.error
            })
        )
    }
}


async function fetchAllCardController(req, res){
    const serviceData = await fetchAllCartService();
    if(serviceData.success){
        return (
            res.status(httpStatus.OK).json({
                message:serviceData.message,
                data:serviceData.data
            })
        )
    }
    else {
        return (
            res.status(httpStatus.SERVICE_UNAVAILABLE).json({
                error:serviceData.error
            })
        )
    }
}

async function fetchUserCartController(req, res){
    const {uid} = req.params;
    // console.log(uid);
    const serviceData = await fetchUserCartService(uid);
    if(serviceData.success){
        return (
            res.status(httpStatus.OK).json({
                message:serviceData.message,
                data: serviceData.data
            })
        )
    }
    else {
        return (
            res.status(httpStatus.NOT_FOUND).json({
                error:serviceData.error
            })
        )
    }
}

export {addCartController, fetchAllCardController, fetchUserCartController};