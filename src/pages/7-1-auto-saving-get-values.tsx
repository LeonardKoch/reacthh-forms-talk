import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { z } from 'zod';
import { Controller } from 'react-hook-form';
import { saveCompanyDraft, submitCompany } from '@/backend/server.ts';
import { useZodForm } from '@/lib/useZodForm.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';

const formSchema = z.object({
    countryCode: z.enum(['DE', 'US']),
    companyName: z.string().min(3),
    companyType: z.enum(['GmbH', 'UG', 'AG', 'LLC', 'C-Corp', 'S-Corp'])
});

export function AutoSavingGetValues() {
    const {
        control, register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset, setError, getValues
    } = useZodForm({ schema: formSchema, mode: 'onChange', defaultValues: { companyName: '' } })

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
    });

    const formValues = getValues();

    useEffect(() => {
        console.log('Saving draft');
        saveCompanyDraft(formValues).then(() => {
            console.log('Draft saved')
        });
    }, [formValues]);

    return (
        <div>
            <h1 className="p-4 text-xl font-bold">Auto Saving - getValues()</h1>
            <form className="p-4 flex flex-col gap-2" onSubmit={onSubmit}>
                <Label htmlFor="countryCode">Country</Label>
                <Controller
                    name="countryCode"
                    control={control}
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
                <Input minLength={3} {...register('companyName', { minLength: 3 })} />
                <ErrorMessage errors={errors} name="companyName" />
                <Label htmlFor="companyType">Company Type</Label>
                <Controller
                    name="companyType"
                    control={control}
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

export function AutoSavingGetValuesCode() {
    return (
        <div>
            <h2 className="text-l font-bold">The naive implementation</h2>
            <p>getValues and useEffect</p>
            <CodeDisplay code={
`const { getValues } = useZodForm();
const formValues = getValues();

useEffect(() => {
    console.log('Saving draft');
    saveCompanyDraft(formValues).then(() => {
        console.log('Draft saved')
    });
}, [formValues]);`}/>
            <p className="p-4 text-xl">🙅‍♂️</p>
            <p>getValues() from useForm does not update on every change</p>
        </div>
    )
}
