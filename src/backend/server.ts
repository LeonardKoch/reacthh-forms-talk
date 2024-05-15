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

type DECompanyType = "GmbH" | "UG" | "AG";
interface DECompany {
    countryCode: 'DE';
    companyName: string;
    companyType: DECompanyType;
}

type USCompanyType = "LLC" | "C-Corp" | "S-Corp";
interface USCompany {
    countryCode: 'US';
    companyName: string;
    companyType: USCompanyType;
}

export function submitCompanyStrict(body: DECompany | USCompany): Promise<Response> {
    return submitCompany(body);
}


export type PartialCompany = Partial<Company>;

export async function saveCompanyDraft(body: PartialCompany): Promise<Response> {
    await wait(1500);
    const parsedBody = CompanySchema.partial().safeParse(body);
    if (!parsedBody.success) {
        return { status: 400, body: { validationErrors: zodIssuesToValidationErrors(parsedBody.error.errors) } };
    }

    localStorage.setItem('companyDraft', JSON.stringify(parsedBody.data));
    return { status: 200 };
}

export async function loadCompanyDraft(): Promise<PartialCompany | undefined> {
    await wait(1500);
    const localStorageDraft = localStorage.getItem('companyDraft');
    if (!localStorageDraft) {
        return undefined;
    }
    const parsedDraft = CompanySchema.partial().safeParse(JSON.parse(localStorageDraft));
    if (!parsedDraft.success) {
        return undefined;
    }
    return parsedDraft.data;
}

export type PartialStrictCompany = Partial<DECompany | USCompany>;

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

const CompanySchemaStrict = z.discriminatedUnion('countryCode', [usSchema, deSchema]);

export async function saveCompanyDraftStrict(body: PartialStrictCompany): Promise<Response> {
    await wait(1500);
    const parsedBody = CompanySchemaStrict.safeParse(body);
    if (!parsedBody.success) {
        return { status: 400, body: { validationErrors: zodIssuesToValidationErrors(parsedBody.error.errors) } };
    }

    localStorage.setItem('companyDraft', JSON.stringify(parsedBody.data));
    return { status: 200 };
}

export async function loadCompanyDraftStrict(): Promise<PartialStrictCompany | undefined> {
    await wait(1500);
    const localStorageDraft = localStorage.getItem('companyDraft');
    if (!localStorageDraft) {
        return undefined;
    }
    const parsedDraft = CompanySchemaStrict.safeParse(JSON.parse(localStorageDraft));
    if (!parsedDraft.success) {
        return undefined;
    }
    return parsedDraft.data;
}