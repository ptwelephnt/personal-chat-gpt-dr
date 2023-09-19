import React from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./App.js";
import ErrorPage from './routes/error-page/error-page.route.jsx'
import Authentication from './routes/authentication/authentication.component.jsx'
import { ModelSettingsProvider } from './components/context/modelSettings.context.jsx'

// const app = document.getElementById('app')
// const root = createRoot(app)
// root.render(<App />)
// const root = createRoot(document.getElementById('app'));
// root.render(<App />);
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
        <RouterProvider router={router}  /> 
    </ModelSettingsProvider>
  )