import React, { useContext } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppContext } from "../../Context/UseContext";
import Navigation from "../Navbar/Navigation";
import Navbar from "../Navbar/Navbar";
import { Button } from "@mui/base";


const Cart = () => {
//   const dispatch = useDispatch();
  const navigate = useNavigate();
//   const jwt = localStorage.getItem("jwt");
//   const {cart}=useSelector(store=>store);
//   console.log("cart ",cart)
const {cart,total,setTotal} = useContext(AppContext)

 
  return (
    <>
    <div className="">
        <Navigation/>
      {cart.length>0 && <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="lg:col-span-2 lg:px-5 bg-white">
        <div className=" space-y-3">
          {cart.map((item) => (
            <>
              <CartItem item={item} showButton={true}/>
            </>
          ))}
        </div>
      </div>
      <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
        <div className="border p-5 bg-white shadow-lg rounded-md">
          <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
          <hr />

          <div className="space-y-3 font-semibold">
            <div className="flex justify-between pt-3 text-black ">
              <span>Price ({cart?.totalItem} item)</span>
              {/* <span>₹{cart.cart.totalPrice}</span> */}
              <span>₹{}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              {/* <span className="text-green-700">-₹{cart.cart?.discounte}</span> */}
              <span className="text-green-700">-₹20</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-700">Free</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-green-700">₹{total}</span>
            </div>
          </div>

          <Button
            onClick={() => navigate("/checkout")}
            variant="contained"
            type="submit"
            style={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%",backgroundColor:"blue",color:"#fff",fontWeight:"600",borderRadius:"5px" }}
          >
            Check Out
          </Button>
        </div>
      </div>
      </div>}
      
    </div>
    </>
  );
};

export default Cart;
