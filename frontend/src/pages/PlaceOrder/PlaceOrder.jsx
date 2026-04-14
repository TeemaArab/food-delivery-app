import React from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext,useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmount, token, foodList, cartItems,url} = useContext(StoreContext);

 const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
 })

 const onChangeHandler = (event)=>{
   //extract value and name from event target
   const name = event.target.name;
   const value = event.target.value;
   setData(data =>({...data, [name]: value}));

 }
// function to handle place order button click, it will send the order details to the backend and create a stripe payment link
 const placeOrder = async(event)=>{
  event.preventDefault(); // to avoid reloading of the page on form submit
  let orderedItems = [];
  foodList.map((item)=>{
    if(cartItems[item._id] > 0){
      let itemInfo = item;
      itemInfo['quantity'] = cartItems[item._id];
      orderedItems.push(itemInfo);
    }
  })
let orderData = {
  address:data,
  items: orderedItems,
  amount: getTotalCartAmount() + 2.00, // adding delivery charges
}
let response = await axios.post(url +'/api/order/place', orderData,{ headers: { token } });
if(response.data.success){
const {session_url} = response.data;
window.location.replace(session_url); // to send user to sessio_url provided by stripe to complete the payment
   }
   else{
    alert('Error placing order, please try again');
   }
 }

 const navigate= useNavigate();

useEffect(()=>{
  if(!token){
    navigate('/cart');
  }
  else if(getTotalCartAmount() === 0){
    navigate('/cart');
  }
},[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name="firstName"  value={data.firstName} type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName} type="text" placeholder='Last Name'  />
        </div>
        <input required onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder='Email address'  />
        <input required onChange={onChangeHandler} name="street" value={data.street} type="text" placeholder='Street' />

         <div className="multi-fields">
          <input required onChange={onChangeHandler} name="city" value={data.city} type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name="state" value={data.state} type="text" placeholder='State'  />
        </div>

         <div className="multi-fields">
          <input required onChange={onChangeHandler} name="zipCode" value={data.zipCode} type="text" placeholder='Zip code' />
          <input required onChange={onChangeHandler} name="country" value={data.country} type="text" placeholder='Country'  />
        </div>
          <input required onChange={onChangeHandler} name="phone" value={data.phone} type="text" placeholder='Phone number'  />
      </div>

      {/* right side */}
      <div className="place-order-right">
             <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0.00 : 2.00}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()=== 0 ? 0.00 : (getTotalCartAmount() + 2.00).toFixed(2)}</b>
            </div>
            <button type='submit'>Proceed to Payment</button>
          </div>
      </div>
      </div>
    </form>
  )
}

export default PlaceOrder
