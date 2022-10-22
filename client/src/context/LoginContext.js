import { createContext, useState } from 'react';
import axios from '../api/axios';

const LoginContext = createContext({
  userId: 0,
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
});

export const LoginProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState(null);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || false
  );

  const isLoggedIn = !!token;

  const loginHandler = (id, token) => {
    setUserId(id);
    setToken(token);
    setPersist(true);
    localStorage.setItem('persist', true);
  };

  const logoutHandler = () => {
    setUserId(0);
    setToken(null);
    setPersist(false);
    localStorage.setItem('persist', false);
    axios.post('/logout').catch(err => console.log(err));
  };

  const contextValue = {
    userId: userId,
    token: token,
    persist,
    setUserId,
    setPersist,
    setToken,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
