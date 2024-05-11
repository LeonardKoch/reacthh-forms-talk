import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { useState } from 'react';
import { submitCompany } from '@/backend/server.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';


export function DirtyTracking() {
    const [countryCode, setCountryCode] = useState<string|null>(null);
    const [companyName, setCompanyName] = useState<string>('');
    const [companyType, setCompanyType] = useState<string|null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = {
            countryCode: countryCode,
            name: companyName,
            type: companyType,
        }
        await submitCompany(data);
    }

    const formIsValid = countryCode && companyName.length >= 3 && companyType;

    return (
        <div>
            <h1 className="p-4 text-xl font-bold">React States with Dirty Tracking</h1>
            <form className="p-4 flex flex-col gap-2" method="post" onSubmit={handleSubmit}>
                <Label htmlFor="countryCode">Country</Label>
                <Select name="countryCode" required onValueChange={setCountryCode}>
                    <SelectTrigger className="w-[350px]">
                        <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="US">United States of America</SelectItem>
                    </SelectContent>
                </Select>
                <Separator className="my-4" />
                <Label htmlFor="companyName">Company Name</Label>
                <Input name="companyName" required minLength={3} onChange={e => setCompanyName(e.target.value)} />
                <Label htmlFor="companyType">Company Type</Label>
                <Select name="companyType" required onValueChange={setCompanyType}>
                    <SelectTrigger className="w-[350px]">
                        <SelectValue placeholder="Select Company Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="GmbH">GmbH</SelectItem>
                        <SelectItem value="UG">UG</SelectItem>
                        <SelectItem value="AG">UG</SelectItem>
                        <SelectItem value="LLC">LLC</SelectItem>
                        <SelectItem value="C-Corp">C-Corp</SelectItem>
                        <SelectItem value="S-Corp">S-Corp</SelectItem>
                    </SelectContent>
                </Select>
                <Separator className="my-4" />
                <Button disabled={!formIsValid} type="submit">Submit</Button>
            </form>
        </div>
    )
}

export function DirtyTrackingCode() {
    return (
        <CodeDisplay />
    )
}