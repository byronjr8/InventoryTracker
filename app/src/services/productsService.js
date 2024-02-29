import { baseUrl } from "../endpoints.js";

const fetchProducts = async () => {
  const response = await fetch(`${baseUrl}products`).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};
const fetchProduct = async (productId) => {
  const response = await fetch(`${baseUrl}product/${productId}`).catch((err) =>
    alert(err)
  );
  if (response) {
    return response.json();
  }
  return response;
};
const createProduct = async (data) => {
  const response = await fetch(`${baseUrl}product`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};
const updateProduct = async (data) => {
  const response = await fetch(`${baseUrl}product`, {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};

const deleteProduct = async (productId) => {
  const response = await fetch(`${baseUrl}product/${productId}`, {
    method: "DELETE",
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};

export  {fetchProducts, fetchProduct, createProduct, updateProduct, deleteProduct };
