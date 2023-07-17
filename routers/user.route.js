import express, { Router } from "express";

import {addUserController, emailVarification,fetchAllUserController, fetchOneUserController, updateUserController, deleteUserController, loginUserController, forgetPasswordController, resetPasswordController, logoutUserController} from "../controllers/user.controller.js";

import authorization from "../middlewares/authorization.js";

const route = express.Router();

route.post('/add', addUserController);

route.get('/verifyEmail/:emailToken', emailVarification);

route.get('/fetchAll', authorization(["admin"]) ,fetchAllUserController);

route.get('/fetchOne/:id',authorization(["admin", "customer"]), fetchOneUserController);

route.put('/update/:id',authorization(["admin", "customer"]), updateUserController);

route.delete('/delete/:id',authorization(["customer"]) ,deleteUserController);

route.post('/login', loginUserController);

route.post('/forgetPassword', forgetPasswordController);

route.post('/resetPassword', resetPasswordController);

route.post('/logout', logoutUserController);

export default route;

