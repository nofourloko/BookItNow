import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import "./index.css"
import ScrollTop from "./Utils/scrollTop"
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';



const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider store={store}>
    <BrowserRouter>
      <App />
      <ScrollTop />
    </BrowserRouter>

  </AuthProvider>
    
);

