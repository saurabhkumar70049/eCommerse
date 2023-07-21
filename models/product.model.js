import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        require:true,
        unique:true
    },
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    imageUrl: [
        {type:String}
    ],
    rating:{
        type:Number
    },
    tag:[{
        type:String,
    }],
    catogory:[{
        type:String,
    }],
    description:{
        type:String
    }


})
mongoose.model("Product", productSchema);