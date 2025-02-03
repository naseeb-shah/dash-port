import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/fonts/font.css';
import App from './App';

// Ensure TypeScript recognizes the element correctly
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Uncomment if reportWebVitals is used
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);
