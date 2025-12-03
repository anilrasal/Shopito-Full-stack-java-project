import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    // "Content-Type": "application/json",
    //TODO
    // Add auth token if needed:
    // Authorization: `Bearer ${token}`,
  },
});

const publicUrls = [
  "/products",
  "/categories",
  "/auth/token",
  "/auth/reset-password",
  "auth/forgot-password",
  "/users/register",
];

/*Centralized token logic: No need to manually pass headers on every request.

Clean fallback: If authToken isn’t present, requests still work (unauthenticated).

Scoped config: Only requests made via your API instance get this behavior—nice separation.
*/
API.interceptors.request.use((config) => {
  console.log("API call:", config.baseURL + config.url, config.method);
  const token = localStorage.getItem("authToken");

  // Check if the request URL starts with any public URL
  const isPublic = publicUrls.some((url) => config.url.startsWith(url));

  if (token && !isPublic) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      window.location.href = "/login"; // force re-login
    }
    return Promise.reject(error);
  }
);

API.interceptors.request.use((config) => {
  const isFormData = config.data instanceof FormData;
  console.log("Method:", config.method);
  console.log("URL:", config.url);
  console.log("Content-Type before:", config.headers["Content-Type"]);
  console.log("Is FormData:", isFormData);
  return config;
});

export default API;
