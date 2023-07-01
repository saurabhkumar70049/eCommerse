import express, { Router } from "express";

import {addUserController, fetchAllUserController, fetchOneUserController, updateUserController, deleteUserController, loginUserController} from "../controllers/user.controller.js";

import authorization from "../middlewares/authorization.js";

const route = express.Router();

route.post('/add', addUserController);

route.get('/fetchAll', authorization("admin") ,fetchAllUserController);

route.get('/fetchOne/:id',authorization("admin"), fetchOneUserController);

route.put('/update/:id',authorization(""), updateUserController);

route.delete('/delete/:id', deleteUserController);

route.post('/login', loginUserController);

export default route;

