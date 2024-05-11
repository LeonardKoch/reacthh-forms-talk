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
    return {
        field: issue.path.join('.'),
        error: issue.message
    };
}

export async function submitCompany(body: unknown): Promise<Response> {
    console.log('Body..')
    console.log(body);
    const parsedBody = CompanySchema.safeParse(body);
    if (parsedBody.success) {
        registeredCompanies.push(parsedBody.data);
        console.log(registeredCompanies);
        return { status: 200 };
    } else {
        console.log(parsedBody.error.errors);
        return { status: 400, body: { validationErrors: parsedBody.error.errors.map(zodIssueToValidationError) } };
    }
}