import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './AuthReducer';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT } from '../types';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
      setAuthToken(res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      setAuthToken(res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
