import mongoose from "mongoose";


const shippingAddressSchema = new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    locality: {
        type:String,
        require:true
    },
    pinCode :{
        type:Number,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    }
})

mongoose.model("Address", shippingAddressSchema);