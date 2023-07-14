import Razorpay from 'razorpay';
import httpStatus from 'http-status';
import 'dotenv/config';

import { createPaymentService, verifyPaymentService } from '../services/payment.service.js';



async function createPaymentController(req, res){
    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });;
    
    const {amount, receipt, uid} = req.body;
    const options ={
        amount,
        receipt,
    }
    try{
        const order = await instance.orders.create(options);
        
        const order_id = order.id;
        const serverData = await createPaymentService({...options, uid, order_id});
        if(serverData.success){
            return (
                res.status(httpStatus.OK).json({
                    message:serverData.message,
                    data:serverData.data
                })
            )
        }
        else {
            return(
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    error:serverData.error
                })
            )
        }
        
    }
    catch(err){
        console.log("error", err);
    }
    
}

async function verifyPaymentController(req, res){

}

export {createPaymentController, verifyPaymentController};