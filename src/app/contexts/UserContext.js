import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import http from '../../config/http';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USERS': {
      return { ...state, users: action.payload };
    }

    case 'DELETE_USER': {
      return { ...state, users: action.payload };
    }

    case 'CLEAR_USERS': {
      return { ...state, users: action.payload };
    }

    default:
      return state;
  }
};

const UserContext = createContext({
  users: [],
  deleteUser: () => {},
  clearUsers: () => {},
  getUsers: () => {},
  createUser: () => {}
});

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const deleteUser = async (notificationID) => {
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

  const getUsers = async (typeId) => {
    try {
      const res = await http.httpAll.get(`users/type/${typeId}`);
      console.log('res', res.data);
      dispatch({ type: 'LOAD_USERS', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const createUser = async (notification) => {
    try {
      const res = await axios.post('/api/notification/add', { notification });
      dispatch({ type: 'CREATE_USER', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  // useEffect(() => {
  //   console.log('User Context calling');
  //   getStockez(1);
  // }, []);

  return (
    <UserContext.Provider
      value={{
        getUsers,
        deleteUser,
        clearUsers,
        createUser,
        users: state.users
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
