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
                    <NavItem to="/">
                        1. Basic Form
                    </NavItem>
                    <NavItem to="/with-form">
                        2. With Hook Form
                    </NavItem>
                    <NavItem to="/step-3">
                        3. Step 3
                    </NavItem>
                    <NavItem to="/step-4">
                        4. Step 4
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