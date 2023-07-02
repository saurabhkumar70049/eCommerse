import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    pid:[{
        pid: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }, 
        quantity : {
            type:Number,
            quantity:1
        }
    }],
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

mongoose.model("Cart", cartSchema);