import { Input } from '@/components/ui/input.tsx';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable.tsx';

function App() {

  return (
    <div className="h-screen w-screen">
        <ResizablePanelGroup  direction="horizontal">
            <ResizablePanel defaultSize={40}>
                <div>
                    One
                    <Input />
                </div></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>Two</ResizablePanel>
        </ResizablePanelGroup>

    </div>
  )
}

export default App
