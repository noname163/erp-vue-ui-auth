export type CommonStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | string;

export interface EmployeeInformationResponse {
  code: string;
  nickname: string;
  email: string;
  jobTitle: string;
  employmentStatus: CommonStatus;
  hireDate: string; // ISO date
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  roleName: string;
  departmentName: string;
  companyName: string;
}
