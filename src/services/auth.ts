import api from "./apiClient";
import type { EmployeeInformationResponse } from "@/types/auth";

export type LoginPayload = { employeeEmail: string; password: string };

export const authService = {
  // Cookie-based login: server sets HttpOnly cookie and returns employee info
  async login(payload: LoginPayload): Promise<EmployeeInformationResponse> {
    const response = api.post<EmployeeInformationResponse, LoginPayload>(
      "/auth/login",
      payload
    );
    console.log("Auth service login response:", response);
    return response;
  },

  // Fetch current session user
  async me(): Promise<EmployeeInformationResponse> {
    return api.get<EmployeeInformationResponse>("/auth/me");
  },

  // Logout clears server-side session/cookie
  async logout(): Promise<void> {
    await api.post<void>("/auth/logout");
  },
};

export default authService;
