import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';


export function AutoSaving() {
    return (
        <div>
            <h1 className="p-4 text-xl font-bold">Auto Saving</h1>

        </div>
    )
}

export function AutoSavingCode() {
    return (
        <CodeDisplay />
    )
}