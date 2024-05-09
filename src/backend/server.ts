import { z } from 'zod';

type CompanyType = "GmbH" | "UG" | "AG" | "LLC" | "C-Corp" | "S-Corp";

interface Company {
    countryCode: string;
    name: string;
    type: CompanyType;
}

const CompanySchema = z.object({
    countryCode: z.string().min(2),
    name: z.string().min(3),
    type: z.enum(["GmbH", "UG", "AG", "LLC", "C-Corp", "S-Corp"])
});

const registeredCompanies: Company[] = [];

export async function submitCompany(body: unknown) {
    const parsedBody = CompanySchema.safeParse(body);
    if (parsedBody.success) {
        registeredCompanies.push(parsedBody.data);
        console.log(registeredCompanies);
    } else {
        console.log(parsedBody.error.errors);
        throw new Error("Invalid company data");
    }
}