import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '@/App.tsx';
import { HTMLForm } from '@/pages/1-html-form.tsx';
import { StatesAndJSON } from '@/pages/2-states-and-json.tsx';
import { DirtyTracking } from '@/pages/3-dirty-tracking.tsx';
import { HookForm } from '@/pages/4-hook-form.tsx';
import { HookFormTypesafe } from '@/pages/5-hook-form-typesafe.tsx';
import { AutoSaving } from '@/pages/7-auto-saving.tsx';
import { DependentFields } from '@/pages/8-dependent-fields.tsx';
import { RemoteChanges } from '@/pages/9-remote-changes.tsx';
import { PreloadingData } from '@/pages/6-preloading-data.tsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Navigate to="/html-form"/>
            },
            {
                path: "/html-form",
                element: <HTMLForm/>,
            },
            {
                path: "/states-and-json",
                element: <StatesAndJSON/>,
            },
            {
                path: "/dirty-tracking",
                element: <DirtyTracking/>,
            },
            {
                path: "/hook-form",
                element: <HookForm/>,
            },
            {
                path: "/hook-form-typesafe",
                element: <HookFormTypesafe/>,
            },
            {
                path: "/preloading-data",
                element: <PreloadingData/>,
            },
            {
                path: "/auto-saving",
                element: <AutoSaving/>,
            },
            {
                path: "/dependent-fields",
                element: <DependentFields/>,
            },
            {
                path: "/remote-changes",
                element: <RemoteChanges/>,
            },
        ]
    },
]);