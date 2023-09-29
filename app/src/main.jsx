import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { AppProvider } from './Context/UseContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
    <BrowserRouter>
       <App />
    </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
)