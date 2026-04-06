import React, {useState} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'


const Navbar = ({ setShowLogin }) => {

  const [menu,setMenu]= useState('menu');
  const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div className='navbar'>
      {/* I added link so that by clicking on the logo, the user can navigate to the home page */}
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /> </Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=> setMenu('home')} className={menu=== 'home' ? 'active' : ''}>home</Link>
        <a  href="#explore-menu" onClick={()=> setMenu('menu')} className={menu=== 'menu' ? 'active' : ''}>menu</a>
        <a href="#app-download" onClick={()=> setMenu('mobile-app')} className={menu=== 'mobile-app' ? 'active' : ''}>mobile-app</a>
        <a  href="#footer" onClick={()=> setMenu('contact-us')} className={menu=== 'contact-us' ? 'active' : ''}>contact us</a>
        
      </ul> 

      <div className="navbar-right">
         <img src={assets.search_icon} alt="" />
         <div className='navbar-search-icon'>
          {/* I wrapped the img tag insde link so that by a click on the basket icon, the user can navigate to the cart page */}
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link >
           
            <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>

         </div>
         <button onClick={()=>setShowLogin(true)}>Sign In</button>
      </div>
      
    </div>
  )
}

export default Navbar
