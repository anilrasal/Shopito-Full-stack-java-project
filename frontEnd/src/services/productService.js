import API from "./api";

// Export const getAllProducts = async ({ query = "", page = 0, size = 20 } = {}) => { ... }
// Now, if you call getAllProducts() with no arguments, it safely falls back to: { query: "", page: 0, size: 20 }
// Withoug this feature, if you call withoug page and size arguments, it'll be marked as undefined by the frontend.
export const getAllProducts = async ({
  query = "",
  category = "",
  page = 0,
  size = 20,
  sort = "", // e.g., "price,asc"
} = {}) => {
  const params = new URLSearchParams();

  if (query) {
    params.append("q", query);
  }
  if (category) params.append("category", category);
  if (sort) params.append("sort", sort);
  params.append("page", page);
  params.append("size", size);
  return API.get(`/products${query ? "/search" : ""}?${params.toString()}`);
};

export const getProductById = (id) => API.get(`/products/${id}`);

export const createProduct = (productData) =>
  API.post("/products", productData);

export const updateProduct = (id, productData) =>
  API.put(`/products/update/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const searchProducts = async (query) =>
  await API.get(`/products/search?q=${query}`);
