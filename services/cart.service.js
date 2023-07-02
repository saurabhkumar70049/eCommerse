import mongoose from "mongoose";


const Cart = mongoose.model("Cart");

async function addCartService(inputData) {
    
    const userFind = await Cart.findOne({uid: inputData.uid});
    if(userFind){
        
        const cartSave = await Cart.findByIdAndUpdate({_id:userFind._id},{$push: {pid : inputData.pid, quantity:inputData.quantity}});
        // console.log(cartSave);
        if(cartSave){ 
            return ({
                success: true,
                message:"New product is added to Cart",
                data:cartSave
            })
        }
        else {
            return ({
                success:false,
                error:"product is not added to card"
            })
        } 
        
    }
    else {
        inputData = new Cart({
            ...inputData
        })
        const cartSave = await inputData.save();
        if(cartSave){
            return ({
                success: true,
                message:"New cart is Generated",
                data:cartSave
            })
        }
        else {
            return ({
                success:false,
                error:"cart not Generated"
            })
        }
    }
}

async function fetchAllCartService(){
    const cartData = await Cart.find().populate('uid', 'name email').populate('pid.pid', 'name price');
    if(cartData){
        return ({
            success:true,
            message: "All cart Detail",
            data: cartData
        })
    }
    else {
        return ({
            success:false,
            error:"Cart not Loaded"
        })
    }
}

async function fetchUserCartService(uid){
    const cartData = await Cart.findOne({uid: uid}).populate('pid.pid', 'name price');
    if(cartData){
        return ({
            success:true,
            message:"All Product available in user cart",
            data: cartData
        })
    }
    else {
        return ({
            success:false,
            error:"cart not found"
        })
    }
}

async function updateCartService(_id, inputData){
    
}

async function deleteCartService(){

}


export {addCartService, fetchAllCartService, fetchUserCartService};