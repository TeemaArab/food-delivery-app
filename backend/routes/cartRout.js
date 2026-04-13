import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

// create express router
const cartRouter = express.Router();


//create endpoint for adding items to cart
cartRouter.post('/add', authMiddleware, addToCart);

//create endpoint for removing items from cart
cartRouter.delete('/remove', authMiddleware, removeFromCart);

//create endpoint for getting cart data
cartRouter.post('/data', authMiddleware, getCart);

export default cartRouter;