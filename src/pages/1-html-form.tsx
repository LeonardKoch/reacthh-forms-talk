import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { CodeDisplay } from '@/components/CodeDisplay.tsx';


export function HTMLForm() {
    return (
        <div>
            <h1 className="p-4 text-xl font-bold">HTML Form - Our Baseline</h1>
            <form className="p-4 flex flex-col gap-2" method="post" action={"/submit"}>
                <Label htmlFor="country">Country</Label>
                <Select name="countryCode" required>
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
                <Input name="companyName" required minLength={3} />
                <Label htmlFor="companyType">Company Type</Label>
                <Select name="companyType" required>
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
                <Separator className="my-4" />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}


export function HTMLFormCode() {
    return (
        <CodeDisplay
            code={
`<form method="post" action={"/submit"}>
    <Label htmlFor="country">Country</Label>
    <Select name="countryCode" required>
        <SelectTrigger 
            <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="DE">Germany</SelectItem>
            <SelectItem value="US">United States of America</SelectItem>
        </SelectContent>
    </Select>
    <Separator />
    <Label htmlFor="companyName">Company Name</Label>
    <Input name="companyName" required minLength={3} />
    <Label htmlFor="companyType">Company Type</Label>
    <Select name="companyType" required>
        <SelectTrigger 
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
    <Separator />
    <Button type="submit">Submit</Button>
</form>`}/>
    )
}