import { createContext } from "react";
import { useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url ='http://localhost:4000';
  const [token, setToken] = useState('');

  //------------------------------------------------------------------------------------------------------------
  // function to add items to cart, it will check if the item is already in the cart or not, if not it will add the item to the cart with quantity 1, if yes it will increase the quantity by 1
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  //-----------------------------------------------------------------------------------------------------------
  // function to remove items from cart, it will check if the item is already in the cart or not, if not it will do nothing, if yes it will decrease the quantity by 1, if the quantity becomes 0 it will remove the item from the cart
  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: undefined }));
    }
  };

  //    to calculate cart total
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);// find the item in the food list to get its price
        totalAmount += itemInfo.price * cartItems[item];// calculate the total amount by multiplying the price of the item with its quantity in the cart
      }
    }
    return totalAmount;
  };

  //save token in local storage and set the token state when the component mounts, so that the user will remain logged in even after refreshing the page
  useEffect(()=>{
  if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
  }
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken

  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
