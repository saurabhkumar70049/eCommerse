import express from 'express';
import uploadImage from '../middlewares/uploadImage.js';
import authorization from '../middlewares/authorization.js';
import tokenValidation from '../middlewares/tokenValidation.js';
import {addProductController, fetchAllProductController, fetchOneProductController, updateProductController, deleteProductController} from '../controllers/product.controller.js';


const route = express.Router();

route.post('/add',tokenValidation, authorization(['admin']), uploadImage.array('image'), addProductController);

route.get('/fetch', fetchAllProductController);

route.get('/fetchOne/:id', fetchOneProductController);

route.put('/update/:id',tokenValidation, authorization(['admin']), uploadImage.array('image'), updateProductController);

route.delete('/delete/:id',tokenValidation, authorization(['admin']), deleteProductController);

export default route;
