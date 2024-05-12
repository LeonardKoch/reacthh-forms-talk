import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable.tsx';
import { NavLink, Outlet } from 'react-router-dom';
import { Separator } from '@/components/ui/separator.tsx';
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card.tsx';


function NavItem (props: { to: string, children: ReactNode}) {
    return (
        <li>
            <NavLink to={props.to} className={({ isActive }) => `block w-full px-2 py-4${isActive ? ' bg-accent': ''}`}>{props.children}</NavLink>
            <Separator/>
        </li>
    )
}

export function RoutePanels(props: { renderLeftPanel: () => ReactNode, renderRightPanel: () => ReactNode }) {
    return (
        <>
            <ResizableHandle />
            <ResizablePanel minSize={18} defaultSize={40} className="pl-4 pr-4 pt-8 pb-8">
                <Card>
                    {props.renderLeftPanel()}
                </Card>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="p-4" minSize={18}>
                {props.renderRightPanel()}
            </ResizablePanel>
        </>
    )
}

export function App() {
  return (
    <div className="h-screen w-screen">
        <ResizablePanelGroup  direction="horizontal">
            <ResizablePanel minSize={10} defaultSize={15} className="bg-neutral">
                <ul>
                    <NavItem to="/html-form">
                        1. Html Form
                    </NavItem>
                    <NavItem to="/states-and-json">
                        2. States and JSON
                    </NavItem>
                    <NavItem to="/dynamic-validation">
                        3. Dynamic Validation
                    </NavItem>
                    <NavItem to="/dynamic-options">
                        4. Dynamic Options
                    </NavItem>
                    <NavItem to="/hook-form">
                        5. Hook Form
                    </NavItem>
                    <NavItem to="/hook-form-typesafe">
                        6. Hook Form Typesafe
                    </NavItem>
                    <NavItem to="/preloading-data">
                        7. Preloading Data
                    </NavItem>
                    <NavItem to="/auto-saving">
                        8. Auto Saving
                    </NavItem>
                    <NavItem to="/dependent-fields">
                        9. Dependent Fields
                    </NavItem>
                    <NavItem to="/remote-changes">
                        10. Remote Changes
                    </NavItem>
                </ul>
            </ResizablePanel>
            <Outlet/>
        </ResizablePanelGroup>
    </div>
  )
}