import { fetchProducts } from "../services/productsService.js";
import { setupAddProductModal } from "../setups/productSetup.js";
import { getElement, openModal } from "../utils.js";

const addProductModalBtn = getElement(".add-product-modal-btn");

const init = async () => {
  const loading = getElement(".page-loading");
  const Products= await fetchProducts();
  if(Products) {
      displayProducts(Products, getElement('.inventory.table table tbody'));
  }
  addProductModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("button click");
    
    setupAddProductModal(getElement('.modal.add-product-modal .modal-center'));
    openModal(getElement(".modal.add-product-modal"));
  });
  loading.style.display = "none";
};

const displayProducts = (Products, element, filters) => {
  renderProductDataInTheTable(Products, element);
  element.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    if (parent.classList.contains("edit-product-btn")) {
      //get a single product , populate
      showEditModal(parent.dataset.id);
    }
  });
};

const renderProductDataInTheTable = (data, element) => {
  data.forEach((item, index) => {
    let newRow = document.createElement("tr");

    let s_noCell = document.createElement("td");
    s_noCell.innerText = index +1;
    newRow.appendChild(cell);

    let quantityCell = document.createElement("td");
    quantityCell.innerText = item.quantity
    newRow.appendChild(cell);

    let totalPriceCell = document.createElement("td");
    totalPriceCell.innerText = item.totalPrice;
    newRow.appendChild(cell);

    let dateCell = document.createElement("td");
    dateCell.innerText = item.date;
    newRow.appendChild(cell);

    let editbutton = `<button class="btn edit-product-btn" data-id="${item.id}">
    Edit</i>
  </button>`;
    let celledit = document.createElement("td");
    celledit.innerHTML = editbutton;
    newRow.appendChild(celledit);
    
    element.appendChild(newRow); 

  });
};

window.addEventListener("DOMContentLoaded", init);
