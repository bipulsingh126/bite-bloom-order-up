import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check for stored theme preference
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme") as Theme;
      if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
        return storedTheme;
      }
      
      // Check system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    
    return "light"; // Default fallback
  });

  // Apply theme class to document when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the old theme class and add the new one
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Store the theme preference
    localStorage.setItem("theme", theme);
    
    // Update theme color meta tag for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#071f2c' : '#ffffff');
    }
    
    console.log(`Theme changed to: ${theme}`); // Debug log
    
    // Add transition class temporarily
    root.classList.add('theme-transition');
    
    // Remove transition class after transition completes
    const transitionTimeout = setTimeout(() => {
      root.classList.remove('theme-transition');
      // Re-add transition class after a brief pause to prevent flickering
      setTimeout(() => {
        root.classList.add('theme-transition');
      }, 100);
    }, 500);
    
    return () => {
      clearTimeout(transitionTimeout);
    };
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only automatically switch if the user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };
    
    // Use the proper event listener method
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setThemeState(prev => {
      const newTheme = prev === "light" ? "dark" : "light";
      return newTheme;
    });
  };
  
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};
