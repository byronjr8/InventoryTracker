import { fetchProducts , fetchProduct} from "../services/productsService.js";
import { setupAddProductModal , setupEditProductModal} from "../setups/productSetup.js";
import { getElement, openModal } from "../utils.js";

const addProductModalBtn = getElement(".add-product-modal-btn");

const init = async () => {
  const loading = getElement(".page-loading");
  const Products= await fetchProducts();
  console.log(Products)
  if(Products) {
     await displayProducts(Products, getElement('.inventory.table table tbody'));
  }
  addProductModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("button click");
    
    setupAddProductModal(getElement('.modal.add-product-modal .modal-center'));
    openModal(getElement(".modal.add-product-modal"));
  });
  loading.style.display = "none";
};

const displayProducts = async (Products, element) => {
  renderProductDataInTheTable(Products, element);
  await element.addEventListener("click", async function (e) {
    const parent = e.target;
    if (parent.classList.contains("edit-product-btn")) {
      //get a single product , populate
      let product= await fetchProduct(parent.dataset.id);
      
      setupEditProductModal(product, getElement('.modal.edit-product-modal .modal-center'));
      openModal(getElement(".modal.edit-product-modal"));
    }
  });
};


const renderProductDataInTheTable = (data, element) => {
  data.forEach((item, index) => {
    let newRow = document.createElement("tr");

    let s_noCell = document.createElement("td");
    s_noCell.innerText = index +1;
    newRow.appendChild(s_noCell);

    let name = document.createElement("td");
    name.innerText = item.name;
    newRow.appendChild(name);

    let categoryCell = document.createElement("td");
    categoryCell.innerText = item.category
    newRow.appendChild(categoryCell);


    let priceCell = document.createElement("td");
    priceCell.innerText = item.price;
    newRow.appendChild(priceCell);

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
