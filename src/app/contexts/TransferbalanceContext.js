import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import http from '../../config/http';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_TRANSFERBALANCE': {
      return { ...state, points: action.payload };
    }

    case 'DELETE_TRANSFERBALANCE': {
      return { ...state, points: action.payload };
    }

    case 'CLEAR_TRANSFERBALANCE': {
      return { ...state, points: action.payload };
    }
	
	case 'CREATE_TRANSFERBALANCE': {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
};

const TransferbalanceContext = createContext({
  points: [],
  //deleteSetpower: () => {},
 // clearSetpower: () => {},
  getTransferbalances: () => {}
  //createSetpower: () => {}
});

export const TransferbalanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  /* const deleteSetpower = async (notificationID) => {
    try {
      const res = await axios.post('/api/notification/delete', { id: notificationID });
      dispatch({ type: 'DELETE_USER', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const clearUsers = async () => {
    try {
      const res = await axios.post('/api/notification/delete-all');
      dispatch({ type: 'CLEAR_USERS', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };
 */
  const getTransferbalances = async () => {
    try {
      const res = await http.httpAll.get(`points`);
      console.log('res', res.data);
      dispatch({ type: 'LOAD_TRANSFERBALANCE', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

   const createTransferbalance = async (point) => {
    try {
      await http.httpAll.post(`points/add`, { ...point });
      dispatch({
        type: 'CREATE_TRANSFERBALANCE',
        payload: { contextStatus: 1, contextMsg: 'Transfer Balance created successfully.' }
      });
    } catch (e) {
      dispatch({
        type: 'CREATE_TRANSFERBALANCE',
        payload: { contextStatus: 0, contextMsg: 'Error! Please try later.' }
      });
      console.error(e);
    }
  };

  // useEffect(() => {
  //   console.log('User Context calling');
  //   getStockez(1);
  // }, []);

  return (
    <TransferbalanceContext.Provider
      value={{
        getTransferbalances,
        points: state.points,
		createTransferbalance
      }}
    >
      {children}
    </TransferbalanceContext.Provider>
  );
};

export default TransferbalanceContext;