import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email: {
        type:String,
        unique:true,
        require:true
    },
    mobile:{
        type:Number
    },
    password: {
        type:String,
        require:true
    },
    
    role:{
        type:String,
        enum:["customer", "admin"],// The enum validator is an array that will check if the value given is an item in the array. If the value is not in the array, Mongoose will throw a ValidationError when you try to save()
        default:"customer"
    },
    otp:{
        type:Number,
    },
    otpExpire:{
        type:Date
    },
    phoneVerify:{
        type:Boolean,
        default:false
    },
    emailVerify:{
        type:Boolean,
        default:false
    }

})

mongoose.model("User", userSchema);