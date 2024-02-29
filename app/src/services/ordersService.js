import { baseUrl } from "../endpoints.js";

const fetchOrders = async () => {
  const response = await fetch(`${baseUrl}orders`).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};
const fetchOrder = async (orderId) => {
  const response = await fetch(`${baseUrl}orders/${orderId}`).catch((err) =>
    alert(err)
  );
  if (response) {
    return response.json();
  }
  return response;
};
const createOrder = async (orderData) => {
  const response = await fetch(`${baseUrl}order`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};
const updateOrder = async (orderData) => {
  const response = await fetch(`${baseUrl}order`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};

const deleteOrder = async (orderId) => {
  const response = await fetch(`${baseUrl}order/${orderId}`, {
    method: "DELETE",
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};

export  {fetchOrders, fetchOrder, createOrder, updateOrder, deleteOrder };
