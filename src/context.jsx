import React, { useContext, useEffect, useReducer } from 'react';
import cartItems from './data';
import reducer from './reducer';

const AppContext = React.createContext();
const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cart: cartItems,
  loading: false,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clear = () => {
    dispatch({ type: 'CLEAR' });
  };

  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  const fetchData = async () => {
    dispatch({type:"LOADING"})
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type:"DISPLAY_ITEMS", payload:cart})
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        total: state.total,
        amount: state.amount,
        clear,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
