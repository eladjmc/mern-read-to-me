import React, { createContext, useContext, useEffect, useState } from "react";
import { Pages } from "../constants/pages";


interface LoginProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  isLogged: boolean;
  handleLogout: () => void;
  HandleLogin: () => void;
  setNewPage: (page: Pages) => void;
  currentPage: Pages;
}

const LoginContext = createContext<ContextProps>({
  isLogged: false,
  handleLogout: () => {},
  HandleLogin: () => {},
  setNewPage: (page: Pages) => {},
  currentPage: Pages.LOGIN,
});

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    // Load isLogged from local storage on initialization
    const storedValue = localStorage.getItem("isLogged");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.LOGIN);

  useEffect(() => {
    // Save isLogged to local storage whenever it changes
    localStorage.setItem("isLogged", JSON.stringify(isLogged));
  }, [isLogged]);

  const handleLogout = () => {
    setIsLogged(false);
    setCurrentPage(Pages.LOGIN);
    localStorage.removeItem("isLogged")
  };

  const HandleLogin = () => {
    setIsLogged(true);
    setCurrentPage(Pages.WELCOME);
  };

  const setNewPage = (page: Pages) => {
    setCurrentPage(page);
  };

  return (
    <LoginContext.Provider
      value={{
        isLogged,
        handleLogout,
        HandleLogin,
        setNewPage,
        currentPage,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(LoginContext);
};

export {LoginContext, LoginProvider};