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
            product_data:{name:item.name} ,   
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
//---------------------------------------------------------------------------------------

// temporary way to verify payment and update order status
const verifyOrderPayment = async(req,res) =>{
   const{orderId,success}= req.body;
   try{
    if(success==='true' || success === true){
        await orderModel.findByIdAndUpdate(orderId, {payment:true, status: 'Food Processing'});
        return res.json({success:true, message:'Payment verified successfully'});
         }else{
        await orderModel.findByIdAndDelete(orderId);
        return res.json({success:false, message:'Payment failed, order cancelled '});
            }
    }catch(error){
    console.error(error);
    return res.json({success:false, message:'Error verifying payment'});
    }
}

//------------------------------------------------------------------------------------

// user orders for frontend order history page

const userOrders = async (req,res)=>{
    try{
       const orders = await orderModel.find({userId: req.body.userId});
         return res.json({success:true, data:orders});
    }catch(error){
        console.error(error);
        return res.json({success:false, message:'Error fetching user orders'});
    }
}

//--------------------------------------------------------------------------------

//  listing orders for admin dashboard

// api created to list all orders in admin dashboard, this can be used to update order status and other details in future
const listOrders = async(req,res)=>{
   try{
    const orders = await orderModel.find({})
    return res.json({success:true, data:orders});

   }catch(error){
    console.error(error);
    return res.json({success:false, message:'Error fetching orders'});
   }
}
//--------------------------------------------------------------------------------
// api to update order status and other details can be created here for admin dashboard in future
const updateOrderStatus = async(req,res) =>{
    try{
        //find order by id
       const updatedOrder =  await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        
         if (!updatedOrder) {
         return res.json({ success: false, message: 'Order not found' });
    }

    return res.json({ success: true, message: 'Order status updated successfully' });
    }catch(error){
        console.error(error);
        return res.json({success:false, message:'Error updating order status'});

    }
}

export {placeOrder, verifyOrderPayment, userOrders, listOrders, updateOrderStatus};