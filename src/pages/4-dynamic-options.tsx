import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { FormEvent, useState } from 'react';
import { submitCompany } from '@/backend/server.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';
import { ErrorMessage } from '@/components/ErrorMessage.tsx';

export function DynamicOptions() {
    const [countryCode, setCountryCode] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [companyType, setCompanyType] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const formIsValid = countryCode && companyName.length >= 3 && companyType;

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!formIsValid) {
            return;
        }

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
                        <SelectItem disabled={countryCode !== 'DE'} value="GmbH">GmbH</SelectItem>
                        <SelectItem disabled={countryCode !== 'DE'} value="UG">UG</SelectItem>
                        <SelectItem disabled={countryCode !== 'DE'} value="AG">AG</SelectItem>
                        <SelectItem disabled={countryCode !== 'US'} value="LLC">LLC</SelectItem>
                        <SelectItem disabled={countryCode !== 'US'} value="C-Corp">C-Corp</SelectItem>
                        <SelectItem disabled={countryCode !== 'US'} value="S-Corp">S-Corp</SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage error={validationErrors['companyType']} />
                <Separator className="my-4" />
                <Button type="submit" disabled={submitting || !formIsValid} >{submitting ? 'Submitting...' : 'Submit'}</Button>
            </form>
        </div>
    )
}

export function DynamicOptionsCode() {
    return (
        <div>
            <p>Dynamic Options</p>
            <CodeDisplay code={
                `<SelectContent>
    <SelectItem disabled={countryCode !== 'DE'} value="GmbH">GmbH</SelectItem>
    <SelectItem disabled={countryCode !== 'DE'} value="UG">UG</SelectItem>
    <SelectItem disabled={countryCode !== 'DE'} value="AG">AG</SelectItem>
    <SelectItem disabled={countryCode !== 'US'} value="LLC">LLC</SelectItem>
    <SelectItem disabled={countryCode !== 'US'} value="C-Corp">C-Corp</SelectItem>
    <SelectItem disabled={countryCode !== 'US'} value="S-Corp">S-Corp</SelectItem>
</SelectContent>`}/>
            <Separator className="my-4"/>
            <p>Disable Form while invalid</p>
            <CodeDisplay code={
 `const formIsValid = countryCode && companyName.length >= 3 && companyType;

<Button type="submit" disabled={submitting || !formIsValid} >{submitting ? 'Submitting...' : 'Submit'}</Button>`
            }/>
        </div>
    )
}