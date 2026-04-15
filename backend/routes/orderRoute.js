import express from 'express';
import  authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrderPayment, userOrders, listOrders, updateOrderStatus  } from '../controllers/orderController.js';

//create router
const orderRouter = express.Router();


// crete endpoints
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrderPayment);
orderRouter.get('/userorders', authMiddleware, userOrders);
orderRouter.get('/list',  listOrders);
orderRouter.post('/status',  updateOrderStatus);
export default orderRouter;