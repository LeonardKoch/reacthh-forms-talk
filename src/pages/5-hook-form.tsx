import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Controller, useForm } from 'react-hook-form';
import { submitCompany } from '@/backend/server.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';
import { ErrorMessage } from '@hookform/error-message';


export function HookForm() {
    const {
        control, register, handleSubmit, formState: { errors, isValid, isSubmitting}, reset, setError
    } = useForm({ mode: 'onChange', defaultValues: { countryCode: '', companyName: '', companyType: '' } })

    const onSubmit = handleSubmit(async (data) => {
        const response = await submitCompany(data);
        switch (response.status) {
            case 200: {
                reset();
                break;
            }
            case 400: {
                for (const [field, error] of Object.entries(response.body.validationErrors)) {
                    if (field === 'companyName' || field === 'countryCode' || field === 'companyType') {
                        setError(field, { type: 'server', message: error } , { shouldFocus: true });
                    }
                }
                break;
            }
        }
    })

    return (
        <div>
            <h1 className="p-4 text-xl font-bold">With Hook Form</h1>
            <form className="p-4 flex flex-col gap-2" onSubmit={onSubmit}>
                <Label htmlFor="countryCode">Country</Label>
                <Controller
                    name="countryCode"
                    control={control}
                    rules={{ required: 'Country is required' }}
                    render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="w-[350px]">
                                <SelectValue placeholder="Select Country"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DE">Germany</SelectItem>
                                <SelectItem value="US">United States of America</SelectItem>
                                <SelectItem value="FR">France</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <ErrorMessage errors={errors} name="countryCode"/>
                <Separator className="my-4"/>
                <Label htmlFor="companyName">Company Name</Label>
                <Input required minLength={3} {...register('companyName', { minLength: 3 })} />
                <ErrorMessage errors={errors} name="companyName" />
                <Label htmlFor="companyType">Company Type</Label>
                <Controller
                    name="companyType"
                    control={control}
                    rules={{ required: 'Company Type is required' }}
                    render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="w-[350px]">
                                <SelectValue placeholder="Select Company Type"/>
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
                    )}
                />
                <ErrorMessage errors={errors} name="companyType"/>
                <Separator className="my-4"/>
                <Button type="submit" disabled={isSubmitting || !isValid} >{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
            </form>
        </div>
    )
}

export function HookFormCode() {
    return (
        <div>
            <h2 className="text-l font-bold">State Management</h2>
            <p>From</p>
            <CodeDisplay code={
                `const [countryCode, setCountryCode] = useState<string>('');
const [companyName, setCompanyName] = useState<string>('');
const [companyType, setCompanyType] = useState<string>('');
const [submitting, setSubmitting] = useState<boolean>(false);
const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

const formIsValid = countryCode && companyName.length >= 3 && companyType;`
            }/>
            <p>To</p>
            <CodeDisplay code={
                `const {
    control, register, handleSubmit, formState: { errors, isValid, isSubmitting}, reset, setError
} = useForm({ mode: 'onChange', defaultValues: { countryCode: '', companyName: '', companyType: '' } })`
            }/>

            <Separator className="my-4"/>

            <h2 className="text-l font-bold">Inputs</h2>
            <p>From</p>
            <CodeDisplay code={
                `<Input name="companyName" required minLength={3} value={companyName} onChange={e => setCompanyName(e.target.value)} />
<ErrorMessage error={validationErrors['companyName']} />`
            }/>
            <p>To</p>
            <CodeDisplay code={
                `<Input required minLength={3} {...register('companyName', { minLength: 3 })} />
<ErrorMessage errors={errors} name="companyName" />`
            }/>

            <Separator className="my-4"/>

            <p>From</p>
            <CodeDisplay code={
                `<Select name="countryCode" required value={countryCode} onValueChange={setCountryCode}>
<ErrorMessage error={validationErrors['countryCode']} />`
            }/>
            <p>To</p>
            <CodeDisplay code={
                `<Controller
    name="countryCode"
    control={control}
    rules={{ required: 'Country is required' }}
    render={({ field }) => (
        <Select {...field} onValueChange={field.onChange}>{...}
/>
<ErrorMessage errors={errors} name="countryCode"/>`
            }/>

            <Separator className="my-4"/>

            <h2 className="text-l font-bold">Submission</h2>
            <p>From</p>
            <CodeDisplay code={
                `async function onSubmit(e: FormEvent<HTMLFormElement>) {
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
}`
            }/>
            <p>To</p>
            <CodeDisplay code={
                `const onSubmit = handleSubmit(async (data) => {
    const response = await submitCompany(data);
    switch (response.status) {
        case 200: {
            reset();
            break;
        }
        case 400: {
            for (const [field, error] of response.body.validationErrors) {
                setError(field, { type: 'server', message: error }, { shouldFocus: true });
            }
            break;
        }
    }
})`
            }/>
        </div>
    )
}
