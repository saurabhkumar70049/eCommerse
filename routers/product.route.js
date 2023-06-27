import express from 'express';
import {addProductController, fetchAllProductController, fetchOneProductController, updateProductController, deleteProductController} from '../controllers/product.controller.js';


const route = express.Router();

route.post('/add', addProductController);

route.get('/fetch', fetchAllProductController);

route.get('/fetchOne/:id', fetchOneProductController);

route.put('/update/:id', updateProductController);

route.delete('/delete/:id', deleteProductController);

export default route;