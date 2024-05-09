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

export async function submitCompany(body: unknown) {
    console.log('Body..')
    console.log(body);
    const parsedBody = CompanySchema.safeParse(body);
    if (parsedBody.success) {
        registeredCompanies.push(parsedBody.data);
        console.log(registeredCompanies);
    } else {
        console.log(parsedBody.error.errors);
        throw new Error("Invalid company data");
    }
}