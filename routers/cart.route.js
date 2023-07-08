import express from 'express';

import { addCartController, fetchAllCardController, fetchUserCartController, updateCartController } from '../controllers/cart.controllers.js'; 

const cartRoute = express.Router();

cartRoute.post('/add', addCartController);

cartRoute.get('/fetch', fetchAllCardController);

cartRoute.get('/fetch/:uid', fetchUserCartController);

cartRoute.post('/update', updateCartController);


export default cartRoute;