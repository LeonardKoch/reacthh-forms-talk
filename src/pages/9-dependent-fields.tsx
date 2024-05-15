import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { z } from 'zod';
import { Controller } from 'react-hook-form';
import { loadCompanyDraft, saveCompanyDraft, submitCompany } from '@/backend/server.ts';
import { useZodForm } from '@/lib/useZodForm.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';

const formSchema = z.object({
    countryCode: z.enum(['DE', 'US']),
    companyName: z.string().min(3),
    companyType: z.enum(['GmbH', 'UG', 'AG', 'LLC', 'C-Corp', 'S-Corp'])
});

export function DependentFields() {
    const [preloadingData, setPreloadingData] = useState(true);
    const {
        control, register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset, setError, watch
    } = useZodForm({ schema: formSchema, disabled: preloadingData, mode: 'onChange', defaultValues: { companyName: '' } })

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

    useEffect(() => {
        const subscription = watch(async formValues => {
            await saveCompanyDraft(formValues);
        })

        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        setPreloadingData(true);
        loadCompanyDraft().then(draft => {
            if (draft) {
                reset(draft);
            }
            setPreloadingData(false);
        });
    }, [reset]);

    const [countryCode] = watch(['countryCode']);

    return (
        <div>
            <h1 className="p-4 text-xl font-bold">Preloading</h1>
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
                                <SelectItem disabled={countryCode !== 'DE'} value="GmbH">GmbH</SelectItem>
                                <SelectItem disabled={countryCode !== 'DE'} value="UG">UG</SelectItem>
                                <SelectItem disabled={countryCode !== 'DE'} value="AG">AG</SelectItem>
                                <SelectItem disabled={countryCode !== 'US'} value="LLC">LLC</SelectItem>
                                <SelectItem disabled={countryCode !== 'US'} value="C-Corp">C-Corp</SelectItem>
                                <SelectItem disabled={countryCode !== 'US'} value="S-Corp">S-Corp</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <ErrorMessage errors={errors} name="companyType"/>
                <Separator className="my-4"/>
                <Button type="submit" disabled={isSubmitting || !isValid || preloadingData} >{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
            </form>
        </div>
    )
}

export function DependentFieldsCode() {
    return (
        <div>
            <p>This time using watch()'s returned value is our friend</p>
            <CodeDisplay code={
`
const { watch } = useZodForm();
                
const [countryCode] = watch(['countryCode']);

<SelectItem disabled={countryCode !== 'DE'} value="GmbH">GmbH</SelectItem>
<SelectItem disabled={countryCode !== 'DE'} value="UG">UG</SelectItem>
<SelectItem disabled={countryCode !== 'DE'} value="AG">AG</SelectItem>
<SelectItem disabled={countryCode !== 'US'} value="LLC">LLC</SelectItem>
<SelectItem disabled={countryCode !== 'US'} value="C-Corp">C-Corp</SelectItem>
<SelectItem disabled={countryCode !== 'US'} value="S-Corp">S-Corp</SelectItem>`}/>
            <p>We can use it just fine to make decisions in render, like rendering different options.</p>
        </div>
    )
}
