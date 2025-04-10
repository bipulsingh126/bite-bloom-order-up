
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set the initial theme class before rendering to prevent flashing
const setInitialTheme = () => {
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  
  // Add initial theme color meta tag for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f1629' : '#ffffff');
  } else {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = theme === 'dark' ? '#0f1629' : '#ffffff';
    document.head.appendChild(meta);
  }
};

// Add a class to help with transitions
document.documentElement.classList.add('theme-transition');

// Execute before any rendering happens
setInitialTheme();

// Create root element with nice loading state
createRoot(document.getElementById("root")!).render(<App />);

// Remove transition class after page load to prevent transition on initial load
window.addEventListener('load', () => {
  // Re-enable transitions after initial load
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
    document.documentElement.classList.add('theme-transition');
  }, 50);
});
