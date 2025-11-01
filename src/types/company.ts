type CompanyStatus = "Active" | "Inactive";
type AccountStatus = CompanyStatus;
type AccountRole = "Owner" | "Admin" | "Member";
interface CompanyAccount {
  id: number;
  name: string;
  email: string;
  role: AccountRole;
  status: AccountStatus;
}

interface Company {
  id: number;
  name: string;
  taxNumber: string;
  industry: string;
  address: string;
  phoneNumber: string;
  status: CompanyStatus;
  accounts: CompanyAccount[];
}

interface CompanyRequest {
  name: string;
  taxNumber: string;
  industry: string;
  address: string;
  phoneNumber: string;
}

interface CompanyInformationResponse {
  company: Company;
}
