import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable.tsx';
import { Link, Outlet } from 'react-router-dom';
import { Separator } from '@/components/ui/separator.tsx';
import { ReactNode } from 'react';


function NavItem (props: { to: string, children: ReactNode}) {
    return (
        <li>
            <Link to={props.to} className="block w-full px-2 py-4">{props.children}</Link>
            <Separator/>
        </li>
    )
}

export function App() {

  return (
    <div className="h-screen w-screen">
        <ResizablePanelGroup  direction="horizontal">
            <ResizablePanel defaultSize={15} className="bg-accent">
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
                    <NavItem to="/auto-saving">
                        6. Auto Saving
                    </NavItem>
                    <NavItem to="/dependent-fields">
                        7. Dependent Fields
                    </NavItem>
                    <NavItem to="/remote-changes">
                        8. Remote Changes
                    </NavItem>
                </ul>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40}>
                <Outlet/>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>Two</ResizablePanel>
        </ResizablePanelGroup>

    </div>
  )
}