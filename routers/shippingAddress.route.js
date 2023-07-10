import express from 'express';


import { addAddressController, deleteAddressController } from '../controllers/shippingAddress.controller.js';


const addressRoute = express.Router();


addressRoute.post('/add', addAddressController);


export default addressRoute;