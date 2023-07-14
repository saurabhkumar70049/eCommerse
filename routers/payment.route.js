import express from "express";
import { createPaymentController, verifyPaymentController } from "../controllers/payment.cotrollers.js";

const paymentRoute = express.Router();

paymentRoute.post('/create', createPaymentController);

paymentRoute.post('/verify', verifyPaymentController);

export default paymentRoute;