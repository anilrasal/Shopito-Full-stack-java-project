import API from "./api";

export const registerUser = (payload) => {
  console.log("Registering user with payload:", payload);
  return API.post("/users/register", payload);
};
export const loginUser = (payload) => {
  return API.post("/auth/token", payload);
};

export const getUserProfile = (id) => API.get(`/users/${id}/profile`);

export const getProfile = () => API.get("/users/profile");

export const updateUserProfile = (payload) =>
  API.put(`/users/${id}/profile`, payload);

export const updateProfile = async (payload) =>
  await API.put("/users/profile/update", payload);

export const requestPasswordReset = async (email) =>
  await API.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`);

export const resetPassword = async (payload) =>
  await API.post("/auth/reset-password", payload);

export const changePassword = async (payload) =>
  await API.post("/users/profile/change-password", payload);
