import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';


export function DependentFields() {
    return (
        <div>
            <h1 className="p-4 text-xl font-bold">Dependent Fields</h1>

        </div>
    )
}

export function DependentFieldsCode() {
    return (
        <CodeDisplay />
    )
}