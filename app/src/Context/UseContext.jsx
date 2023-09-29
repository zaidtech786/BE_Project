
import React, { useContext ,useState} from 'react';
export const AppContext = React.createContext({});

export const AppProvider = ({children}) => {
    const [state,setState] = useState("login");
  return(
 <AppContext.Provider value={{state,setState}}>
    {children}
  </AppContext.Provider>
  )
}

