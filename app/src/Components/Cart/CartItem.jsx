import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { removeCartItem, updateCartItem } from "../../../Redux/Customers/Cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { AppContext } from "../../Context/UseContext";

const CartItem = ({ item,showButton }) => {
  const {dispatch1} = useContext(AppContext);
  const [count,setCount] = useState({})
  const {cart,setTotal} = useContext(AppContext)


console.log(item)

const reducer = (accumulator, currentItem) => accumulator + currentItem.discountedPrice;

// Use the reduce() function to calculate the total price
const totalPrice = cart.reduce(reducer, 0);
setTotal(totalPrice)

useEffect( () => {
   console.log(count)
},[count])

  return (
    <>
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.imageUrl}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.title}</p>
          {/* <p className="opacity-70">Size: {item?.size},White</p> */}
          <p className="opacity-70 mt-2">Seller: {item?.brand}</p>
          <div className="flex space-x-2 items-center pt-3">
            <p className="opacity-50 line-through">₹{item?.price}</p>
            <p className="font-semibold text-lg">
              ₹{item?.discountedPrice}
            </p>
            <p className="text-green-600 font-semibold">
              {item?.discountPersent}% off
            </p>
          </div>
        </div>
      </div>
     {/* {showButton&& <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2 ">
          <IconButton  color="primary" aria-label="add an alarm" onClick={() => counter("DECREMENT")}>
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className="py-1 px-7 border rounded-sm">{}</span>
          <IconButton color="primary" aria-label="add an alarm" onClick={() => counter("INCREMENT")}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
          
          <Button  variant="text">
            Remove
          </Button>
          
        </div>
      </div>} */}
    </div>
    </>
  );
};

export default CartItem;
