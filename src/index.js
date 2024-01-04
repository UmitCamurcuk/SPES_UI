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
import ItemTypesIndexPage from './Pages/ItemTypes/ItemTypesIndexPage';
import FamiliesIndexPage from './Pages/Families/FamiliesIndexPage';
import CreateItem from './Pages/Item/CreateItemPage';
import CreateItemTypePage from './Pages/ItemTypes/CreateItemTypePage';
import CreateFamilyPage from './Pages/Families/CreateFamilyPage';
import CreateItemPage from './Pages/Item/CreateItemPage';
import CreateAttributeGroupPage from './Pages/AttributeGroups/CreateAttributeGroupPage';
import AttributeGroupsPage from './Pages/AttributeGroups/AttributeGroupsPage';
import AttributeGroupDetailPage from './Pages/AttributeGroups/AttributeGroupDetailPage';
import SystemUsersIndexPage from './Pages/System/Users/SystemUsersIndexPage';
import PermissionsIndexPage from './Pages/System/Permissions/PermissionsIndexPage';
import RolesIndexPage from './Pages/System/Roles/RolesIndexPage';
import CreatePermissionPage from './Pages/System/Permissions/CreatePermissionPage';
import RoleDetailPage from './Pages/System/Roles/RoleDetailPage';


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
    path: "/Item/List/:ItemTypeCode",
    element: <PrivateRoute>
      <ItemListPage />
    </PrivateRoute>,
  },
  {
    path: "/Item/Create/:ItemTypeCode",
    element: <PrivateRoute>
      <CreateItemPage />
    </PrivateRoute>,
  },
  {
    path: "/Item/Detail/:Code",
    element: <PrivateRoute>
      <ItemListPage />
    </PrivateRoute>,
  },
  {
    path: "/CreateItem",
    element: <PrivateRoute>
      <CreateItem />
    </PrivateRoute>,
  },
  {
    path: "/AttributeGroups",
    element: <PrivateRoute>
      <AttributeGroupsPage />
    </PrivateRoute>,
  },
  {
    path: "/AttributeGroup/Create",
    element: <PrivateRoute>
      <CreateAttributeGroupPage />
    </PrivateRoute>,
  },
  {
    path: "/AttributeGroup/Detail/:id",
    element: <PrivateRoute>
      <AttributeGroupDetailPage />
    </PrivateRoute>,
  },
  {
    path: "/Attributes",
    element: <PrivateRoute>
      <AttributesIndexPage />
    </PrivateRoute>,
  },
  {
    path: "/Attribute/Create",
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
    path: "/ItemTypes",
    element: <PrivateRoute>
      <ItemTypesIndexPage />
    </PrivateRoute>,
  },
  {
    path: "ItemType/Create",
    element: <PrivateRoute>
      <CreateItemTypePage />
    </PrivateRoute>,
  },
  {
    path: "/Families",
    element: <PrivateRoute>
      <FamiliesIndexPage />
    </PrivateRoute>,
  },
  {
    path: "/Family/Create",
    element: <PrivateRoute>
      <CreateFamilyPage />
    </PrivateRoute>,
  },
  {
    path: "/System/Users",
    element: <PrivateRoute>
      <SystemUsersIndexPage />
    </PrivateRoute>,
  },
  {
    path: "/System/Roles",
    element: <PrivateRoute>
      <RolesIndexPage />
    </PrivateRoute>,
  },
  {
    path: "/System/Role/Detail/:id",
    element: <PrivateRoute>
      <RoleDetailPage />
    </PrivateRoute>,
  },
  {
    path: "/System/Permissions",
    element: <PrivateRoute>
      <PermissionsIndexPage />
    </PrivateRoute>,
  },
  {
    path: "/Permissions/Create",
    element: <PrivateRoute>
      <CreatePermissionPage />
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
