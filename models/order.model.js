import mongoose from 'mongoose';



const orderSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products : {
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        },
        qty : Number
    },
    shippingAddress : {
        type: mongoose.Schema.Types.ObjectId,
        ref : Address
    },
    totalPrice : {
        type : String,
        require: true
    },
    payment : {
        status : String,
        paymentId: String
    },
    createdAt : {
        type: Date,
        default : Date.now
    }

})

mongoose.model('Order' , orderSchema);
