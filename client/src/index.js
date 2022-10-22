import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LoginProvider } from './context/LoginContext';
import { CardsProvider } from './context/CardsContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <CardsProvider>
          <App />
        </CardsProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
