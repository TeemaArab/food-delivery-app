import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//placing user order from front end
const placeOrder = async(req,res) =>{
    
    //define forntend url
     const frontend_url = 'http://localhost:5173';

    try{
     const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
     })

     //save in database
     await newOrder.save();
     // clear user's cart after placing order
    await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

    //create stripe payment link
    const line_items = req.body.items.map((item) =>({
        price_data: {
            currency: 'CAD',
            product_name:{name:item.name} ,   
            unit_amount: item.price * 100
        },
        quantity: item.quantity
     }));

     line_items.push({
        price_data:{
            currency: 'CAD',
            product_data:{name:'Delivery Charges'},
            unit_amount: 2 * 100       
        },
       quantity: 1
     })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        
        res.json({success: true, session_url: session.url, message: 'Order placed successfully'});
    }catch(error){
        console.error(error);
        res.json({success:false, message: 'Error'});
    }
}

export {placeOrder};