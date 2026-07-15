import React, { createContext, useState, useContext } from 'react';

// LIGHT: Keeping your original design values
const lightTheme = {
  background: '#FFFFFF', 
  text: '#1a1a1a',      // Your standard text color
  card: '#FFFFFF',
  border: '#f0f0f0',    // Your standard border color
  primary: '#4B0082',   // Your primary branding color
};

// DARK: The "Professional" Dark Palette
const darkTheme = {
  background: '#121212', // A soft, professional dark grey (not pure black)
  text: '#F2F2F2',       // A soft white for readability
  card: '#1E1E1E',       // Slightly lighter than background to create depth
  border: '#333333',     // Subtle dark border
  primary: '#BB86FC',    // A softer purple that glows well on dark backgrounds
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