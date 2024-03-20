import { baseUrl } from "../endpoints.js";

const fetchProducts = async () => {
  const response = await fetch(`${baseUrl}products`).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};
const fetchProduct = async (productId) => {
  const response = await fetch(`${baseUrl}products/${productId}`).catch((err) =>
    alert(err)
  );
  if (response) {
    return response.json();
  }
  return response;
};
const createProduct = async (data) => {
  console.log(JSON.stringify(data))
  const response = await fetch(`${baseUrl}products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }).catch((err) => alert(err));
  if (response) {
  
    return response.json();
  }
  return response;
};
const updateProduct = async (productId, data) => {
  const response = await fetch(`${baseUrl}products/${productId}`, {
    method: "PUT",
    headers: {
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
  const response = await fetch(`${baseUrl}products/${productId}`, {
    method: "DELETE",
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};

export  {fetchProducts, fetchProduct, createProduct, updateProduct, deleteProduct };
