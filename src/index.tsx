import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import App from "./App";
import {AppContext, AppContextProvider} from "./contexts/AppContext";
import * as domain from "node:domain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/contents/login-auth0/index.html"/>
  },
  {
    path: "/contents/login-auth0/index.html",
    element: <App/>
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router}/>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
