import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { FormEvent, useState } from 'react';
import { submitCompany } from '@/backend/server.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';
import { ErrorMessage } from '@/components/ErrorMessage.tsx';

export function DynamicValidation() {
    const [countryCode, setCountryCode] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [companyType, setCompanyType] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            countryCode: countryCode,
            companyName: companyName,
            companyType: companyType,
        }
        setSubmitting(true);
        const response = await submitCompany(data);
        switch (response.status) {
            case 200: {
                setCountryCode('');
                setCompanyName('');
                setCompanyType('');
                setValidationErrors({});
                break;
            }
            case 400: {
                setValidationErrors(response.body.validationErrors);
                break;
            }
        }
        setSubmitting(false);
    }

    return (
        <div>
            <h1 className="p-4 text-xl font-bold">React States and JSON Request</h1>
            <form className="p-4 flex flex-col gap-2" onSubmit={onSubmit}>
                <Label htmlFor="countryCode">Country</Label>
                <Select name="countryCode" required value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-[350px]">
                        <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="US">United States of America</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage error={validationErrors['countryCode']} />
                <Separator className="my-4" />
                <Label htmlFor="companyName">Company Name</Label>
                <Input name="companyName" required minLength={3} value={companyName} onChange={e => setCompanyName(e.target.value)} />
                <ErrorMessage error={validationErrors['companyName']} />
                <Label htmlFor="companyType">Company Type</Label>
                <Select name="companyType" required value={companyType} onValueChange={setCompanyType}>
                    <SelectTrigger className="w-[350px]">
                        <SelectValue placeholder="Select Company Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="GmbH">GmbH</SelectItem>
                        <SelectItem value="UG">UG</SelectItem>
                        <SelectItem value="AG">AG</SelectItem>
                        <SelectItem value="LLC">LLC</SelectItem>
                        <SelectItem value="C-Corp">C-Corp</SelectItem>
                        <SelectItem value="S-Corp">S-Corp</SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage error={validationErrors['companyType']} />
                <Separator className="my-4" />
                <Button type="submit" disabled={submitting} >{submitting ? 'Submitting...' : 'Submit'}</Button>
            </form>
        </div>
    )
}

export function DynamicValidationCode() {
    return (
        <div>
            <CodeDisplay code={
`const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
async function onSubmit(e: FormEvent<HTMLFormElement>) {
    // { previous code omitted for brevity ... }
    const response = await submitCompany(data);
    switch (response.status) {
        case 200: {
            setCountryCode('');
            setCompanyName('');
            setCompanyType('');
            setValidationErrors({});
            break;
        }
        case 400: {
            setValidationErrors(response.body.validationErrors);
            break;
        }
    }
}`} />
            <Separator className="my-4"/>
            <p>Display errors</p>
            <CodeDisplay code={
`<ErrorMessage error={validationErrors['countryCode']} />
<ErrorMessage error={validationErrors['companyName']} />
<ErrorMessage error={validationErrors['companyType']} />`} />
        </div>

    )
}