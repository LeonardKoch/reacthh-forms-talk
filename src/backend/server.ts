import { z } from 'zod';

type CompanyType = "GmbH" | "UG" | "AG" | "LLC" | "C-Corp" | "S-Corp";

interface Company {
    countryCode: string;
    companyName: string;
    companyType: CompanyType;
}

const CompanySchema = z.object({
    countryCode: z.string().min(2),
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
        validationErrors: { field: string; error: string }[];
    };
}

type Response = SuccessResponse | ErrorResponse;

function zodIssueToValidationError(issue: z.ZodIssue): { field: string; error: string } {
    const fieldKey = issue.path.join('.');
    switch (fieldKey) {
        case 'countryCode':
            return {
                field: 'countryCode',
                error: issue.message
            };
        case 'companyName':
            return {
                field: 'companyName',
                error: issue.message
            };
        case 'companyType':
            return {
                field: 'companyType',
                error: issue.message
            };
        default:
            return {
                field: fieldKey,
                error: issue.message
            };
    }
}

export async function submitCompany(body: unknown): Promise<Response> {
    console.log('Body..')
    console.log(body);
    const parsedBody = CompanySchema.safeParse(body);
    if (parsedBody.success) {
        if (registeredCompanies.some(c => c.countryCode === parsedBody.data.countryCode && c.companyName === parsedBody.data.companyName)) {
            return { status: 400, body: { validationErrors: [{ field: 'companyName', error: `Company name already exists in ${parsedBody.data.countryCode}` }] } };
        }
        registeredCompanies.push(parsedBody.data);
        return { status: 200 };
    } else {
        console.log(parsedBody.error.errors);
        return { status: 400, body: { validationErrors: parsedBody.error.errors.map(zodIssueToValidationError) } };
    }
}