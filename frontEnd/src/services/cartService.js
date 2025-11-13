import API from "./api";

export const getItemFromCartByUserId = (userId) =>
  API.get(`/cart-items/user/${userId}`);

export const getItemFromCartWithAuth = () => API.get("/cart-items/user");

export const addItemToCart = (itemData) => API.post("/cart-items", itemData);

export const removeItemFromCart = (itemId) =>
  API.delete(`/cart-items/${itemId}`);

export const decrementItemInCart = (itemData) =>
  API.put("/cart-items/decrement", itemData);

export const incrementItemInCart = (itemData) =>
  API.put("/cart-items/increment", itemData);

export const clearUserCartItems = (userId) =>
  API.delete(`/cart-items/user/${userId}`); //admin only access

export const clearCartItems = () => API.delete("/cart-items/user");

export const updateOrAddItemToCart = (itemData) =>
  API.post("/cart-items/updateOrAdd", itemData);
