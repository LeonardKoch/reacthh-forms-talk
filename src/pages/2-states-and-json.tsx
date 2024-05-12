import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { FormEvent, useState } from 'react';
import { submitCompany } from '@/backend/server.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';


export function StatesAndJSON() {
    const [countryCode, setCountryCode] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [companyType, setCompanyType] = useState<string>('');

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = {
            countryCode: countryCode,
            companyName: companyName,
            companyType: companyType,
        }
        await submitCompany(data);
    }

    return (
        <div>
            <h1 className="p-4 text-xl font-bold">React States and JSON Request</h1>
            <form className="p-4 flex flex-col gap-2" onSubmit={handleSubmit}>
                <Label htmlFor="countryCode">Country</Label>
                <Select name="countryCode" required value={countryCode} onValueChange={setCountryCode}>
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
                <Input name="companyName" required minLength={3} value={companyName} onChange={e => setCompanyName(e.target.value)} />
                <Label htmlFor="companyType">Company Type</Label>
                <Select name="companyType" required value={companyType} onValueChange={setCompanyType}>
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
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}


export function StatesAndJSONCode() {
    return (
        <div>
            <p>From</p>
            <CodeDisplay code={`<form method="post" action={"/submit"}>`}/>
            <p>To</p>
            <CodeDisplay code={
`async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
        countryCode: countryCode,
        name: companyName,
        type: companyType,
    }
    await submitCompany(data);
}

<form onSubmit={handleSubmit}>`}/>
            <Separator className="my-4"/>
            <p>From</p>
            <CodeDisplay code={
`<Select name="countryCode" required>
<Input name="companyName" required minLength={3} />
<Select name="companyType" required>`
}/>
            <p>To</p>
            <CodeDisplay code={
`const [countryCode, setCountryCode] = useState<string|undefined>(undefined);
const [companyName, setCompanyName] = useState<string>('');
const [companyType, setCompanyType] = useState<string|undefined>(undefined);

<Select name="countryCode" required value={countryCode} onValueChange={setCountryCode}>
<Input name="companyName" required minLength={3} value={companyName} onChange={e => setCompanyName(e.target.value)} />
<Select name="companyType" required value={companyType} onValueChange={setCompanyType}>`
            }/>
        </div>
    )
}