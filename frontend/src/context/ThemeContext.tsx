import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from "../utils/ThemesStyles";
import { RTMStorage } from "../services/RTMStorage";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  isLight: boolean;
  toggleTheme: () => void;
  setThemeMod: (mod: ThemeType) => void;
  theme: Theme;
}

type ThemeType = 'light' | 'dark';

const ThemeContext = createContext<ContextProps>({
  isLight: true,
  toggleTheme: () => {},
  setThemeMod: (mod: ThemeType) => {},
  theme: lightTheme,
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isLight, setIsLight] = useState<boolean>(() => RTMStorage.getItem('theme') !== 'dark');
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    RTMStorage.setItem('theme', isLight ? 'light' : 'dark');
    setTheme(isLight ? lightTheme: darkTheme);
  }, [isLight]);

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  const setThemeMod = (mod: ThemeType) => {
    setIsLight(mod === 'light');
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
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useGlobalTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeContext, ThemeProvider};