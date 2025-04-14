import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set the initial theme class before rendering to prevent flashing
const setInitialTheme = () => {
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Ensure we have a valid theme value
  const validTheme = theme === 'dark' ? 'dark' : 'light';
  
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(validTheme);
  
  // Update localStorage with valid theme
  localStorage.setItem('theme', validTheme);
  
  // Add initial theme color meta tag for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', validTheme === 'dark' ? '#071f2c' : '#ffffff');
  } else {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = validTheme === 'dark' ? '#071f2c' : '#ffffff';
    document.head.appendChild(meta);
  }
};

// Temporarily disable transitions during initial load
document.documentElement.classList.add('theme-transition');

// Execute before any rendering happens
setInitialTheme();

// Create root element
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// Re-enable transitions after initial load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
    setTimeout(() => {
      document.documentElement.classList.add('theme-transition');
    }, 50);
  }, 100);
});
