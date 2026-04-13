import express from 'express';
import  authMiddleware from '../middleware/auth.js';
import { placeOrder } from '../controllers/orderController.js';

//create router
const orderRouter = express.Router();


// crete endpoints
orderRouter.post('/place', authMiddleware, placeOrder);

export default orderRouter;