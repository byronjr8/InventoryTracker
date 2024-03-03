import {
  deleteOrder,
  fetchOrders,
  updateOrder,
} from "../services/ordersService.js";
import { getElement, openModal } from "../utils.js";
import { setupAddOrderModal } from "../setups/orderSetup.js";
import { fetchProducts } from "../services/productsService.js";

const createOrderModalBtn = getElement(".create-order-modal-btn");
const init = async () => {
  const loading = getElement(".page-loading");
  let orders = await fetchOrders();
  if (orders) {
    displayOrders(orders, getElement(".orders table tbody"));
  } else {
  }
  createOrderModalBtn.addEventListener("click", async(e) => {
    e.preventDefault();
    const products = await fetchProducts();
    setupAddOrderModal(getElement(".modal.create-order-modal .modal-center"), products);
    openModal(getElement(".modal.create-order-modal"));
  });

  loading.style.display = "none";
};

const displayOrders =  (orders, element, filters) => {
  console.log("displaying..");
  renderOrderDataInTheTable(orders, element);

  element.addEventListener("click", async function (e) {
    const target = e.target;
    if (target.classList.contains("remove-order-btn")) {
      console.log(target.dataset.id, "delete");
      let deleteResponse= await deleteOrder(target.dataset.id);
      console.log(deleteResponse);
      if(deleteResponse){
        alert(deleteResponse.message);
        location.reload();
      }
    }
  });
};

const renderOrderDataInTheTable = (data, element) => {
  element.innerHTML = "";
  data.forEach((item, index) => {
    let newRow = document.createElement("tr");

    let s_noCell = document.createElement("td");
    s_noCell.innerText = index + 1;
    newRow.appendChild(s_noCell);

    let productCell = document.createElement("td");
    productCell.innerText = item.productName;
    newRow.appendChild(productCell);

    let quantityCell = document.createElement("td");
    quantityCell.innerText = item.quantity;
    newRow.appendChild(quantityCell);

    let statusCell = document.createElement("td");
    statusCell.innerText = item.status;
    newRow.appendChild(statusCell);

    let totalPriceCell = document.createElement("td");
    totalPriceCell.innerText = item.totalPrice;
    newRow.appendChild(totalPriceCell);

    let dateCell = document.createElement("td");
    dateCell.innerText = item.orderDate;
    newRow.appendChild(dateCell);

    let removebutton = `<button class="btn remove-order-btn" data-id="${item.id}">
            Remove</i>
          </button>`;
    let celledit = document.createElement("td");
    celledit.innerHTML = removebutton;
    newRow.appendChild(celledit);

    element.appendChild(newRow);
  });
};

window.addEventListener("DOMContentLoaded", init);
