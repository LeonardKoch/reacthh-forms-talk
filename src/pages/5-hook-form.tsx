import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Controller, useForm } from 'react-hook-form';
import { submitCompany } from '@/backend/server.ts';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';


export function HookForm() {
    const { control, register, handleSubmit, formState } = useForm({ mode: 'onChange' })
    // TODO update this with a clever functionality from the previous step
    console.log(formState)
    return (
        <div>
            <h1 className="p-4 text-xl font-bold">With Hook Form</h1>
            <form className="p-4 flex flex-col gap-2" onSubmit={handleSubmit(data => submitCompany(data))}>
                <Label htmlFor="countryCode">Country</Label>
                <Controller
                    name="countryCode"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange} required>
                            <SelectTrigger className="w-[350px]">
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DE">Germany</SelectItem>
                                <SelectItem value="US">United States of America</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <Separator className="my-4" />
                <Label htmlFor="companyName">Company Name</Label>
                <Input required minLength={3} {...register('companyName')} />
                <Label htmlFor="companyType">Company Type</Label>
                <Controller
                    name="companyType"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange} required>
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
                    )}
                />
                <Separator className="my-4" />
                <Button disabled={!formState.isValid} type="submit">Submit</Button>
            </form>
        </div>
    )
}

export function HookFormCode() {
    return (
        <CodeDisplay />
    )
}