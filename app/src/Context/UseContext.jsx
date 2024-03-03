
import React, { useContext ,useEffect,useReducer,useState} from 'react';
import { Reducer } from '../Reducer/Reducer';
import { OrderReducer } from '../Reducer/OrderReducer';

export const AppContext = React.createContext({});

export const AppProvider = ({children}) => {
    const [state,setState] = useState("login");
    let initialState = {
      cart:[],
  }
    let initialState2 = {
      product:[],
      quantity:0,
      totalPrice:""
  }
  let getcart = JSON.parse(localStorage.getItem("cart"))
  const [states,dispatch] = useReducer(Reducer,getcart)
  const [states1,dispatch1] = useReducer(OrderReducer,initialState2)
  const [total,setTotal] = useState(0)


  useEffect( () => {
    console.log("Order Context",states1)
  },[states1])

  useEffect( () => {
    localStorage.setItem("cart",JSON.stringify(states))
    console.log("Carts",states)
  },[states])
  return(
 <AppContext.Provider value={{state,setState,...states,dispatch,...states1,dispatch1,total,setTotal}}>
    {children}
  </AppContext.Provider>
  )
}

