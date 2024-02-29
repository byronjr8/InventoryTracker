import { baseUrl } from "../endpoints.js";

const fetchManufacturers = async () => {
  const response = await fetch(`${baseUrl}Manufacturers`).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};
const fetchManufacturer = async (ManufacturerId) => {
  const response = await fetch(`${baseUrl}Manufacturer/${ManufacturerId}`).catch((err) =>
    alert(err)
  );
  if (response) {
    return response.json();
  }
  return response;
};
const createManufacturer = async (data) => {
  const response = await fetch(`${baseUrl}Manufacturer`, {
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
const updateManufacturer = async (data) => {
  const response = await fetch(`${baseUrl}Manufacturer`, {
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

const deleteManufacturer = async (ManufacturerId) => {
  const response = await fetch(`${baseUrl}Manufacturer/${ManufacturerId}`, {
    method: "DELETE",
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};

export  {fetchManufacturers, fetchManufacturer, createManufacturer, updateManufacturer, deleteManufacturer };
