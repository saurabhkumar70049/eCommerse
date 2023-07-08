import express from 'express';
import mongoose from 'mongoose';

import "./models/product.model.js";
import "./models/user.model.js";
import "./models/cart.model.js";


import productRoute from './routers/product.route.js';
import userRoute from './routers/user.route.js';
import cartRoute from './routers/cart.route.js';


const PORT = 8080;
const mongodbURL = 'mongodb://asingh88029:e9vfnVfFicgUdGVf@ac-clksbmc-shard-00-00.lzqwx73.mongodb.net:27017,ac-clksbmc-shard-00-01.lzqwx73.mongodb.net:27017,ac-clksbmc-shard-00-02.lzqwx73.mongodb.net:27017/?ssl=true&replicaSet=atlas-gh4fgn-shard-0&authSource=admin&retryWrites=true&w=majority';


const app = express();
app.use(express.json());

//connect to database
mongoose.connect(mongodbURL, {useUnifiedTopology: true, useNewUrlParser: true, autoIndex: true})
    .then(()=> {
        console.log("Server Connected to Database");
    })
    .catch((err)=> {
        console.log("Fail to connect with Database ", err);
    })

app.use('/product', productRoute);


app.use('/user', userRoute);


app.use('/cart', cartRoute);



app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`);
})