import React, { createContext, useState, useContext } from 'react';

const lightTheme = {
  background: '#FFFFFF', 
  text: '#1a1a1a',      
  card: '#FFFFFF',
  border: '#f0f0f0',    
  primary: '#4F46E5',   
};

const darkTheme = {
  background: '#121212', 
  text: '#F2F2F2',       
  card: '#1E1E1E',       
  border: '#333333',    
  primary: '#4F46E5',    
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);