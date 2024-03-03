export const Reducer = (states, action) => {
    switch(action.type){
        case "CART_DATA":
            return {
              ...states,
              cart:action.payload,
            }; 
        case "ADD_TO_CART":
          const isProductInCart = states.cart.some(item => item.id === action.payload.id);
          if (!isProductInCart) {
            return {
              ...states,
              cart: [...states.cart, action.payload],
            };
          } else {
            console.log("Product already in the cart");
            return states;
          }
    
        case "SET_DATA":
          return {
            ...states,
            cart:action.payload
          }
    
        default:
            return states
      }
  };