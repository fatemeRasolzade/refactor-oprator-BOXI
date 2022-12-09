import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store/Store';
import {BrowserRouter} from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react'
import App from "./App"
import Layout from './components/Layout/Layout';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-tailwind/react";
import UserService from './services/UserService';
import http_service from './services/http_service';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  // <ReactKeycloakProvider authClient={keycloakConfigs}>
    <BrowserRouter>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
 
   <Layout>
   <ToastContainer closeButton={false} autoClose={3000} toastClassName="rounded-md p-4 font-medium" />
   <ThemeProvider>
    <App/>
    </ThemeProvider>
    </Layout>
    </PersistGate>
    </Provider>
   </BrowserRouter>
  //  </ReactKeycloakProvider>

);

// UserService.initKeycloak(root)
// http_service.config()
reportWebVitals();
