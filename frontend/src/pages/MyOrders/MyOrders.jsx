import React from 'react'
import './MyOrders.css'
import { useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import {assets} from '../../assets/assets';


const MyOrders = () => {

    //fetch orders from backend and display them here
    const [data,setData] = useState([]);
    //we need url  to get data from backend
    const {url,token }= useContext(StoreContext);

    const fetchOrders = async() =>{
   //call api
      const response = await axios.get(url +'/api/order/userorders',{headers: {token} })
      setData(response.data.data);
   
    }

    // call function when component loaded
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])
  return (
    <div>
     <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p> Order: {order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name + ' X ' + item.quantity;
                            }
                            else{
                                return item.name + ' X ' + item.quantity + ', ';
                            }
                        })}</p>
                        <p>${order.amount.toFixed(2)}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button> Track Order</button>
                    </div>
                )
            })}
        </div>
     </div>
    </div>
  )
}

export default MyOrders
