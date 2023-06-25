import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    pid:{
        type:String,
        unique:true,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    rating:{
        tyep:Number
    }
})
mongoose.model('products', productSchema);