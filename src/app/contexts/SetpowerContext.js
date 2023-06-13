import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import http from '../../config/http';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_SETPOWER': {
      return { ...state, powers: action.payload, contextStatus: null, contextMsg: null };
    }

    case 'LOAD_RANDOMPOWER': {
      return { ...state, powerSingle: action.payload, contextStatus: null, contextMsg: null };
    }

    case 'DELETE_SETPOWER': {
      return { ...state, powers: action.payload };
    }

    case 'CLEAR_SETPOWER': {
      return { ...state, powers: action.payload };
    }
	
	case 'CREATE_POWER': {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
};

const SetpowerContext = createContext({
  powers: [],
  powerSingle: [],
  //deleteSetpower: () => {},
  // clearSetpower: () => {},
  getRandomGame: () => {},
  getSetpowers: () => {},
  createSetpower: () => {}
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

  const getRandomGame = async () => {
    try {
      const res = await http.httpAll.get(`set-power/gameid`);
      dispatch({ type: 'LOAD_RANDOMPOWER', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const createSetpower = async (power) => {
    try {
      await http.httpAll.post(`set-power/add`, { ...power });
      dispatch({
        type: 'CREATE_POWER',
        payload: { contextStatus: 1, contextMsg: 'Power created successfully.' }
      });
    } catch (e) {
      dispatch({
        type: 'CREATE_POWER',
        payload: { contextStatus: 0, contextMsg: 'Error! Please try later.' }
      });
      console.error(e);
    }
  };

  return (
    <SetpowerContext.Provider
      value={{
		createSetpower,  
        getSetpowers,
        getRandomGame,
        powerSingle: state.powerSingle,
        powers: state.powers,
		contextMsg: state.contextMsg,
        contextStatus: state.contextStatus
      }}
    >
      {children}
    </SetpowerContext.Provider>
  );
};

export default SetpowerContext;
