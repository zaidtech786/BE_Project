export const OrderReducer = (states, action) => {
    switch(action.type){
        case "INCREMENT_COUNT":
            return {
              ...states,
              quantity:states.quantity + 1,
            }; 
        case "DECREMENT_COUNT":
            return {
                ...states,
                quantity:states.quantity - 1,
              }; 
    
        case "SET_DATA":
          return {
            ...states,
            cart:action.payload
          }
    
        default:
            return states
      }
  };