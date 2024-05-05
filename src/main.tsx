import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Start } from '@/pages/start.tsx';
import { WithForm } from '@/pages/withForm.tsx';
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Start />,
            },
            {
                path: "/with-form",
                element: <WithForm />,
            },
        ]
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
