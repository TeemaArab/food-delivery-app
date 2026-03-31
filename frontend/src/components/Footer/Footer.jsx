import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">

        {/* content for footer on the left */}
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae eos blanditiis iure veritatis quibusdam, unde illo velit omnis asperiores. Autem?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae eos blanditiis iure veritatis quibusdam, unde illo velit omnis asperiores. Autem?
            </p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        {/* content for footer on the center */}
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div> 

        {/* content for footer on the right */}
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-478-909-7887</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
         
      </div>
       <hr />
          <p className="footer-copyright">  Copyright 2026 @ Tomato.com  All rights reserved.</p>
    </div>
  )
}

export default Footer
