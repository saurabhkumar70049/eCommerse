import mongoose from "mongoose";

const Payment = mongoose.model("Payment");

async function createPaymentService(inputData){
    try {
        const createPayment = await Payment.create(inputData);
        if(createPayment){
            return {
                success:true,
                message:"payment initiated",
                data: createPayment
            }
        }
    }
    catch(err){
        return {
            success:false,
            error:err.message
        }
    }
}

async function verifyPaymentService(req, res){
    
}

export {createPaymentService, verifyPaymentService};