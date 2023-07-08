import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number
    },
    tag:[{
        type:String,
    }],
    catogory:[{
        type:String,
    }]

})
mongoose.model("Product", productSchema);