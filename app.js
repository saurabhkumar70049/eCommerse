import express from 'express';
import mongoose from 'mongoose';


const PORT = 8080;
const mongodbURL = 'mongodb://localhost:27017/E-commerse';


const app = express();

//connect to database
 mongoose.connect(mongodbURL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> {
        console.log("Server Connected to Database");
    })
    .catch((err)=> {
        console.log("Fail to connect with Database ", err);
    })



app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`);
})