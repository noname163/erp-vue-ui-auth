import api from "./apiClient";

export const compantService = {
  // Fetch company information
  async createCompany(
    payload: CompanyRequest
  ): Promise<CompanyInformationResponse> {
    return api.post<CompanyInformationResponse, CompanyRequest>(
      "/companies",
      payload
    );
  },
  async getCompanyInfo(): Promise<CompanyInformationResponse> {
    return api.get<CompanyInformationResponse>("/companies");
  },
};
