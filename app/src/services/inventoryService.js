import { baseUrl } from "../endpoints.js";

const fetchInventorys = async () => {
  const response = await fetch(`${baseUrl}inventory`).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};
const fetchInventory = async (inventoryId) => {
  const response = await fetch(`${baseUrl}inventory/${inventoryId}`).catch((err) =>
    alert(err)
  );
  if (response) {
    return response.json();
  }
  return response;
};
const createInventory = async (inventoryData) => {
  const response = await fetch(`${baseUrl}inventory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventoryData),
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};
const updateInventory = async (inventoryId, inventoryData) => {
  const response = await fetch(`${baseUrl}inventory/${inventoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventoryData),
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};

const deleteInventory = async (inventoryId) => {
  const response = await fetch(`${baseUrl}inventory/${inventoryId}`, {
    method: "DELETE",
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};

export  {fetchInventorys, fetchInventory, createInventory, updateInventory, deleteInventory };
