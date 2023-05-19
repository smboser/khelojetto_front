import { createContext, useReducer } from 'react';
import axios from 'axios';
import http from '../../config/http';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USERS': {
      return { ...state, users: action.payload, contextStatus: null, contextMsg: null };
    }

    case 'DELETE_USER': {
      return { ...state, users: action.payload };
    }

    case 'CREATE_USER': {
      return { ...state, ...action.payload };
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

  const getUser = async (userId) => {
    try {
      const res = await http.httpAll.get(`users/${userId}`);
      console.log('res', res.data);
      dispatch({ type: 'LOAD_USERS', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const createUser = async (user) => {
    try {
      const res = await http.httpAll.post(`users/add`, { ...user });
      dispatch({
        type: 'CREATE_USER',
        payload: { contextStatus: 1, contextMsg: 'User created successfully.' }
      });
    } catch (e) {
      dispatch({
        type: 'CREATE_USER',
        payload: { contextStatus: 0, contextMsg: 'Error! Please try later.' }
      });
      console.error(e);
    }
  };

  const updateUser = async (user, userId) => {
    try {
      const res = await http.httpAll.patch(`users/${userId}`, { ...user });
      dispatch({
        type: 'CREATE_USER',
        payload: { contextStatus: 1, contextMsg: 'User updated successfully.' }
      });
    } catch (e) {
      dispatch({
        type: 'CREATE_USER',
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
    <UserContext.Provider
      value={{
        getUsers,
        getUser,
        deleteUser,
        clearUsers,
        createUser,
        updateUser,
        users: state.users,
        contextMsg: state.contextMsg,
        contextStatus: state.contextStatus
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
