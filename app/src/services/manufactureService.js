import { baseUrl } from "../endpoints.js";

const fetchManufacturers = async () => {
  const response = await fetch(`${baseUrl}manufacturers`).catch((err) => alert(err));
  if (response) {
    return response.json();
  }
  return response;
};


export  {fetchManufacturers };
