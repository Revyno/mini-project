import { createContext, useContext, useState } from 'react';

const RouterContext = createContext(null);

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/');

  const navigate = (path) => {
    setCurrentPath(path);
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  const value = {
    currentPath,
    navigate
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within Router');
  }
  return context;
};

export const Link = ({ to, children, className = '', onClick }) => {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
