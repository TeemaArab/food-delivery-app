import React from 'react'
import './VerifyPayment.css'
import { useSearchParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const VerifyPayment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const {url}= useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPaymentStatus = async()=>{
    console.log("success from URL:", success)
    console.log("orderId from URL:", orderId)
    const response = await axios.post(url + '/api/order/verify', { success, orderId });
    if(response.data.success){
    navigate('/myorders');
    }else{
      navigate('/');
   }
 }
    useEffect(()=>{
      verifyPaymentStatus();
    },[]) 

  return (
    <div className='verify'>
       <div className="spinner"></div>
    </div>
  )
}

export default VerifyPayment;
