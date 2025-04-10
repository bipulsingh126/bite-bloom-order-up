
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set the initial theme class before rendering to prevent flashing
const setInitialTheme = () => {
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
};

// Execute before any rendering happens
setInitialTheme();

createRoot(document.getElementById("root")!).render(<App />);
