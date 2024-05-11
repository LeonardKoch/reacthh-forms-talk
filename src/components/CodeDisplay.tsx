import { Highlight, themes } from "prism-react-renderer"
import { useState } from 'react';
import { submitCompany } from '@/backend/server.ts';

const codeBlock = `const [companyType, setCompanyType] = useState<string|null>(null);

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
        countryCode: countryCode,
        name: companyName,
        type: companyType,
    }
    await submitCompany(data);
}

<form className="p-4 flex flex-col gap-2" method="post" onSubmit={handleSubmit}>
    <Label htmlFor="countryCode">Country</Label>
    <Select name="countryCode" required onValueChange={setCountryCode}>
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
    <Input name="companyName" required minLength={3} onChange={e => setCompanyName(e.target.value)} />
    <Label htmlFor="companyType">Company Type</Label>
    <Select name="companyType" required onValueChange={setCompanyType}>
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
</form>`

export const CodeDisplay = () => (
    <Highlight
        // theme={themes.github}
        theme={themes.vsDark}
        code={codeBlock}
        language="tsx"
    >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className="rounded p-4" style={style}>
        {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
                <span className="pr-8">{i + 1}</span>
                {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                ))}
            </div>
        ))}
      </pre>
        )}
    </Highlight>
)
