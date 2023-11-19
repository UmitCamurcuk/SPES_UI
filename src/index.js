import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import store from './Redux/store';
import { Provider } from 'react-redux'

import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/Auth/LoginPage';
import ItemListPage from './Pages/Item/ItemListPage';
import PrivateRoute from './Routes/PrivateRoute';
import AttributesIndexPage from './Pages/Attributes/AttributesIndexPage';
import ProfilePage from './Pages/User/ProfilePage';
import LogoutPage from './Pages/Auth/LogoutPage';
import AttributeDetailsPage from './Pages/Attributes/AttributeDetailsPage';
import CreateAttributePage from './Pages/Attributes/CreateAttributePage';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/Logout",
    element: <PrivateRoute>
      <LogoutPage />
    </PrivateRoute>,
  },
  {
    path: "/",
    element:
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>,
  },
  {
    path: "/Home",
    element: <PrivateRoute>
      <HomePage />
    </PrivateRoute>,
  },
  {
    path: "/ItemList",
    element: <PrivateRoute>
      <ItemListPage />
    </PrivateRoute>,
  },
  {
    path: "/Attributes",
    element: <PrivateRoute>
      <AttributesIndexPage />
    </PrivateRoute>,
  },
  {
    path: "Attribute/Create",
    element: <PrivateRoute>
      <CreateAttributePage />
    </PrivateRoute>,
  },
  {
    path: "/Attribute/Detail/:id",
    element: <PrivateRoute>
      <AttributeDetailsPage />
    </PrivateRoute>,
  },
  {
    path: "/Profile",
    element: <PrivateRoute>
      <ProfilePage />
    </PrivateRoute>,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
