import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store/Store';
import {BrowserRouter} from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import Layout from './components/Layout/Layout';
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
   <Layout>
   <ToastContainer closeButton={false} autoClose={3000} toastClassName="rounded-md p-4 font-medium" />
    <App/>
    </Layout>
    </PersistGate>
    </Provider>
   </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
