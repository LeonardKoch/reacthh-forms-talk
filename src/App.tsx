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
                    <NavItem to="/dirty-tracking">
                        3. Dirty Tracking
                    </NavItem>
                    <NavItem to="/hook-form">
                        4. Hook Form
                    </NavItem>
                    <NavItem to="/hook-form-typesafe">
                        5. Hook Form Typesafe
                    </NavItem>
                    <NavItem to="/preloading-data">
                        6. Preloading Data
                    </NavItem>
                    <NavItem to="/auto-saving">
                        7. Auto Saving
                    </NavItem>
                    <NavItem to="/dependent-fields">
                        8. Dependent Fields
                    </NavItem>
                    <NavItem to="/remote-changes">
                        9. Remote Changes
                    </NavItem>
                </ul>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel minSize={18} defaultSize={40} className="pl-4 pr-4 pt-8 pb-8">
                <Card>
                    <Outlet/>
                </Card>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel minSize={18}>Two</ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}