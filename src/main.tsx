import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import {
    createBrowserRouter, Navigate,
    RouterProvider,
} from "react-router-dom";
import { HTMLForm } from '@/pages/1-html-form.tsx';
import { StatesAndJSON } from '@/pages/2-states-and-json.tsx';
import { DirtyTracking } from '@/pages/3-dirty-tracking.tsx';
import { HookForm } from '@/pages/4-hook-form.tsx';
import { HookFormTypesafe } from '@/pages/5-hook-form-typesafe.tsx';
import { AutoSaving } from '@/pages/6-auto-saving.tsx';
import { DependentFields } from '@/pages/7-dependent-fields.tsx';
import { RemoteChanges } from '@/pages/8-remote-changes.tsx';
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Navigate to="/html-form" />
            },
            {
                path: "/html-form",
                element: <HTMLForm />,
            },
            {
                path: "/states-and-json",
                element: <StatesAndJSON />,
            },
            {
                path: "/dirty-tracking",
                element: <DirtyTracking />,
            },
            {
                path: "/hook-form",
                element: <HookForm />,
            },
            {
                path: "/hook-form-typesafe",
                element: <HookFormTypesafe />,
            },
            {
                path: "/auto-saving",
                element: <AutoSaving />,
            },
            {
                path: "/dependent-fields",
                element: <DependentFields />,
            },
            {
                path: "/remote-changes",
                element: <RemoteChanges />,
            },
        ]
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
