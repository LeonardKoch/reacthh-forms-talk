import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { FormEvent, useState } from 'react';
import { submitCompany } from '@/backend/server.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';
import { ErrorMessage } from '@/components/ErrorMessage.tsx';


export function DirtyTracking() {
    const [countryCode, setCountryCode] = useState<string|undefined>(undefined);
    const [companyName, setCompanyName] = useState<string>('');
    const [companyType, setCompanyType] = useState<string|undefined>(undefined);
    const [countryCodeError, setCountryCodeError] = useState<string|undefined>(undefined);
    const [companyNameError, setCompanyNameError] = useState<string|undefined>(undefined);
    const [companyTypeError, setCompanyTypeError] = useState<string|undefined>(undefined);

    const formIsValid = countryCode && companyName.length >= 3 && companyType;

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        if (!formIsValid) {
            return;
        }
        event.preventDefault();
        const data = {
            countryCode: countryCode,
            companyName: companyName,
            companyType: companyType,
        }
        const response = await submitCompany(data);
        switch (response.status) {
            case 200: {
                setCountryCode('');
                setCompanyName('');
                setCompanyType('');
                setCountryCodeError(undefined);
                setCompanyNameError(undefined);
                setCompanyTypeError(undefined);
                break;
            }
            case 400: {
                response.body.validationErrors.forEach(error => {
                    switch (error.field) {
                        case 'countryCode':
                            setCountryCodeError(error.error);
                            break;
                        case 'companyName':
                            setCompanyNameError(error.error);
                            break;
                        case 'companyType':
                            setCompanyTypeError(error.error);
                            break;
                    }
                });
                break;
            }
        }
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
                {companyNameError ? <ErrorMessage message={companyNameError} /> : null}
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