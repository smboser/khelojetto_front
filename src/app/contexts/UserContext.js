import { createContext, useReducer } from 'react';
import axios from 'axios';
import http from '../../config/http';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_USERS': {
      return { ...state, users: action.payload, contextStatus: null, contextMsg: null };
    }

    case 'LOAD_AGENTS': {
      return { ...state, agents: action.payload, contextStatus: null, contextMsg: null };
    }

    case 'DELETE_USER': {
      return { ...state, ...action.payload };
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
  getUser: () => {},
  getAgents: () => {},
  createUser: () => {}
});

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const deleteUser = async (userId) => {
    try {
      const res = await http.httpAll.delete(`users/${userId}`);
      if (res?.data?.deleted === true)
        dispatch({
          type: 'DELETE_USER',
          payload: { contextStatus: 1, contextMsg: 'User deleted successfully.' }
        });
      else
        dispatch({
          type: 'DELETE_USER',
          payload: { contextStatus: 1, contextMsg: 'Error! Please try later.' }
        });
    } catch (e) {
      dispatch({
        type: 'DELETE_USER',
        payload: { contextStatus: 1, contextMsg: 'Error! Please try later.' }
      });
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
      dispatch({ type: 'LOAD_USERS', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const getAgents = async (stokesId) => {
    try {
      const res = await http.httpAll.get(`users/stokes/${stokesId}`);
      console.log('res', res.data);
      dispatch({ type: 'LOAD_AGENTS', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const getUser = async (userId) => {
    try {
      const res = await http.httpAll.get(`users/${userId}`);
      dispatch({ type: 'LOAD_USERS', payload: res.data });
    } catch (e) {
      console.error(e);
    }
  };

  const createUser = async (user) => {
    try {
      await http.httpAll.post(`users/add`, { ...user });
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
      await http.httpAll.patch(`users/${userId}`, { ...user });
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

  return (
    <UserContext.Provider
      value={{
        getUsers,
        getUser,
        getAgents,
        deleteUser,
        clearUsers,
        createUser,
        updateUser,
        users: state.users,
        agents: state.agents,
        contextMsg: state.contextMsg,
        contextStatus: state.contextStatus
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
