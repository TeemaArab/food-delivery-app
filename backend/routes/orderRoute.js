import express from 'express';
import  authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrderPayment, userOrders  } from '../controllers/orderController.js';

//create router
const orderRouter = express.Router();


// crete endpoints
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrderPayment);
orderRouter.get('/userorders', authMiddleware, userOrders);
export default orderRouter;