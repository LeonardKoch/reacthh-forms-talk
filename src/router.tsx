import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App, RoutePanels } from '@/App.tsx';
import { HTMLForm, HTMLFormCode } from '@/pages/1-html-form.tsx';
import { StatesAndJSON, StatesAndJSONCode } from '@/pages/2-states-and-json.tsx';
import { AutoSaving, AutoSavingCode } from '@/pages/7-auto-saving.tsx';
import { DependentFields, DependentFieldsCode } from '@/pages/8-dependent-fields.tsx';
import { DynamicValidation, DynamicValidationCode } from '@/pages/3-dynamic-validation.tsx';
import { DynamicOptions, DynamicOptionsCode } from '@/pages/4-dynamic-options.tsx';
import { HookForm, HookFormCode } from '@/pages/5-hook-form.tsx';
import { HookFormTypesafe, HookFormTypesafeCode } from '@/pages/6-hook-form-typesafe.tsx';
import { PreloadingData, PreloadingDataCode } from '@/pages/8-preloading-data.tsx';
import { RemoteChanges, RemoteChangesCode } from '@/pages/10-remote-changes.tsx';

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
                element: <RoutePanels renderLeftPanel={() => <HTMLForm/>} renderRightPanel={() => <HTMLFormCode />} />,
            },
            {
                path: "/states-and-json",
                element: <RoutePanels renderLeftPanel={() => <StatesAndJSON/>} renderRightPanel={() => <StatesAndJSONCode />} />,
            },
            {
                path: "/dynamic-validation",
                element: <RoutePanels renderLeftPanel={() => <DynamicValidation/>} renderRightPanel={() => <DynamicValidationCode />} />,
            },
            {
                path: "/dynamic-options",
                element: <RoutePanels renderLeftPanel={() => <DynamicOptions/>} renderRightPanel={() => <DynamicOptionsCode />} />,
            },
            {
                path: "/hook-form",
                element: <RoutePanels renderLeftPanel={() => <HookForm/>} renderRightPanel={() => <HookFormCode />} />,
            },
            {
                path: "/hook-form-typesafe",
                element: <RoutePanels renderLeftPanel={() => <HookFormTypesafe/>} renderRightPanel={() => <HookFormTypesafeCode />} />,
            },
            {
                path: "/preloading-data",
                element: <RoutePanels renderLeftPanel={() => <PreloadingData/>} renderRightPanel={() => <PreloadingDataCode />} />,
            },
            {
                path: "/auto-saving",
                element: <RoutePanels renderLeftPanel={() => <AutoSaving/>} renderRightPanel={() => <AutoSavingCode />} />,
            },
            {
                path: "/dependent-fields",
                element: <RoutePanels renderLeftPanel={() => <DependentFields/>} renderRightPanel={() => <DependentFieldsCode />} />,
            },
            {
                path: "/remote-changes",
                element: <RoutePanels renderLeftPanel={() => <RemoteChanges/>} renderRightPanel={() => <RemoteChangesCode />} />,
            },
        ]
    },
]);