import axios from "axios";
import API from "./api";

export const getOrders = () => API.get("/orders");

export const placeOrder = (payload) => API.post("/orders", payload);

export const placeOrderfromCart = (userID) =>
  API.post(`/orders/place-from-cart/${userID}`);

export const placeOrderFromUserCart = async () =>
  await API.post("/orders/place-from-cart");

export const getOrderById = (id) => API.get(`/orders/${id}`);

export const getUserOrders = () => API.get("/orders/user/orders");

export const getOrdersByUserId = (userID) => API.get(`/orders/user/${userID}`);

export const getInvoiceByOrderId = (orderId) =>
  API.get(`/invoices/${orderId}/pdf`, {
    responseType: "blob", // cruicial for binary files
  });

export const getAdminOrders = ({ page, rowsPerPage, status }) => {
  return API.get("/admin/orders", {
    params: { page, size: rowsPerPage, status },
  });
};

export const updateOrderStatus = (id, newStatus) => {
  return API.patch(`/admin/orders/${id}/status`, { status: newStatus });
};
