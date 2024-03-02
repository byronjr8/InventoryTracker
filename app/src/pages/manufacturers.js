import { fetchManufacturers } from "../services/manufactureService.js";
import { getElement } from "../utils.js";

const init = async () => {
  const loading = getElement(".page-loading");
  const manufacturers = await fetchManufacturers();
  if (!manufacturers) {
    alert("Error Display manufacturers");
  } else {
    renderManufacturerDataInTheTable(
      manufacturers,
      getElement(".manufacturers table tbody")
    );
  }
  loading.style.display = "none";
};

const renderManufacturerDataInTheTable = (data, element) => {
  element.innerHTML = "";
  data.forEach((item) => {
    let newRow = document.createElement("tr");
    Object.values(item).forEach((value, index) => {
      let cell = document.createElement("td");
      cell.innerText = value;
      newRow.appendChild(cell);
    });
    element.appendChild(newRow);
  });
};

window.addEventListener("DOMContentLoaded", init);
