import axios from "axios";

// Create a shared Axios instance for the app
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
  // Use cookie-based auth (HTTP-only cookies from backend)
  withCredentials: true,
  // If your backend sets a CSRF cookie (e.g., `XSRF-TOKEN`), axios will
  // automatically read it and send it as this header.
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// No Authorization header needed; authentication is handled via cookies.

// Global response handling: redirect to login on 401
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      const url = error?.config?.url as string | undefined;
      if (url && (url.includes("/auth/login") || url.includes("/auth/me"))) {
        return Promise.reject(error);
      }
      // Clear local auth state and redirect
      localStorage.removeItem("user");
      // Prefer router if app context is ready; fallback to hard redirect
      try {
        // Lazy import to avoid circular deps during app bootstrap
        import("@/router")
          .then((mod) => {
            const router = mod.default;
            router.replace({ path: "/login" });
          })
          .catch(() => {
            window.location.href = "/login";
          });
      } catch (_) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default http;
