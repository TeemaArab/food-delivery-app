import { createContext} from "react";
import { useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{

    const [cartItems, setCartItems] = useState({});
    
//------------------------------------------------------------------------------------------------------------
    // function to add items to cart, it will check if the item is already in the cart or not, if not it will add the item to the cart with quantity 1, if yes it will increase the quantity by 1
    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev) =>({...prev, [itemId]: 1}))
        }else{
            setCartItems((prev) =>({...prev, [itemId]: prev[itemId] + 1}))
        }
    }

//-----------------------------------------------------------------------------------------------------------
    // function to remove items from cart, it will check if the item is already in the cart or not, if not it will do nothing, if yes it will decrease the quantity by 1, if the quantity becomes 0 it will remove the item from the cart
    const removeFromCart = (itemId)=>{
        if(cartItems[itemId] > 1){
            setCartItems((prev) =>({...prev, [itemId]: prev[itemId]-1}))
        }else{
            setCartItems((prev) =>({...prev, [itemId]: undefined}))
        }
    }



    useEffect(()=>{
       console.log(cartItems); 
    },[cartItems])



    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;