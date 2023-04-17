import React, { createContext, useContext, useState } from "react";

interface ReaderProviderProps {
  children: React.ReactNode;
}

interface ReaderContextProps {
  currentText: string;
  setCurrentText: (text: string) => void;
}

const ReaderContext = createContext<ReaderContextProps>({
  currentText: "",
  setCurrentText: () => {},
});

const ReaderProvider: React.FC<ReaderProviderProps> = ({ children }) => {
  const [currentText, setCurrentText] = useState<string>("");

  return (
    <ReaderContext.Provider
      value={{
        currentText,
        setCurrentText,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
};

export const useGlobalReader = () => {
  return useContext(ReaderContext);
};

export { ReaderContext, ReaderProvider };
