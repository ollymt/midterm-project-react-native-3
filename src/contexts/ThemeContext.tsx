import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Use the system default as the initial state
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === "dark");

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Define your color palettes
  const theme = {
    background: isDarkMode ? "#121212" : "#FFFFFF",
    text: isDarkMode ? "#FFFFFF" : "#000000",
    card: isDarkMode ? "#333333" : "#eeeeee",
    primary: isDarkMode ? "#CDE2FF" : "#1D3557",
    primaryText: isDarkMode ? "#121212" : "#ffffff",
    inactive: isDarkMode ? "#aaaaaa" : "#888888",
    accent: isDarkMode ? "#6FC6FC" : "#457B9D", // Your brand color
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
