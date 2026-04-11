import { createContext } from "react";
import { useState, useEffect } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url ='http://localhost:4000';
  const [token, setToken] = useState('');
  const [foodList, setFoodList] = useState([]); // to get fool list from the server and store it in the state

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
        let itemInfo = foodList.find((product) => product._id === item);// find the item in the food list to get its price
        totalAmount += itemInfo.price * cartItems[item];// calculate the total amount by multiplying the price of the item with its quantity in the cart
      }
    }
    return totalAmount;
  };
  //-----------------------------------------------------------------------------------------------------------
  //function to retrieve the food list from the server, it will be called when the component mounts
  const fetchFoodList = async()=>{
    const response = await axios.get(url + '/api/food/list');
    setFoodList(response.data.data);
  }
  //save token in local storage and set the token state when the component mounts, so that the user will remain logged in even after refreshing the page
  useEffect(()=>{
   async function loadData(){
       await fetchFoodList();
       if(localStorage.getItem('token')){
       setToken(localStorage.getItem('token'));
      }
   }
   loadData();
  },[])

  const contextValue = {
    foodList,
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
