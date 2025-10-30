import { defineStore } from "pinia";
import { ref, computed } from "vue";
import router from "../router";
import authService, { type LoginPayload } from "@/services/auth";
import type { EmployeeInformationResponse } from "@/types/auth";

export const useAuth = defineStore("auth", () => {
  const user = ref<EmployeeInformationResponse | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const isAuthenticated = computed<boolean>(() => !!user.value);
  const roles = computed<string[]>(() =>
    user.value?.roleName ? [user.value.roleName] : []
  );

  function hasRole(required?: string[]): boolean {
    if (!required || required.length === 0) return true;
    return required.some((r) => roles.value.includes(r));
  }

  async function login(payload: LoginPayload): Promise<void> {
    if (!payload.employeeEmail || !payload.password)
      throw new Error("Email and password are required");
    const data = await authService.login(payload);
    user.value = data;
    localStorage.setItem("user", JSON.stringify(data));
    router.replace("/dashboard");
  }

  async function logout(): Promise<void> {
    try {
      await authService.logout();
    } finally {
      user.value = null;
      localStorage.removeItem("user");
      router.replace("/login");
    }
  }

  return { user, isAuthenticated, roles, hasRole, login, logout };
});
