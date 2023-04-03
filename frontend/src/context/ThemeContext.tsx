import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from '@mui/material/styles';
import { darkTheme, lightTheme } from "../utils/ThemesStyles";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  isLight: boolean;
  toggleTheme: () => void;
  setThemeMod: (mod:string) => void;
  theme: Theme;
}

const ThemeContext = createContext<ContextProps>({
  isLight: true,
  toggleTheme: () => {},
  setThemeMod: (mod:string) => {},
  theme: lightTheme,
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isLight, setIsLight] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    if (isLight) {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }, [isLight]);

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  const setThemeMod = (mod:string) => {
    if(mod === 'light'){
        setIsLight(true);
    } else if(mod === 'dark'){
        setIsLight(false);
    }
  };


  return (
    <ThemeContext.Provider
      value={{
        isLight,
        toggleTheme,
        setThemeMod,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useGlobalTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeContext, ThemeProvider};