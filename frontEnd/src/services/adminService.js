import API from "./api";

export const getDashboardStats = async () => {
  const response = await API.get("/admin/dashboard");
  return response;
};

export const getAdminProducts = async ({
  page = 0,
  rowsPerPage = 20,
  selectedCategory = "",
  sort = "",
  query = "",
}) => {
  const params = new URLSearchParams();

  if (query) {
    params.append("q", query);
  }
  console.log("Category is: ", selectedCategory);
  if (selectedCategory) params.append("category", selectedCategory);
  if (sort) params.append("sort", sort);
  params.append("page", page);
  params.append("size", rowsPerPage);
  const url = `/admin/products${query ? "/search" : ""}?${params.toString()}`;
  console.log(url);
  const response = await API.get(url);
  return response;
};

export const deleteProduct = async (id) => {
  return await API.delete("/products/delete/" + id);
};

export const addProductWithImage = async (formData) => {
  console.log(formData);
  return await API.post("/products/addWithImage", formData);
};

export const updateProductWithImage = async (id, formData) => {
  return await API.put(`/products/update/${id}`, formData);
};

export const getAdminUsers = async ({
  page = 0,
  rowsPerPage = 10,
  query = "",
  sort = "",
}) => {
  const params = new URLSearchParams();

  if (query) params.append("q", query); //Optional Search
  if (sort) params.append("sort", sort); //Optional Sort
  params.append("page", page);
  params.append("size", rowsPerPage);

  const url = `/admin/users?${params.toString()}`;
  console.log("Fetching users from", url);

  const response = await API.get(url);
  return response;
};

export const updateUserRole = async (userId, newRole) => {
  return await API.put(`/admin/users/${userId}/role`, { role: newRole });
};

export const deleteUser = async (userId) => {
  return await API.delete(`/users/${userId}`);
};
