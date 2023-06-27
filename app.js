import express from 'express';
import mongoose from 'mongoose';
import "./models/product.model.js";
import route from './routers/product.route.js';


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

app.use('/product', route);



app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`);
})