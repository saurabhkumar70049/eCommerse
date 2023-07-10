import httpStatus from "http-status";



import { addAddressService } from "../services/shippingAddress.service.js";

async function addAddressController(req, res){
    const addressDatail = req.body;
    const serviceData = await addAddressService(addressDatail);
    if(serviceData.success){
        return (
            res.status(httpStatus.OK).json({
                message:serviceData.message,
                data:serviceData.data
            })
        )
    }
    else{
        console.log(serviceData.error);
        return (
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error:serviceData.error.message,               //why i write .message at end here => because stringfy method is not able stringfy the error object
            })
        )
    }
}

async function deleteAddressController(req, res){

}

export {addAddressController, deleteAddressController};