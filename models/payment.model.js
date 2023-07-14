import mongoose from "mongoose";



const paymentSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    amount:{
        type:Number,
        require:true,
    },
    currency:{
        type:String,
        require:false,
    },
    receipt:{
        type:Number,
        require:true,
    },
    order_id:{
        type:String,
        require:true,
    },
    payment_status:{
        type:String,
        enum:['failed', 'success', 'pending'],
        default:'pending'
    }

})

mongoose.model('Payment', paymentSchema);