import express from 'express';
import mongoose from 'mongoose';

import "./models/product.model.js";
import "./models/user.model.js";
import "./models/cart.model.js";


import productRoute from './routers/product.route.js';
import userRoute from './routers/user.route.js';
import cartRoute from './routers/cart.route.js';


const PORT = 8080;
const mongodbURL = 'mongodb://localhost:27017/E-commerse';


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