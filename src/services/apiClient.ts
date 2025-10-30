import { AxiosHeaders } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import http from "@/api/http";
import { isApiEnvelope, isPagedResponse } from "@/types/api";
import { isProblemDetailsResponse } from "@/types/errorResponse";

export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

class ApiClient {
  private client: AxiosInstance;

  constructor(instance: AxiosInstance = http) {
    this.client = instance;

    // Request: add default headers, keep cookies (configured in http).
    this.client.interceptors.request.use((config) => {
      const headers = AxiosHeaders.from(config.headers);
      headers.set("Accept", "application/json");
      const method = (config.method || "").toUpperCase();
      if (
        !headers.has("Content-Type") &&
        ["POST", "PUT", "PATCH"].includes(method)
      ) {
        headers.set("Content-Type", "application/json");
      }
      config.headers = headers;
      return config;
    });

    // Response: unwrap data and normalize errors
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        const payload = response.data;
        // PagedResponse<T> should pass through intact
        if (isPagedResponse(payload)) {
          return payload;
        }
        // CustomApiResponse<T>: unwrap to T, or reject if success === false
        if (isApiEnvelope(payload)) {
          if (payload.success === false) {
            const err: ApiError = new Error(
              payload.message || "Request failed"
            );
            err.status = response.status;
            err.data = payload;
            console.log("API error envelope", err);
            return Promise.reject(err);
          }
          return payload.data;
        }
        // Plain body
        return payload;
      },
      (error) => {
        const respData = error?.response?.data;
        let message = error.message || "Request failed";
        if (isProblemDetailsResponse(respData)) {
          console.log("Paged response detected", respData);
          message = respData.detail || respData.title || message;
        } else if (respData && typeof respData.message === "string") {
          message = respData.message;
        }
        const apiError: ApiError = new Error(message);
        apiError.status = error?.response?.status;
        apiError.data = respData;
        return Promise.reject(apiError);
      }
    );
  }

  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config) as unknown as Promise<T>;
  }
  post<T = unknown, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.post(url, body, config) as unknown as Promise<T>;
  }
  put<T = unknown, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.put(url, body, config) as unknown as Promise<T>;
  }
  patch<T = unknown, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.patch(url, body, config) as unknown as Promise<T>;
  }
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config) as unknown as Promise<T>;
  }
}

export const api = new ApiClient();
export default api;
export { ApiClient };
