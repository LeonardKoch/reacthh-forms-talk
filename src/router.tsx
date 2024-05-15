import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App, RoutePanels } from '@/App.tsx';
import { HTMLForm, HTMLFormCode } from '@/pages/1-html-form.tsx';
import { StatesAndJSON, StatesAndJSONCode } from '@/pages/2-states-and-json.tsx';
import { DynamicValidation, DynamicValidationCode } from '@/pages/3-dynamic-validation.tsx';
import { DynamicOptions, DynamicOptionsCode } from '@/pages/4-dynamic-options.tsx';
import { HookForm, HookFormCode } from '@/pages/5-hook-form.tsx';
import { HookFormTypesafe, HookFormTypesafeCode } from '@/pages/6-hook-form-typesafe.tsx';
import { AutoSavingGetValues, AutoSavingGetValuesCode } from '@/pages/7-1-auto-saving-get-values.tsx';
import { AutoSavingWatchEffect, AutoSavingWatchEffectCode } from '@/pages/7-2-auto-saving-watch-effect.tsx';
import {
    AutoSavingWatchSubscription,
    AutoSavingWatchSubscriptionCode
} from '@/pages/7-3-auto-saving-watch-subscription.tsx';
import { Preloading, PreloadingCode } from '@/pages/8-preloading.tsx';
import { DependentFields, DependentFieldsCode } from '@/pages/9-dependent-fields.tsx';

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
                path: "/auto-saving/get-values",
                element: <RoutePanels renderLeftPanel={() => <AutoSavingGetValues/>} renderRightPanel={() => <AutoSavingGetValuesCode />} />,
            },
            {
                path: "/auto-saving/watch-effect",
                element: <RoutePanels renderLeftPanel={() => <AutoSavingWatchEffect/>} renderRightPanel={() => <AutoSavingWatchEffectCode />} />,
            },
            {
                path: "/auto-saving/watch-subscription",
                element: <RoutePanels renderLeftPanel={() => <AutoSavingWatchSubscription/>} renderRightPanel={() => <AutoSavingWatchSubscriptionCode />} />,
            },
            {
                path: "/preloading",
                element: <RoutePanels renderLeftPanel={() => <Preloading/>} renderRightPanel={() => <PreloadingCode />} />,
            },
            {
                path: "/dependent-fields",
                element: <RoutePanels renderLeftPanel={() => <DependentFields/>} renderRightPanel={() => <DependentFieldsCode />} />,
            },
        ]
    },
]);