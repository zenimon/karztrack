import axios from "axios";

const api = axios.create({
  // In dev, proxied by Vite to http://localhost:6000
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("karztrack_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  ngoLogin: ({ email, password }) =>
    api.post("/auth/login", { email, password }),
  ngoSignup: ({ ngoName, email, password }) =>
    api.post("/auth/register", {
      name: ngoName,
      email,
      password,
      role: "ngo",
      ngoName,
    }),
  userLogin: ({ email, password }) =>
    api.post("/auth/login", { email, password }),
  userSignup: ({ name, email, password }) =>
    api.post("/auth/register", { name, email, password, role: "borrower" }),
};

export const loanApi = {
  getNgoLoans: () => api.get("/loans/ngo"),
  getUserLoans: () => api.get("/loans/dashboard"),
  confirmLoan: (id) => api.put(`/loans/${id}/confirm`),
};

export const repaymentApi = {
  confirmRepayment: (id) => api.put(`/repayments/${id}/confirm`),
};

export const smsApi = {
  receive: (message) => api.post("/sms/receive", { message }),
};

export const setAuthSession = (token, user) => {
  if (token) {
    window.localStorage.setItem("karztrack_token", token);
  }
  if (user) {
    window.localStorage.setItem("karztrack_user", JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  window.localStorage.removeItem("karztrack_token");
  window.localStorage.removeItem("karztrack_user");
};

export const getAuthToken = () => window.localStorage.getItem("karztrack_token");

export default api;
