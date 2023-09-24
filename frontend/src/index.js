import React from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./App.js";
import ErrorPage from './routes/error-page/error-page.route.jsx'
import Authentication from './routes/authentication/authentication.component.jsx'
import { ModelSettingsProvider } from './components/context/modelSettings.context.jsx'
import { UserProvider } from './components/context/user.context.jsx';

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      exact: true,
      errorElement: <ErrorPage />,
    },
    {
      path: '/sign-in',
      element: <Authentication />
    }  
  ])
  
createRoot(document.getElementById('app')).render(
    <ModelSettingsProvider>
      <UserProvider>
        <RouterProvider router={router}  />
      </UserProvider>   
    </ModelSettingsProvider>
  )