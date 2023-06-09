import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import http from '../../config/http';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SETPOWER': {
      return { ...state, setpowers: action.payload };
    }

    case 'DELETE_SETPOWER': {
      return { ...state, setpowers: action.payload };
    }

    case 'CLEAR_SETPOWER': {
      return { ...state, setpowers: action.payload };
    }

    default:
      return state;
  }
};

const SetpowerContext = createContext({
  setpowers: [],
  //deleteSetpower: () => {},
  // clearSetpower: () => {},
  getSetpowers: () => {}
  //createSetpower: () => {}
});

export const SetpowerProvider = ({ children }) => {
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
  const getSetpowers = async () => {
    try {
      const res = await http.httpAll.get(`set-power`);
      dispatch({ type: 'LOAD_SETPOWER', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  /*  const createUser = async (notification) => {
    try {
      const res = await axios.post('/api/notification/add', { notification });
      dispatch({ type: 'CREATE_USER', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  }; */

  return (
    <SetpowerContext.Provider
      value={{
        getSetpowers,
        setpowers: state.setpowers
      }}
    >
      {children}
    </SetpowerContext.Provider>
  );
};

export default SetpowerContext;
