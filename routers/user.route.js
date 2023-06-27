import express from "express";

import addUserController from "../controllers/user.controller.js";

const route = express.Router();

route.post('/add', addUserController);


export default route;

