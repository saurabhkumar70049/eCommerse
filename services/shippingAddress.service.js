import mongoose from "mongoose";


const Address = mongoose.model("Address");

async function addAddressService(addressDatail){
    try{
        newAddress = await Address.create(addressDatail);
        if(newAddress){
            return ({
                success:true,
                message:"Address is added to Database",
                data: newAddress
            })
        }
    }   
    catch(err){
        
        return ({
            success:false,
            error:err,
        })
    }
    
}


async function deleteAddressService(_id){
    try{
        deleteData = await Address.deleteOne({_id});
        if(deleteData){
            return {
                success:true,
                message:"Your address is deleted",
                data:deleteData
            }
        }
    }
    catch(err){
        return {
            success:false,
            error:err
        }
    }
}

export {addAddressService, deleteAddressService};