import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { z } from 'zod';
import { Controller } from 'react-hook-form';
import {
    loadCompanyDraftStrict,
    saveCompanyDraftStrict,
    submitCompanyStrict
} from '@/backend/server.ts';
import { useZodForm } from '@/lib/useZodForm.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';

const baseSchema = z.object({
    companyName: z.string().min(3)
});

const usSchema = baseSchema.extend({
    countryCode: z.literal('US'),
    companyType: z.enum(['LLC', 'C-Corp', 'S-Corp'])
});

const deSchema = baseSchema.extend({
    countryCode: z.literal('DE'),
    companyType: z.enum(['GmbH', 'UG', 'AG'])
});

const formSchema = z.discriminatedUnion('countryCode', [usSchema, deSchema]);

export function DependentFieldsValueChange() {
    const [preloadingData, setPreloadingData] = useState(true);
    const {
        control, register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset, setError, watch, setValue
    } = useZodForm({ schema: formSchema, disabled: preloadingData, mode: 'onChange', defaultValues: { companyName: '' } })

    const onSubmit = handleSubmit(async (data) => {
        const response = await submitCompanyStrict(data);
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
        const subscription = watch(async (formValues, changedValue) => {
            if (changedValue.name === 'countryCode') {
                setValue('companyType', formValues.countryCode === 'DE' ? 'GmbH' : 'LLC');
            }

            await saveCompanyDraftStrict(formValues);
        })

        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        setPreloadingData(true);
        loadCompanyDraftStrict().then(draft => {
            if (draft) {
                reset(draft);
            }
            setPreloadingData(false);
        });
    }, [reset]);

    const [countryCode] = watch(['countryCode']);

    return (
        <div>
            <h1 className="p-4 text-xl font-bold">Dependent Fields - Change Values</h1>
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

export function DependentFieldsValueChangeCode() {
    return (
        <div>
            <h2 className="text-l font-bold">What if we want to update a field's value based on another?</h2>
            <p>We can use the second parameter of the watch(callback) subscription to check if the country code
                changed</p>
            <CodeDisplay code={
`const subscription = watch(async (formValues, changedValue) => {
    if (changedValue.name === 'countryCode') {
           
    }`}/>
        <p>We can then use setValue from useForm to change the company type to the right one</p>
        <CodeDisplay code={
        `const { setValue } = useZodForm();
useEffect(() => {
    const subscription = watch(async (formValues, changedValue) => {
        if (changedValue.name === 'countryCode') {
            setValue('companyType', formValues.countryCode === 'DE' ? 'GmbH' : 'LLC');
        }

        await saveCompanyDraftStrict(formValues);
    })

    return () => subscription.unsubscribe();
}, [watch]);`}/>
    </div>
    )
}
