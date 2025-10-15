import React, { createContext, useState, useEffect } from 'react';
// import { useContext } from 'react';


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    const savedUser = sessionStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// const useAuth = () => useContext(AuthContext);
