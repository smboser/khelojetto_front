import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { MatxLoading } from 'app/components';
import http from '../../config/http';
import jwtDecode from 'jwt-decode';
import authServices from 'services/authService';

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => {},
  logout: () => {},
  register: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    // const response = await axios.post('/api/auth/login', { email, password });
    const response = await http.httpAll.post('auth', { email, password });
    console.log('response.data', response.data);
    const user = jwtDecode(response.data.access_token);
    // Storing localStorage
    authServices.saveToken(response.data.access_token);
    dispatch({ type: 'LOGIN', payload: { user } });
  };

  const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', { email, username, password });
    const { user } = response.data;

    dispatch({ type: 'REGISTER', payload: { user } });
  };

  const logout = () => {
    authServices.logout();
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    (async () => {
      try {
        if (authServices.isLoggedIn()) {
          dispatch({
            type: 'INIT',
            payload: { isAuthenticated: true, user: jwtDecode(authServices.getToken()) }
          });
        } else {
          dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
        }
        // const { data } = await axios.get('/api/auth/profile');
      } catch (err) {
        console.error(err);
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
