import { baseUrl } from "../endpoints.js";


const fetchLocations = async () => {
  const response = await fetch(`${baseUrl}locations`).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};
const fetchLocation = async (locationId) => {
  const response = await fetch(`${baseUrl}locations/${locationId}`).catch((err) =>
    alert(err)
  );
  if (response) {
    return response.json();
  }
  return response;
};
const createLocation = async (data) => {
  console.log(JSON.stringify(data))
  const response = await fetch(`${baseUrl}locations`, {
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
const updateLocation = async (locationId, data) => {
  const response = await fetch(`${baseUrl}locations/${locationId}`, {
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

const deleteLocation = async (locationId) => {
  const response = await fetch(`${baseUrl}locations/${locationId}`, {
    method: "DELETE",
  }).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};

export  {fetchLocations, fetchLocation, createLocation, updateLocation, deleteLocation };

