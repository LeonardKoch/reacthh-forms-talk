import { wait } from '@/lib/wait';
import { z } from 'zod';

type CompanyType = "GmbH" | "UG" | "AG" | "LLC" | "C-Corp" | "S-Corp";

interface Company {
    countryCode: 'DE' | 'US';
    companyName: string;
    companyType: CompanyType;
}

const CompanySchema = z.object({
    countryCode: z.enum(['DE', 'US']),
    companyName: z.string().min(3),
    companyType: z.enum(["GmbH", "UG", "AG", "LLC", "C-Corp", "S-Corp"])
});

const registeredCompanies: Company[] = [];

interface SuccessResponse {
    status: 200;
}

interface ErrorResponse {
    status: 400;
    body: {
        validationErrors: Record<string, string>;
    };
}

type Response = SuccessResponse | ErrorResponse;

function zodIssuesToValidationErrors(issues: z.ZodIssue[]): Record<string, string> {
    return Object.fromEntries(issues.map(issue => [issue.path.join('.'), issue.message]));
}

export async function submitCompany(body: unknown): Promise<Response> {
    await wait(1500);
    const parsedBody = CompanySchema.safeParse(body);
    if (parsedBody.success) {
        if (registeredCompanies.some(c => c.countryCode === parsedBody.data.countryCode && c.companyName === parsedBody.data.companyName)) {
            return { status: 400, body: { validationErrors: { 'companyName': `${parsedBody.data.companyName} already exists in ${parsedBody.data.countryCode}` } } };
        }
        registeredCompanies.push(parsedBody.data);
        return { status: 200 };
    } else {
        console.log(parsedBody.error.errors);
        return { status: 400, body: { validationErrors: zodIssuesToValidationErrors(parsedBody.error.errors) } };
    }
}